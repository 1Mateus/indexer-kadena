import { ResolverContext } from "../../config/apollo-server-config";
import { Block, BlockResolvers } from "../../config/graphql-types";
import { getBlockByHash } from "../../repository/block-repository";

export const parentBlockResolver: BlockResolvers<ResolverContext>["parent"] =
  async (parent, _args, context): Promise<Block | null> => {
    console.log("parentBlockResolver");
    const { hash } = parent;
    if (!hash) return null;

    const output = await getBlockByHash(context.db, hash);
    return output;
  };
