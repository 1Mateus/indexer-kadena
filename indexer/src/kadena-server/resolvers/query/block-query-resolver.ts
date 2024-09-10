import { ResolverContext } from "../../config/apollo-server-config";
import { Block, QueryResolvers } from "../../config/graphql-types";
import { getBlockByHash } from "../../repository/block-repository";

export const blockQueryResolver: QueryResolvers<ResolverContext>["block"] =
  async (_parent, args, context): Promise<Block | null> => {
    console.log("blockQueryResolver");
    const { hash } = args;
    const output = await getBlockByHash(context.db, hash);
    return output;
  };
