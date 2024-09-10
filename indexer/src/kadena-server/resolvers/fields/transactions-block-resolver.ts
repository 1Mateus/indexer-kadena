import { ResolverContext } from "../../config/apollo-server-config";
import { BlockResolvers } from "../../config/graphql-types";
import { getTransactions } from "../../repository/transaction-repository";

export const transactionsBlockResolver: BlockResolvers<ResolverContext>["transactions"] =
  async (parent, args, context) => {
    console.log("transactionsBlockResolver");
    const { hash } = parent;
    const { after, before, first, last } = args;

    const transactions = await getTransactions({
      db: context.db,
      hash,
      first,
      last,
      before,
      after,
    });
    return transactions;
  };
