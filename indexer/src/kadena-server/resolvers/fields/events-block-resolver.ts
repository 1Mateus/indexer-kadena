import { ResolverContext } from "../../config/apollo-server-config";
import { BlockResolvers } from "../../config/graphql-types";
import { getEvents } from "../../repository/event-repository";

export const eventsBlockResolver: BlockResolvers<ResolverContext>["events"] =
  async (parent, args, context) => {
    console.log("eventsBlockResolver");
    const { hash } = parent;
    const { after, before, first, last } = args;

    const events = await getEvents({
      db: context.db,
      hash,
      first,
      last,
      before,
      after,
    });
    return events;
  };
