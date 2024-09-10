import { ResolverContext } from "../../config/apollo-server-config";
import {
  FungibleChainAccountResolvers,
  FungibleChainAccountTransactionsConnection,
} from "../../config/graphql-types";
import { getTransactions } from "../../repository/transaction-repository";

export const transactionsFungibleChainAccountResolver: FungibleChainAccountResolvers<ResolverContext>["transactions"] =
  async (parent, args, context) => {
    console.log("transactionsFungibleChainAccountResolver");
    const { after, before, first, last } = args;

    const transactions = (await getTransactions({
      db: context.db,
      hash: parent.hash,
      first,
      last,
      before,
      after,
    })) as FungibleChainAccountTransactionsConnection;

    return transactions;
  };
