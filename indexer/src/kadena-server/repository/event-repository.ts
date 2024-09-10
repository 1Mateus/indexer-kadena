import { Pool } from "pg";
import {
  Block,
  BlockEventsConnectionEdge,
  InputMaybe,
} from "../config/graphql-types";
import { getPageInfo } from "./pagination";

interface Params {
  db: Pool;
  first?: InputMaybe<number>;
  last?: InputMaybe<number>;
  before?: InputMaybe<string>;
  after?: InputMaybe<string>;
  hash: string;
}

export const getEvents = async ({ db, after, first, last, hash }: Params) => {
  let cursorCondition = "";
  const queryParams: (string | number)[] = [hash];

  queryParams.push(first ?? 5);

  if (after) {
    const decodedAfter = after; // This could just decode to a simple event ID
    cursorCondition = `AND e.id > $3`;
    queryParams.push(decodedAfter);
  }

  const query = `
      SELECT e.id as id,
        e.name as name,
        e.requestkey as requestkey,
        b."chainId" as chainId,
        b.height as height,
        e.module as "moduleName",
        e.name as "eventName",
        e.params as parameters
      FROM "Blocks" b
      JOIN "Transactions" t ON b.id = t."blockId"
      JOIN "Events" e ON t.id = e."transactionId"
      WHERE b.hash = $1
      ${cursorCondition}
      ORDER BY e.id ASC
      LIMIT $2;
    `;

  const { rows } = await db.query(query, queryParams);

  const totalCountQuery = `
      SELECT COUNT(*) as count
      FROM "Blocks" b
      JOIN "Transactions" t ON b.id = t."blockId"
      JOIN "Events" e ON t.id = e."transactionId"
      WHERE b.hash = $1
      ${cursorCondition}
      LIMIT $2;
    `;

  const { rows: countResult } = await db.query(totalCountQuery, queryParams);
  const totalCount = parseInt(countResult[0].count, 10);

  const edges: BlockEventsConnectionEdge[] = rows.map((row) => ({
    cursor: row.id.toString(),
    node: {
      id: row.id,
      name: row.name,
      requestkey: row.requestkey,
      chainId: row.chainid,
      moduleName: row.moduleName,
      height: row.height,
      qualifiedName: `${row.moduleName}.${row.eventName}`,
      parameters: JSON.stringify(row.parameters),
      // prevent typescript error - resolvers will handle these
      block: {} as Block,
    },
  }));

  const pageInfo = getPageInfo({ rows, first, last });

  return {
    edges,
    pageInfo,
    totalCount,
  };
};
