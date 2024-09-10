import { Pool } from "pg";
import { InputMaybe, PageInfo, Transaction } from "../config/graphql-types";
import { getPageInfo } from "./pagination";

interface GetTransactionsParams {
  db: Pool;
  first?: InputMaybe<number>;
  last?: InputMaybe<number>;
  before?: InputMaybe<string>;
  after?: InputMaybe<string>;
  hash: string;
}

export async function getTransactions({
  db,
  after,
  first,
  last,
  hash,
}: GetTransactionsParams) {
  let cursorCondition = "";
  const queryParams: (string | number)[] = [hash];

  queryParams.push(first ?? 5);

  if (after) {
    const decodedAfter = after; // This could just decode to a simple event ID
    cursorCondition = `AND t.id > $3`;
    queryParams.push(decodedAfter);
  }

  const query = `
      SELECT t.id as id,
      t.hash as "hashTransaction",
      t.nonce as "nonceTransaction",
      t."chainId" as "chainId",
      t.creationtime as "creationTime",
      t.gaslimit as "gasLimit",
      t.gasprice as "gasPrice",
      t.ttl as ttl,
      t.sender as sender,
      trans.network as "networkId",
      t.sigs as sigs
      FROM "Blocks" b
      JOIN "Transactions" t on b.id = t."blockId"
      JOIN "Transfers" trans on trans."transactionId" = t.id 
      WHERE b.hash = $1
      ${cursorCondition}
      ORDER BY t.id ASC
      LIMIT $2;
    `;

  const { rows } = await db.query(query, queryParams);

  const totalCountQuery = `
      SELECT COUNT(*) as count
      FROM "Blocks" b
      JOIN "Transactions" t ON b.id = t."blockId"
      WHERE b.hash = $1
      ${cursorCondition}
      LIMIT $2;
    `;

  const { rows: countResult } = await db.query(totalCountQuery, queryParams);
  const totalCount = parseInt(countResult[0].count, 10);

  // TODO
  const edges: any = rows.map((row) => ({
    cursor: row.id.toString(),
    node: {
      id: row.id,
      hash: row.hashTransaction,
      sigs: row.sigs,
      cmd: {
        payload: {
          data: "",
          pactId: "",
          code: "",
          proof: "",
          rollback: "",
        },
        networkId: row.networkId,
        nonce: row.nonceTransaction,
        meta: {
          chainId: row.chainId,
          creationTime: row.creationTime,
          gasLimit: row.gasLimit,
          gasPrice: row.gasPrice,
          sender: row.sender,
          ttl: row.ttl,
        },
      },
    },
  }));

  const pageInfo = getPageInfo({ rows, first, last });

  return {
    edges,
    pageInfo,
    totalCount,
  };
}

interface GetTransactionIdParams {
  id: number;
  db: Pool;
}

export const getTransactionId = async ({ db, id }: GetTransactionIdParams) => {
  const query = `
      SELECT t.id as id,
      t.hash as "hashTransaction",
      t.nonce as "nonceTransaction",
      t."chainId" as "chainId",
      t.creationtime as "creationTime",
      t.gaslimit as "gasLimit",
      t.gasprice as "gasPrice",
      t.ttl as ttl,
      t.sender as sender,
      trans.network as "networkId",
      t.sigs as sigs
      FROM "Blocks" b
      JOIN "Transactions" t on b.id = t."blockId"
      JOIN "Transfers" trans on trans."transactionId" = t.id 
      WHERE b.t = $1
    `;

  const { rows } = await db.query(query, [id]);

  const [row] = rows;
  const output: Transaction | null = {
    id: row.id,
    hash: row.hashTransaction,
    sigs: row.sigs,
    cmd: {
      payload: {
        data: "",
        pactId: "",
        code: "",
        proof: "",
        rollback: false,
      },
      networkId: row.networkId,
      nonce: row.nonceTransaction,
      meta: {
        chainId: row.chainId,
        creationTime: row.creationTime,
        gasLimit: row.gasLimit,
        gasPrice: row.gasPrice,
        sender: row.sender,
        ttl: row.ttl,
      },
    },
  };

  return output;
};
