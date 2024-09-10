import { Pool } from "pg";
import {
  Block,
  BlockEventsConnection,
  BlockTransactionsConnection,
  FungibleChainAccount,
} from "../config/graphql-types";

export const getBlockByHash = async (
  db: Pool,
  hash: string
): Promise<Block | null> => {
  const { rows } = await db.query('SELECT * FROM "Blocks" WHERE hash = $1', [
    hash,
  ]);

  if (rows.length === 0) return null;

  const [row] = rows;

  const converted = Object.entries(row.adjacents);
  const neighbors = converted.map(([chainId, hash]) => ({
    chainId,
    hash: hash as string,
  }));

  const output: Block = {
    id: row.id,
    hash,
    chainId: row.chainid,
    creationTime: row.timestamp,
    difficulty: 3,
    epoch: row.epochStart,
    flags: row.featureFlags,
    height: row.height,
    nonce: row.nonce,
    payloadHash: row.payloadHash,
    weight: row.weight,
    target: row.target,
    neighbors,

    // prevent typescript error - resolvers will handle these
    events: {} as BlockEventsConnection,
    minerAccount: {} as FungibleChainAccount,
    transactions: {} as BlockTransactionsConnection,
  };

  return output;
};
