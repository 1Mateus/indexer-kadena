import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Decimal: { input: any; output: any; }
};

export type Block = Node & {
  __typename?: 'Block';
  chainId?: Maybe<Scalars['BigInt']['output']>;
  creationTime: Scalars['DateTime']['output'];
  difficulty?: Maybe<Scalars['BigInt']['output']>;
  epoch: Scalars['DateTime']['output'];
  events: BlockEventsConnection;
  flags: Scalars['Decimal']['output'];
  hash: Scalars['String']['output'];
  height: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  minerAccount: FungibleChainAccount;
  neighbors: Array<BlockNeighbor>;
  nonce: Scalars['Decimal']['output'];
  parent?: Maybe<Block>;
  payloadHash: Scalars['String']['output'];
  target: Scalars['Decimal']['output'];
  transactions: BlockTransactionsConnection;
  weight: Scalars['Decimal']['output'];
};


export type BlockEventsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type BlockTransactionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type BlockEventsConnection = {
  __typename?: 'BlockEventsConnection';
  edges: Array<BlockEventsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type BlockEventsConnectionEdge = {
  __typename?: 'BlockEventsConnectionEdge';
  cursor: Scalars['String']['output'];
  node: Event;
};

export type BlockNeighbor = {
  __typename?: 'BlockNeighbor';
  chainId: Scalars['String']['output'];
  hash: Scalars['String']['output'];
};

export type BlockTransactionsConnection = {
  __typename?: 'BlockTransactionsConnection';
  edges: Array<BlockTransactionsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type BlockTransactionsConnectionEdge = {
  __typename?: 'BlockTransactionsConnectionEdge';
  cursor: Scalars['String']['output'];
  node: Transaction;
};

export type ContinuationPayload = {
  __typename?: 'ContinuationPayload';
  data: Scalars['String']['output'];
  pactId?: Maybe<Scalars['String']['output']>;
  proof?: Maybe<Scalars['String']['output']>;
  rollback?: Maybe<Scalars['Boolean']['output']>;
  step?: Maybe<Scalars['Int']['output']>;
};

export type Event = Node & {
  __typename?: 'Event';
  block: Block;
  chainId: Scalars['BigInt']['output'];
  height: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  moduleName: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  parameters?: Maybe<Scalars['String']['output']>;
  qualifiedName: Scalars['String']['output'];
  requestkey: Scalars['String']['output'];
  transaction?: Maybe<Transaction>;
};

export type ExecutionPayload = {
  __typename?: 'ExecutionPayload';
  code?: Maybe<Scalars['String']['output']>;
  data: Scalars['String']['output'];
};

export type FungibleChainAccount = Node & {
  __typename?: 'FungibleChainAccount';
  accountName: Scalars['String']['output'];
  balance: Scalars['Float']['output'];
  chainId: Scalars['String']['output'];
  fungibleName: Scalars['String']['output'];
  guard: Guard;
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  transactions: FungibleChainAccountTransactionsConnection;
  transfers: FungibleChainAccountTransfersConnection;
};


export type FungibleChainAccountTransactionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type FungibleChainAccountTransfersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type FungibleChainAccountTransactionsConnection = {
  __typename?: 'FungibleChainAccountTransactionsConnection';
  edges: Array<FungibleChainAccountTransactionsConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type FungibleChainAccountTransactionsConnectionEdge = {
  __typename?: 'FungibleChainAccountTransactionsConnectionEdge';
  cursor: Scalars['String']['output'];
  node: Transaction;
};

export type FungibleChainAccountTransfersConnection = {
  __typename?: 'FungibleChainAccountTransfersConnection';
  edges: Array<FungibleChainAccountTransfersConnectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type FungibleChainAccountTransfersConnectionEdge = {
  __typename?: 'FungibleChainAccountTransfersConnectionEdge';
  cursor: Scalars['String']['output'];
  node: Transfer;
};

export type Guard = {
  __typename?: 'Guard';
  keys: Array<Scalars['String']['output']>;
  predicate: Scalars['String']['output'];
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  block?: Maybe<Block>;
};


export type QueryBlockArgs = {
  hash: Scalars['String']['input'];
};

export type Signer = Node & {
  __typename?: 'Signer';
  address?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  orderIndex?: Maybe<Scalars['Int']['output']>;
  pubkey: Scalars['String']['output'];
  scheme?: Maybe<Scalars['String']['output']>;
};

export type Transaction = Node & {
  __typename?: 'Transaction';
  cmd: TransactionCommand;
  hash: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  sigs: Array<TransactionSignature>;
};

export type TransactionCommand = {
  __typename?: 'TransactionCommand';
  meta: TransactionMeta;
  networkId: Scalars['String']['output'];
  nonce: Scalars['String']['output'];
  payload: TransactionPayload;
};

export type TransactionInfo = TransactionMempoolInfo | TransactionResult;

export type TransactionMempoolInfo = {
  __typename?: 'TransactionMempoolInfo';
  status?: Maybe<Scalars['String']['output']>;
};

export type TransactionMeta = {
  __typename?: 'TransactionMeta';
  chainId: Scalars['BigInt']['output'];
  creationTime: Scalars['DateTime']['output'];
  gasLimit: Scalars['BigInt']['output'];
  gasPrice: Scalars['Float']['output'];
  sender: Scalars['String']['output'];
  ttl: Scalars['BigInt']['output'];
};

export type TransactionPayload = ContinuationPayload | ExecutionPayload;

export type TransactionResult = {
  __typename?: 'TransactionResult';
  badResult?: Maybe<Scalars['String']['output']>;
  block: Block;
  continuation?: Maybe<Scalars['String']['output']>;
  eventCount?: Maybe<Scalars['BigInt']['output']>;
  goodResult?: Maybe<Scalars['String']['output']>;
  height: Scalars['BigInt']['output'];
  logs?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['String']['output']>;
  transactionId?: Maybe<Scalars['BigInt']['output']>;
};

export type TransactionSignature = {
  __typename?: 'TransactionSignature';
  sig: Scalars['String']['output'];
};

export type Transfer = Node & {
  __typename?: 'Transfer';
  amount: Scalars['Decimal']['output'];
  block: Block;
  blockHash: Scalars['String']['output'];
  chainId: Scalars['BigInt']['output'];
  creationTime: Scalars['DateTime']['output'];
  crossChainTransfer?: Maybe<Transfer>;
  height: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  moduleHash: Scalars['String']['output'];
  moduleName: Scalars['String']['output'];
  orderIndex: Scalars['BigInt']['output'];
  receiverAccount: Scalars['String']['output'];
  requestKey: Scalars['String']['output'];
  senderAccount: Scalars['String']['output'];
  transaction?: Maybe<Transaction>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  TransactionInfo: ( TransactionMempoolInfo ) | ( Omit<TransactionResult, 'block'> & { block: _RefType['Block'] } );
  TransactionPayload: ( ContinuationPayload ) | ( ExecutionPayload );
};

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  Node: ( Omit<Block, 'events' | 'minerAccount' | 'parent' | 'transactions'> & { events: _RefType['BlockEventsConnection'], minerAccount: _RefType['FungibleChainAccount'], parent?: Maybe<_RefType['Block']>, transactions: _RefType['BlockTransactionsConnection'] } ) | ( Omit<Event, 'block' | 'transaction'> & { block: _RefType['Block'], transaction?: Maybe<_RefType['Transaction']> } ) | ( Omit<FungibleChainAccount, 'guard' | 'transactions' | 'transfers'> & { guard: _RefType['Guard'], transactions: _RefType['FungibleChainAccountTransactionsConnection'], transfers: _RefType['FungibleChainAccountTransfersConnection'] } ) | ( Signer ) | ( Omit<Transaction, 'cmd'> & { cmd: _RefType['TransactionCommand'] } ) | ( Omit<Transfer, 'block' | 'crossChainTransfer' | 'transaction'> & { block: _RefType['Block'], crossChainTransfer?: Maybe<_RefType['Transfer']>, transaction?: Maybe<_RefType['Transaction']> } );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  Block: ResolverTypeWrapper<Omit<Block, 'events' | 'minerAccount' | 'parent' | 'transactions'> & { events: ResolversTypes['BlockEventsConnection'], minerAccount: ResolversTypes['FungibleChainAccount'], parent?: Maybe<ResolversTypes['Block']>, transactions: ResolversTypes['BlockTransactionsConnection'] }>;
  BlockEventsConnection: ResolverTypeWrapper<Omit<BlockEventsConnection, 'edges'> & { edges: Array<ResolversTypes['BlockEventsConnectionEdge']> }>;
  BlockEventsConnectionEdge: ResolverTypeWrapper<Omit<BlockEventsConnectionEdge, 'node'> & { node: ResolversTypes['Event'] }>;
  BlockNeighbor: ResolverTypeWrapper<BlockNeighbor>;
  BlockTransactionsConnection: ResolverTypeWrapper<Omit<BlockTransactionsConnection, 'edges'> & { edges: Array<ResolversTypes['BlockTransactionsConnectionEdge']> }>;
  BlockTransactionsConnectionEdge: ResolverTypeWrapper<Omit<BlockTransactionsConnectionEdge, 'node'> & { node: ResolversTypes['Transaction'] }>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ContinuationPayload: ResolverTypeWrapper<ContinuationPayload>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Decimal: ResolverTypeWrapper<Scalars['Decimal']['output']>;
  Event: ResolverTypeWrapper<Omit<Event, 'block' | 'transaction'> & { block: ResolversTypes['Block'], transaction?: Maybe<ResolversTypes['Transaction']> }>;
  ExecutionPayload: ResolverTypeWrapper<ExecutionPayload>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  FungibleChainAccount: ResolverTypeWrapper<Omit<FungibleChainAccount, 'guard' | 'transactions' | 'transfers'> & { guard: ResolversTypes['Guard'], transactions: ResolversTypes['FungibleChainAccountTransactionsConnection'], transfers: ResolversTypes['FungibleChainAccountTransfersConnection'] }>;
  FungibleChainAccountTransactionsConnection: ResolverTypeWrapper<Omit<FungibleChainAccountTransactionsConnection, 'edges'> & { edges: Array<ResolversTypes['FungibleChainAccountTransactionsConnectionEdge']> }>;
  FungibleChainAccountTransactionsConnectionEdge: ResolverTypeWrapper<Omit<FungibleChainAccountTransactionsConnectionEdge, 'node'> & { node: ResolversTypes['Transaction'] }>;
  FungibleChainAccountTransfersConnection: ResolverTypeWrapper<Omit<FungibleChainAccountTransfersConnection, 'edges'> & { edges: Array<ResolversTypes['FungibleChainAccountTransfersConnectionEdge']> }>;
  FungibleChainAccountTransfersConnectionEdge: ResolverTypeWrapper<Omit<FungibleChainAccountTransfersConnectionEdge, 'node'> & { node: ResolversTypes['Transfer'] }>;
  Guard: ResolverTypeWrapper<Guard>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Node: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Node']>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  Signer: ResolverTypeWrapper<Signer>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Transaction: ResolverTypeWrapper<Omit<Transaction, 'cmd'> & { cmd: ResolversTypes['TransactionCommand'] }>;
  TransactionCommand: ResolverTypeWrapper<Omit<TransactionCommand, 'meta' | 'payload'> & { meta: ResolversTypes['TransactionMeta'], payload: ResolversTypes['TransactionPayload'] }>;
  TransactionInfo: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['TransactionInfo']>;
  TransactionMempoolInfo: ResolverTypeWrapper<TransactionMempoolInfo>;
  TransactionMeta: ResolverTypeWrapper<TransactionMeta>;
  TransactionPayload: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['TransactionPayload']>;
  TransactionResult: ResolverTypeWrapper<Omit<TransactionResult, 'block'> & { block: ResolversTypes['Block'] }>;
  TransactionSignature: ResolverTypeWrapper<TransactionSignature>;
  Transfer: ResolverTypeWrapper<Omit<Transfer, 'block' | 'crossChainTransfer' | 'transaction'> & { block: ResolversTypes['Block'], crossChainTransfer?: Maybe<ResolversTypes['Transfer']>, transaction?: Maybe<ResolversTypes['Transaction']> }>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BigInt: Scalars['BigInt']['output'];
  Block: Omit<Block, 'events' | 'minerAccount' | 'parent' | 'transactions'> & { events: ResolversParentTypes['BlockEventsConnection'], minerAccount: ResolversParentTypes['FungibleChainAccount'], parent?: Maybe<ResolversParentTypes['Block']>, transactions: ResolversParentTypes['BlockTransactionsConnection'] };
  BlockEventsConnection: Omit<BlockEventsConnection, 'edges'> & { edges: Array<ResolversParentTypes['BlockEventsConnectionEdge']> };
  BlockEventsConnectionEdge: Omit<BlockEventsConnectionEdge, 'node'> & { node: ResolversParentTypes['Event'] };
  BlockNeighbor: BlockNeighbor;
  BlockTransactionsConnection: Omit<BlockTransactionsConnection, 'edges'> & { edges: Array<ResolversParentTypes['BlockTransactionsConnectionEdge']> };
  BlockTransactionsConnectionEdge: Omit<BlockTransactionsConnectionEdge, 'node'> & { node: ResolversParentTypes['Transaction'] };
  Boolean: Scalars['Boolean']['output'];
  ContinuationPayload: ContinuationPayload;
  DateTime: Scalars['DateTime']['output'];
  Decimal: Scalars['Decimal']['output'];
  Event: Omit<Event, 'block' | 'transaction'> & { block: ResolversParentTypes['Block'], transaction?: Maybe<ResolversParentTypes['Transaction']> };
  ExecutionPayload: ExecutionPayload;
  Float: Scalars['Float']['output'];
  FungibleChainAccount: Omit<FungibleChainAccount, 'guard' | 'transactions' | 'transfers'> & { guard: ResolversParentTypes['Guard'], transactions: ResolversParentTypes['FungibleChainAccountTransactionsConnection'], transfers: ResolversParentTypes['FungibleChainAccountTransfersConnection'] };
  FungibleChainAccountTransactionsConnection: Omit<FungibleChainAccountTransactionsConnection, 'edges'> & { edges: Array<ResolversParentTypes['FungibleChainAccountTransactionsConnectionEdge']> };
  FungibleChainAccountTransactionsConnectionEdge: Omit<FungibleChainAccountTransactionsConnectionEdge, 'node'> & { node: ResolversParentTypes['Transaction'] };
  FungibleChainAccountTransfersConnection: Omit<FungibleChainAccountTransfersConnection, 'edges'> & { edges: Array<ResolversParentTypes['FungibleChainAccountTransfersConnectionEdge']> };
  FungibleChainAccountTransfersConnectionEdge: Omit<FungibleChainAccountTransfersConnectionEdge, 'node'> & { node: ResolversParentTypes['Transfer'] };
  Guard: Guard;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Node: ResolversInterfaceTypes<ResolversParentTypes>['Node'];
  PageInfo: PageInfo;
  Query: {};
  Signer: Signer;
  String: Scalars['String']['output'];
  Transaction: Omit<Transaction, 'cmd'> & { cmd: ResolversParentTypes['TransactionCommand'] };
  TransactionCommand: Omit<TransactionCommand, 'meta' | 'payload'> & { meta: ResolversParentTypes['TransactionMeta'], payload: ResolversParentTypes['TransactionPayload'] };
  TransactionInfo: ResolversUnionTypes<ResolversParentTypes>['TransactionInfo'];
  TransactionMempoolInfo: TransactionMempoolInfo;
  TransactionMeta: TransactionMeta;
  TransactionPayload: ResolversUnionTypes<ResolversParentTypes>['TransactionPayload'];
  TransactionResult: Omit<TransactionResult, 'block'> & { block: ResolversParentTypes['Block'] };
  TransactionSignature: TransactionSignature;
  Transfer: Omit<Transfer, 'block' | 'crossChainTransfer' | 'transaction'> & { block: ResolversParentTypes['Block'], crossChainTransfer?: Maybe<ResolversParentTypes['Transfer']>, transaction?: Maybe<ResolversParentTypes['Transaction']> };
};

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BlockResolvers<ContextType = any, ParentType extends ResolversParentTypes['Block'] = ResolversParentTypes['Block']> = {
  chainId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  creationTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  difficulty?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  epoch?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  events?: Resolver<ResolversTypes['BlockEventsConnection'], ParentType, ContextType, Partial<BlockEventsArgs>>;
  flags?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  height?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  minerAccount?: Resolver<ResolversTypes['FungibleChainAccount'], ParentType, ContextType>;
  neighbors?: Resolver<Array<ResolversTypes['BlockNeighbor']>, ParentType, ContextType>;
  nonce?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  parent?: Resolver<Maybe<ResolversTypes['Block']>, ParentType, ContextType>;
  payloadHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  target?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  transactions?: Resolver<ResolversTypes['BlockTransactionsConnection'], ParentType, ContextType, Partial<BlockTransactionsArgs>>;
  weight?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlockEventsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlockEventsConnection'] = ResolversParentTypes['BlockEventsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['BlockEventsConnectionEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlockEventsConnectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlockEventsConnectionEdge'] = ResolversParentTypes['BlockEventsConnectionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Event'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlockNeighborResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlockNeighbor'] = ResolversParentTypes['BlockNeighbor']> = {
  chainId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlockTransactionsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlockTransactionsConnection'] = ResolversParentTypes['BlockTransactionsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['BlockTransactionsConnectionEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BlockTransactionsConnectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlockTransactionsConnectionEdge'] = ResolversParentTypes['BlockTransactionsConnectionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ContinuationPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContinuationPayload'] = ResolversParentTypes['ContinuationPayload']> = {
  data?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pactId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  proof?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rollback?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  step?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface DecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Decimal'], any> {
  name: 'Decimal';
}

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  block?: Resolver<ResolversTypes['Block'], ParentType, ContextType>;
  chainId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  height?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  moduleName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  parameters?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  qualifiedName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  requestkey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExecutionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExecutionPayload'] = ResolversParentTypes['ExecutionPayload']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  data?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FungibleChainAccountResolvers<ContextType = any, ParentType extends ResolversParentTypes['FungibleChainAccount'] = ResolversParentTypes['FungibleChainAccount']> = {
  accountName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  chainId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fungibleName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  guard?: Resolver<ResolversTypes['Guard'], ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  transactions?: Resolver<ResolversTypes['FungibleChainAccountTransactionsConnection'], ParentType, ContextType, Partial<FungibleChainAccountTransactionsArgs>>;
  transfers?: Resolver<ResolversTypes['FungibleChainAccountTransfersConnection'], ParentType, ContextType, Partial<FungibleChainAccountTransfersArgs>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FungibleChainAccountTransactionsConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FungibleChainAccountTransactionsConnection'] = ResolversParentTypes['FungibleChainAccountTransactionsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['FungibleChainAccountTransactionsConnectionEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FungibleChainAccountTransactionsConnectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FungibleChainAccountTransactionsConnectionEdge'] = ResolversParentTypes['FungibleChainAccountTransactionsConnectionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Transaction'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FungibleChainAccountTransfersConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['FungibleChainAccountTransfersConnection'] = ResolversParentTypes['FungibleChainAccountTransfersConnection']> = {
  edges?: Resolver<Array<ResolversTypes['FungibleChainAccountTransfersConnectionEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FungibleChainAccountTransfersConnectionEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FungibleChainAccountTransfersConnectionEdge'] = ResolversParentTypes['FungibleChainAccountTransfersConnectionEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Transfer'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GuardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Guard'] = ResolversParentTypes['Guard']> = {
  keys?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  predicate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Block' | 'Event' | 'FungibleChainAccount' | 'Signer' | 'Transaction' | 'Transfer', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  block?: Resolver<Maybe<ResolversTypes['Block']>, ParentType, ContextType, RequireFields<QueryBlockArgs, 'hash'>>;
};

export type SignerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Signer'] = ResolversParentTypes['Signer']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  orderIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  pubkey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scheme?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
  cmd?: Resolver<ResolversTypes['TransactionCommand'], ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  sigs?: Resolver<Array<ResolversTypes['TransactionSignature']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionCommandResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionCommand'] = ResolversParentTypes['TransactionCommand']> = {
  meta?: Resolver<ResolversTypes['TransactionMeta'], ParentType, ContextType>;
  networkId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nonce?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  payload?: Resolver<ResolversTypes['TransactionPayload'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionInfo'] = ResolversParentTypes['TransactionInfo']> = {
  __resolveType: TypeResolveFn<'TransactionMempoolInfo' | 'TransactionResult', ParentType, ContextType>;
};

export type TransactionMempoolInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionMempoolInfo'] = ResolversParentTypes['TransactionMempoolInfo']> = {
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionMetaResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionMeta'] = ResolversParentTypes['TransactionMeta']> = {
  chainId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  creationTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  gasLimit?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  gasPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ttl?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionPayload'] = ResolversParentTypes['TransactionPayload']> = {
  __resolveType: TypeResolveFn<'ContinuationPayload' | 'ExecutionPayload', ParentType, ContextType>;
};

export type TransactionResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionResult'] = ResolversParentTypes['TransactionResult']> = {
  badResult?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  block?: Resolver<ResolversTypes['Block'], ParentType, ContextType>;
  continuation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  eventCount?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  goodResult?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  height?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  logs?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transactionId?: Resolver<Maybe<ResolversTypes['BigInt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransactionSignatureResolvers<ContextType = any, ParentType extends ResolversParentTypes['TransactionSignature'] = ResolversParentTypes['TransactionSignature']> = {
  sig?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TransferResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transfer'] = ResolversParentTypes['Transfer']> = {
  amount?: Resolver<ResolversTypes['Decimal'], ParentType, ContextType>;
  block?: Resolver<ResolversTypes['Block'], ParentType, ContextType>;
  blockHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  chainId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  creationTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  crossChainTransfer?: Resolver<Maybe<ResolversTypes['Transfer']>, ParentType, ContextType>;
  height?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  moduleHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  moduleName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orderIndex?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  receiverAccount?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  requestKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  senderAccount?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  transaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BigInt?: GraphQLScalarType;
  Block?: BlockResolvers<ContextType>;
  BlockEventsConnection?: BlockEventsConnectionResolvers<ContextType>;
  BlockEventsConnectionEdge?: BlockEventsConnectionEdgeResolvers<ContextType>;
  BlockNeighbor?: BlockNeighborResolvers<ContextType>;
  BlockTransactionsConnection?: BlockTransactionsConnectionResolvers<ContextType>;
  BlockTransactionsConnectionEdge?: BlockTransactionsConnectionEdgeResolvers<ContextType>;
  ContinuationPayload?: ContinuationPayloadResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Decimal?: GraphQLScalarType;
  Event?: EventResolvers<ContextType>;
  ExecutionPayload?: ExecutionPayloadResolvers<ContextType>;
  FungibleChainAccount?: FungibleChainAccountResolvers<ContextType>;
  FungibleChainAccountTransactionsConnection?: FungibleChainAccountTransactionsConnectionResolvers<ContextType>;
  FungibleChainAccountTransactionsConnectionEdge?: FungibleChainAccountTransactionsConnectionEdgeResolvers<ContextType>;
  FungibleChainAccountTransfersConnection?: FungibleChainAccountTransfersConnectionResolvers<ContextType>;
  FungibleChainAccountTransfersConnectionEdge?: FungibleChainAccountTransfersConnectionEdgeResolvers<ContextType>;
  Guard?: GuardResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Signer?: SignerResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  TransactionCommand?: TransactionCommandResolvers<ContextType>;
  TransactionInfo?: TransactionInfoResolvers<ContextType>;
  TransactionMempoolInfo?: TransactionMempoolInfoResolvers<ContextType>;
  TransactionMeta?: TransactionMetaResolvers<ContextType>;
  TransactionPayload?: TransactionPayloadResolvers<ContextType>;
  TransactionResult?: TransactionResultResolvers<ContextType>;
  TransactionSignature?: TransactionSignatureResolvers<ContextType>;
  Transfer?: TransferResolvers<ContextType>;
};

