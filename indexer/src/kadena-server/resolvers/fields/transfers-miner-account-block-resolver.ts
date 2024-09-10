import { ResolverContext } from "../../config/apollo-server-config";
import {
  FungibleChainAccountResolvers,
  FungibleChainAccountTransfersConnection,
} from "../../config/graphql-types";
import { getTransfers } from "../../repository/transfer-repository";

export const transfersFungibleChainAccountResolver: FungibleChainAccountResolvers<ResolverContext>["transfers"] =
  async (parent, args, context) => {
    console.log("transfersFungibleChainAccountResolver");
    const { after, before, first, last } = args;

    const transfers = (await getTransfers({
      db: context.db,
      hash: parent.hash,
      first,
      last,
      before,
      after,
    })) as FungibleChainAccountTransfersConnection;

    return transfers;
  };
