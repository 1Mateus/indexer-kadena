import { ResolverContext } from "../../config/apollo-server-config";
import {
  BlockResolvers,
  FungibleChainAccount,
  FungibleChainAccountTransactionsConnection,
  FungibleChainAccountTransfersConnection,
} from "../../config/graphql-types";

export const minerAccountBlockResolver: BlockResolvers<ResolverContext>["minerAccount"] =
  async (parent, _args, context) => {
    console.log("minerAccountBlockResolver");
    const { rows: blockRows } = await context.db.query(
      'SELECT b."minerData" FROM "Blocks" b WHERE b.hash = $1',
      [parent.hash]
    );

    if (blockRows.length === 0) {
      throw new Error("Miner didn't exist.");
    }

    const [blockRow] = blockRows;

    const { rows: balanceRows } = await context.db.query(
      'SELECT b.id, b.account, b.balance, b."chainId", b.module FROM "Balances" b WHERE account = $1',
      [blockRow.minerData.account]
    );

    const [balanceRow] = balanceRows;

    const output: FungibleChainAccount = {
      id: "1", // TODO
      accountName: balanceRow.account,
      balance: balanceRow.balance,
      chainId: balanceRow.chainId,
      fungibleName: balanceRow.module,
      guard: {
        keys: blockRow.minerData["public-keys"],
        predicate: blockRow.minerData.predicate,
      },

      // pass to the child resolver
      hash: parent.hash,

      // ignore the following fields
      transactions: {} as FungibleChainAccountTransactionsConnection,
      transfers: {} as FungibleChainAccountTransfersConnection,
    };

    return output;
  };
