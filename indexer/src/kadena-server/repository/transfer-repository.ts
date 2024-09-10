import { Pool } from "pg";
import { InputMaybe } from "../config/graphql-types";
import { getPageInfo } from "./pagination";

interface GetTransfersParams {
  db: Pool;
  first?: InputMaybe<number>;
  last?: InputMaybe<number>;
  before?: InputMaybe<string>;
  after?: InputMaybe<string>;
  hash: string;
}

export async function getTransfers({
  db,
  after,
  first,
  last,
  hash,
}: GetTransfersParams) {
  let cursorCondition = "";
  const queryParams: (string | number)[] = [hash];

  queryParams.push(first ?? 5);

  if (after) {
    const decodedAfter = after; // This could just decode to a simple event ID
    cursorCondition = `AND t.id > $3`;
    queryParams.push(decodedAfter);
  }

  const query = `
    select t.id as id,
    trans.amount as "transferAmount"
    from "Blocks" b
    join "Transactions" t on b.id = t."blockId"
    join "Transfers" trans on trans."transactionId" = t.id 
    where b.hash = $1
    ${cursorCondition}
    ORDER BY t.id ASC
    LIMIT $2;
  `;

  const { rows } = await db.query(query, queryParams);

  const totalCountQuery = `
    SELECT COUNT(*) as count
    from "Blocks" b
    join "Transactions" t on b.id = t."blockId"
    join "Transfers" trans on trans."transactionId" = t.id 
    where b.hash = $1
    ${cursorCondition}
    LIMIT $2;
  `;

  const { rows: countResult } = await db.query(totalCountQuery, queryParams);
  const totalCount = parseInt(countResult[0].count, 10);

  console.log(rows);
  const edges: any = rows.map((row) => ({
    cursor: row.id.toString(),
    node: {
      id: row.id,
      amount: row.transferAmount,
      // blockHash (X)
      // chainId (X)
      // creationTime (X)
      // height (X)
      // id (X)
      // moduleHash (X)
      // moduleName (X)
      // block { (X)

      // }
      // crossChainTransfer {

      // }
      // orderIndex
      // receiverAccount
      // senderAccount
      // requestKey (X)
      // transaction { (X)

      // }
    },
  }));

  const pageInfo = getPageInfo({ rows, first, last });

  return {
    edges,
    pageInfo,
    totalCount,
  };
}
