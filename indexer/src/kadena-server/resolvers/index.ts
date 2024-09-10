import { eventsBlockResolver } from "./fields/events-block-resolver";
import { ResolverContext } from "../config/apollo-server-config";
import { blockQueryResolver } from "./query/block-query-resolver";
import { Resolvers } from "../config/graphql-types";
import { parentBlockResolver } from "./query/parent-block-resolver";
import { minerAccountBlockResolver } from "./fields/miner-account-block-resolver";
import { transactionsBlockResolver } from "./fields/transactions-block-resolver";
import { transactionsFungibleChainAccountResolver } from "./fields/transactions-fungible-chain-account-resolver";
import { transfersFungibleChainAccountResolver } from "./fields/transfers-miner-account-block-resolver";

export const resolvers: Resolvers<ResolverContext> = {
  Query: {
    block: blockQueryResolver,
  },
  Block: {
    parent: parentBlockResolver,
    events: eventsBlockResolver,
    minerAccount: minerAccountBlockResolver,
    transactions: transactionsBlockResolver,
  },
  FungibleChainAccount: {
    transactions: transactionsFungibleChainAccountResolver,
    transfers: transfersFungibleChainAccountResolver,
  },
};
