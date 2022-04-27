import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export declare type Maybe<T> = T | null;
export declare type InputMaybe<T> = Maybe<T>;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    BigDecimal: string;
    BigInt: string;
    Bytes: any;
};
export declare type Aggregate = {
    __typename?: 'Aggregate';
    TVL: Scalars['BigInt'];
    id: Scalars['ID'];
    totalParticipants: Scalars['Int'];
    totalPools: Scalars['Int'];
};
export declare type Aggregate_Filter = {
    TVL?: InputMaybe<Scalars['BigInt']>;
    TVL_gt?: InputMaybe<Scalars['BigInt']>;
    TVL_gte?: InputMaybe<Scalars['BigInt']>;
    TVL_in?: InputMaybe<Array<Scalars['BigInt']>>;
    TVL_lt?: InputMaybe<Scalars['BigInt']>;
    TVL_lte?: InputMaybe<Scalars['BigInt']>;
    TVL_not?: InputMaybe<Scalars['BigInt']>;
    TVL_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    totalParticipants?: InputMaybe<Scalars['Int']>;
    totalParticipants_gt?: InputMaybe<Scalars['Int']>;
    totalParticipants_gte?: InputMaybe<Scalars['Int']>;
    totalParticipants_in?: InputMaybe<Array<Scalars['Int']>>;
    totalParticipants_lt?: InputMaybe<Scalars['Int']>;
    totalParticipants_lte?: InputMaybe<Scalars['Int']>;
    totalParticipants_not?: InputMaybe<Scalars['Int']>;
    totalParticipants_not_in?: InputMaybe<Array<Scalars['Int']>>;
    totalPools?: InputMaybe<Scalars['Int']>;
    totalPools_gt?: InputMaybe<Scalars['Int']>;
    totalPools_gte?: InputMaybe<Scalars['Int']>;
    totalPools_in?: InputMaybe<Array<Scalars['Int']>>;
    totalPools_lt?: InputMaybe<Scalars['Int']>;
    totalPools_lte?: InputMaybe<Scalars['Int']>;
    totalPools_not?: InputMaybe<Scalars['Int']>;
    totalPools_not_in?: InputMaybe<Array<Scalars['Int']>>;
};
export declare enum Aggregate_OrderBy {
    Tvl = "TVL",
    Id = "id",
    TotalParticipants = "totalParticipants",
    TotalPools = "totalPools"
}
export declare type Allocation = {
    __typename?: 'Allocation';
    amount: Scalars['BigInt'];
    collection: Scalars['ID'];
    epoch: Scalars['BigInt'];
    id: Scalars['ID'];
    timestamp: Scalars['BigInt'];
    user: User;
};
export declare type Allocation_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    amount?: InputMaybe<Scalars['BigInt']>;
    amount_gt?: InputMaybe<Scalars['BigInt']>;
    amount_gte?: InputMaybe<Scalars['BigInt']>;
    amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
    amount_lt?: InputMaybe<Scalars['BigInt']>;
    amount_lte?: InputMaybe<Scalars['BigInt']>;
    amount_not?: InputMaybe<Scalars['BigInt']>;
    amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    collection?: InputMaybe<Scalars['ID']>;
    collection_gt?: InputMaybe<Scalars['ID']>;
    collection_gte?: InputMaybe<Scalars['ID']>;
    collection_in?: InputMaybe<Array<Scalars['ID']>>;
    collection_lt?: InputMaybe<Scalars['ID']>;
    collection_lte?: InputMaybe<Scalars['ID']>;
    collection_not?: InputMaybe<Scalars['ID']>;
    collection_not_in?: InputMaybe<Array<Scalars['ID']>>;
    epoch?: InputMaybe<Scalars['BigInt']>;
    epoch_gt?: InputMaybe<Scalars['BigInt']>;
    epoch_gte?: InputMaybe<Scalars['BigInt']>;
    epoch_in?: InputMaybe<Array<Scalars['BigInt']>>;
    epoch_lt?: InputMaybe<Scalars['BigInt']>;
    epoch_lte?: InputMaybe<Scalars['BigInt']>;
    epoch_not?: InputMaybe<Scalars['BigInt']>;
    epoch_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    timestamp?: InputMaybe<Scalars['BigInt']>;
    timestamp_gt?: InputMaybe<Scalars['BigInt']>;
    timestamp_gte?: InputMaybe<Scalars['BigInt']>;
    timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    timestamp_lt?: InputMaybe<Scalars['BigInt']>;
    timestamp_lte?: InputMaybe<Scalars['BigInt']>;
    timestamp_not?: InputMaybe<Scalars['BigInt']>;
    timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    user?: InputMaybe<Scalars['String']>;
    user_contains?: InputMaybe<Scalars['String']>;
    user_contains_nocase?: InputMaybe<Scalars['String']>;
    user_ends_with?: InputMaybe<Scalars['String']>;
    user_ends_with_nocase?: InputMaybe<Scalars['String']>;
    user_gt?: InputMaybe<Scalars['String']>;
    user_gte?: InputMaybe<Scalars['String']>;
    user_in?: InputMaybe<Array<Scalars['String']>>;
    user_lt?: InputMaybe<Scalars['String']>;
    user_lte?: InputMaybe<Scalars['String']>;
    user_not?: InputMaybe<Scalars['String']>;
    user_not_contains?: InputMaybe<Scalars['String']>;
    user_not_contains_nocase?: InputMaybe<Scalars['String']>;
    user_not_ends_with?: InputMaybe<Scalars['String']>;
    user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    user_not_in?: InputMaybe<Array<Scalars['String']>>;
    user_not_starts_with?: InputMaybe<Scalars['String']>;
    user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    user_starts_with?: InputMaybe<Scalars['String']>;
    user_starts_with_nocase?: InputMaybe<Scalars['String']>;
};
export declare enum Allocation_OrderBy {
    Amount = "amount",
    Collection = "collection",
    Epoch = "epoch",
    Id = "id",
    Timestamp = "timestamp",
    User = "user"
}
export declare type BlockChangedFilter = {
    number_gte: Scalars['Int'];
};
export declare type Block_Height = {
    hash?: InputMaybe<Scalars['Bytes']>;
    number?: InputMaybe<Scalars['Int']>;
    number_gte?: InputMaybe<Scalars['Int']>;
};
/** Defines the order direction, either ascending or descending */
export declare enum OrderDirection {
    Asc = "asc",
    Desc = "desc"
}
export declare type Participant = {
    __typename?: 'Participant';
    id: Scalars['ID'];
};
export declare type Participant_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};
export declare enum Participant_OrderBy {
    Id = "id"
}
export declare type Query = {
    __typename?: 'Query';
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
    aggregate?: Maybe<Aggregate>;
    aggregates: Array<Aggregate>;
    allocation?: Maybe<Allocation>;
    allocations: Array<Allocation>;
    participant?: Maybe<Participant>;
    participants: Array<Participant>;
    ticket?: Maybe<Ticket>;
    tickets: Array<Ticket>;
    tokenPurchase?: Maybe<TokenPurchase>;
    tokenPurchases: Array<TokenPurchase>;
    user?: Maybe<User>;
    users: Array<User>;
    vault?: Maybe<Vault>;
    vaults: Array<Vault>;
};
export declare type Query_MetaArgs = {
    block?: InputMaybe<Block_Height>;
};
export declare type QueryAggregateArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryAggregatesArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Aggregate_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Aggregate_Filter>;
};
export declare type QueryAllocationArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryAllocationsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Allocation_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Allocation_Filter>;
};
export declare type QueryParticipantArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryParticipantsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Participant_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Participant_Filter>;
};
export declare type QueryTicketArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryTicketsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Ticket_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Ticket_Filter>;
};
export declare type QueryTokenPurchaseArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryTokenPurchasesArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<TokenPurchase_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<TokenPurchase_Filter>;
};
export declare type QueryUserArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryUsersArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<User_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<User_Filter>;
};
export declare type QueryVaultArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryVaultsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Vault_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Vault_Filter>;
};
export declare type Subscription = {
    __typename?: 'Subscription';
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
    aggregate?: Maybe<Aggregate>;
    aggregates: Array<Aggregate>;
    allocation?: Maybe<Allocation>;
    allocations: Array<Allocation>;
    participant?: Maybe<Participant>;
    participants: Array<Participant>;
    ticket?: Maybe<Ticket>;
    tickets: Array<Ticket>;
    tokenPurchase?: Maybe<TokenPurchase>;
    tokenPurchases: Array<TokenPurchase>;
    user?: Maybe<User>;
    users: Array<User>;
    vault?: Maybe<Vault>;
    vaults: Array<Vault>;
};
export declare type Subscription_MetaArgs = {
    block?: InputMaybe<Block_Height>;
};
export declare type SubscriptionAggregateArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionAggregatesArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Aggregate_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Aggregate_Filter>;
};
export declare type SubscriptionAllocationArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionAllocationsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Allocation_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Allocation_Filter>;
};
export declare type SubscriptionParticipantArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionParticipantsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Participant_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Participant_Filter>;
};
export declare type SubscriptionTicketArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionTicketsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Ticket_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Ticket_Filter>;
};
export declare type SubscriptionTokenPurchaseArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionTokenPurchasesArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<TokenPurchase_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<TokenPurchase_Filter>;
};
export declare type SubscriptionUserArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionUsersArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<User_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<User_Filter>;
};
export declare type SubscriptionVaultArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionVaultsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Vault_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Vault_Filter>;
};
export declare type Ticket = {
    __typename?: 'Ticket';
    id: Scalars['ID'];
    ticketNumber: Scalars['BigInt'];
    tokenPurchases: Array<TokenPurchase>;
    tokenPurchasesLength: Scalars['Int'];
    vaultAddress: Scalars['ID'];
};
export declare type TicketTokenPurchasesArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<TokenPurchase_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<TokenPurchase_Filter>;
};
export declare type Ticket_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    ticketNumber?: InputMaybe<Scalars['BigInt']>;
    ticketNumber_gt?: InputMaybe<Scalars['BigInt']>;
    ticketNumber_gte?: InputMaybe<Scalars['BigInt']>;
    ticketNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
    ticketNumber_lt?: InputMaybe<Scalars['BigInt']>;
    ticketNumber_lte?: InputMaybe<Scalars['BigInt']>;
    ticketNumber_not?: InputMaybe<Scalars['BigInt']>;
    ticketNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    tokenPurchasesLength?: InputMaybe<Scalars['Int']>;
    tokenPurchasesLength_gt?: InputMaybe<Scalars['Int']>;
    tokenPurchasesLength_gte?: InputMaybe<Scalars['Int']>;
    tokenPurchasesLength_in?: InputMaybe<Array<Scalars['Int']>>;
    tokenPurchasesLength_lt?: InputMaybe<Scalars['Int']>;
    tokenPurchasesLength_lte?: InputMaybe<Scalars['Int']>;
    tokenPurchasesLength_not?: InputMaybe<Scalars['Int']>;
    tokenPurchasesLength_not_in?: InputMaybe<Array<Scalars['Int']>>;
    vaultAddress?: InputMaybe<Scalars['ID']>;
    vaultAddress_gt?: InputMaybe<Scalars['ID']>;
    vaultAddress_gte?: InputMaybe<Scalars['ID']>;
    vaultAddress_in?: InputMaybe<Array<Scalars['ID']>>;
    vaultAddress_lt?: InputMaybe<Scalars['ID']>;
    vaultAddress_lte?: InputMaybe<Scalars['ID']>;
    vaultAddress_not?: InputMaybe<Scalars['ID']>;
    vaultAddress_not_in?: InputMaybe<Array<Scalars['ID']>>;
};
export declare enum Ticket_OrderBy {
    Id = "id",
    TicketNumber = "ticketNumber",
    TokenPurchases = "tokenPurchases",
    TokenPurchasesLength = "tokenPurchasesLength",
    VaultAddress = "vaultAddress"
}
export declare type TokenPurchase = {
    __typename?: 'TokenPurchase';
    amount: Scalars['BigInt'];
    id: Scalars['ID'];
    length: Scalars['BigInt'];
    owner: Scalars['ID'];
    soldAt?: Maybe<Scalars['BigInt']>;
    ticket: Ticket;
    timestamp: Scalars['BigInt'];
};
export declare type TokenPurchase_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    amount?: InputMaybe<Scalars['BigInt']>;
    amount_gt?: InputMaybe<Scalars['BigInt']>;
    amount_gte?: InputMaybe<Scalars['BigInt']>;
    amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
    amount_lt?: InputMaybe<Scalars['BigInt']>;
    amount_lte?: InputMaybe<Scalars['BigInt']>;
    amount_not?: InputMaybe<Scalars['BigInt']>;
    amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    length?: InputMaybe<Scalars['BigInt']>;
    length_gt?: InputMaybe<Scalars['BigInt']>;
    length_gte?: InputMaybe<Scalars['BigInt']>;
    length_in?: InputMaybe<Array<Scalars['BigInt']>>;
    length_lt?: InputMaybe<Scalars['BigInt']>;
    length_lte?: InputMaybe<Scalars['BigInt']>;
    length_not?: InputMaybe<Scalars['BigInt']>;
    length_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    owner?: InputMaybe<Scalars['ID']>;
    owner_gt?: InputMaybe<Scalars['ID']>;
    owner_gte?: InputMaybe<Scalars['ID']>;
    owner_in?: InputMaybe<Array<Scalars['ID']>>;
    owner_lt?: InputMaybe<Scalars['ID']>;
    owner_lte?: InputMaybe<Scalars['ID']>;
    owner_not?: InputMaybe<Scalars['ID']>;
    owner_not_in?: InputMaybe<Array<Scalars['ID']>>;
    soldAt?: InputMaybe<Scalars['BigInt']>;
    soldAt_gt?: InputMaybe<Scalars['BigInt']>;
    soldAt_gte?: InputMaybe<Scalars['BigInt']>;
    soldAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
    soldAt_lt?: InputMaybe<Scalars['BigInt']>;
    soldAt_lte?: InputMaybe<Scalars['BigInt']>;
    soldAt_not?: InputMaybe<Scalars['BigInt']>;
    soldAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    ticket?: InputMaybe<Scalars['String']>;
    ticket_contains?: InputMaybe<Scalars['String']>;
    ticket_contains_nocase?: InputMaybe<Scalars['String']>;
    ticket_ends_with?: InputMaybe<Scalars['String']>;
    ticket_ends_with_nocase?: InputMaybe<Scalars['String']>;
    ticket_gt?: InputMaybe<Scalars['String']>;
    ticket_gte?: InputMaybe<Scalars['String']>;
    ticket_in?: InputMaybe<Array<Scalars['String']>>;
    ticket_lt?: InputMaybe<Scalars['String']>;
    ticket_lte?: InputMaybe<Scalars['String']>;
    ticket_not?: InputMaybe<Scalars['String']>;
    ticket_not_contains?: InputMaybe<Scalars['String']>;
    ticket_not_contains_nocase?: InputMaybe<Scalars['String']>;
    ticket_not_ends_with?: InputMaybe<Scalars['String']>;
    ticket_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    ticket_not_in?: InputMaybe<Array<Scalars['String']>>;
    ticket_not_starts_with?: InputMaybe<Scalars['String']>;
    ticket_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    ticket_starts_with?: InputMaybe<Scalars['String']>;
    ticket_starts_with_nocase?: InputMaybe<Scalars['String']>;
    timestamp?: InputMaybe<Scalars['BigInt']>;
    timestamp_gt?: InputMaybe<Scalars['BigInt']>;
    timestamp_gte?: InputMaybe<Scalars['BigInt']>;
    timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    timestamp_lt?: InputMaybe<Scalars['BigInt']>;
    timestamp_lte?: InputMaybe<Scalars['BigInt']>;
    timestamp_not?: InputMaybe<Scalars['BigInt']>;
    timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};
export declare enum TokenPurchase_OrderBy {
    Amount = "amount",
    Id = "id",
    Length = "length",
    Owner = "owner",
    SoldAt = "soldAt",
    Ticket = "ticket",
    Timestamp = "timestamp"
}
export declare type User = {
    __typename?: 'User';
    allocations: Array<Allocation>;
    id: Scalars['ID'];
};
export declare type UserAllocationsArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Allocation_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Allocation_Filter>;
};
export declare type User_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};
export declare enum User_OrderBy {
    Allocations = "allocations",
    Id = "id"
}
export declare type Vault = {
    __typename?: 'Vault';
    emissionsSigned: Scalars['Boolean'];
    id: Scalars['ID'];
    nftAddress: Scalars['ID'];
    nonce: Scalars['Int'];
    owner: Scalars['ID'];
    size: Scalars['BigInt'];
    status: Scalars['Int'];
    tickets: Array<Ticket>;
    timestamp: Scalars['BigInt'];
    tokenId: Scalars['BigInt'];
};
export declare type VaultTicketsArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Ticket_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Ticket_Filter>;
};
export declare type Vault_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    emissionsSigned?: InputMaybe<Scalars['Boolean']>;
    emissionsSigned_in?: InputMaybe<Array<Scalars['Boolean']>>;
    emissionsSigned_not?: InputMaybe<Scalars['Boolean']>;
    emissionsSigned_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    nftAddress?: InputMaybe<Scalars['ID']>;
    nftAddress_gt?: InputMaybe<Scalars['ID']>;
    nftAddress_gte?: InputMaybe<Scalars['ID']>;
    nftAddress_in?: InputMaybe<Array<Scalars['ID']>>;
    nftAddress_lt?: InputMaybe<Scalars['ID']>;
    nftAddress_lte?: InputMaybe<Scalars['ID']>;
    nftAddress_not?: InputMaybe<Scalars['ID']>;
    nftAddress_not_in?: InputMaybe<Array<Scalars['ID']>>;
    nonce?: InputMaybe<Scalars['Int']>;
    nonce_gt?: InputMaybe<Scalars['Int']>;
    nonce_gte?: InputMaybe<Scalars['Int']>;
    nonce_in?: InputMaybe<Array<Scalars['Int']>>;
    nonce_lt?: InputMaybe<Scalars['Int']>;
    nonce_lte?: InputMaybe<Scalars['Int']>;
    nonce_not?: InputMaybe<Scalars['Int']>;
    nonce_not_in?: InputMaybe<Array<Scalars['Int']>>;
    owner?: InputMaybe<Scalars['ID']>;
    owner_gt?: InputMaybe<Scalars['ID']>;
    owner_gte?: InputMaybe<Scalars['ID']>;
    owner_in?: InputMaybe<Array<Scalars['ID']>>;
    owner_lt?: InputMaybe<Scalars['ID']>;
    owner_lte?: InputMaybe<Scalars['ID']>;
    owner_not?: InputMaybe<Scalars['ID']>;
    owner_not_in?: InputMaybe<Array<Scalars['ID']>>;
    size?: InputMaybe<Scalars['BigInt']>;
    size_gt?: InputMaybe<Scalars['BigInt']>;
    size_gte?: InputMaybe<Scalars['BigInt']>;
    size_in?: InputMaybe<Array<Scalars['BigInt']>>;
    size_lt?: InputMaybe<Scalars['BigInt']>;
    size_lte?: InputMaybe<Scalars['BigInt']>;
    size_not?: InputMaybe<Scalars['BigInt']>;
    size_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    status?: InputMaybe<Scalars['Int']>;
    status_gt?: InputMaybe<Scalars['Int']>;
    status_gte?: InputMaybe<Scalars['Int']>;
    status_in?: InputMaybe<Array<Scalars['Int']>>;
    status_lt?: InputMaybe<Scalars['Int']>;
    status_lte?: InputMaybe<Scalars['Int']>;
    status_not?: InputMaybe<Scalars['Int']>;
    status_not_in?: InputMaybe<Array<Scalars['Int']>>;
    tickets?: InputMaybe<Array<Scalars['String']>>;
    tickets_contains?: InputMaybe<Array<Scalars['String']>>;
    tickets_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    tickets_not?: InputMaybe<Array<Scalars['String']>>;
    tickets_not_contains?: InputMaybe<Array<Scalars['String']>>;
    tickets_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    timestamp?: InputMaybe<Scalars['BigInt']>;
    timestamp_gt?: InputMaybe<Scalars['BigInt']>;
    timestamp_gte?: InputMaybe<Scalars['BigInt']>;
    timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    timestamp_lt?: InputMaybe<Scalars['BigInt']>;
    timestamp_lte?: InputMaybe<Scalars['BigInt']>;
    timestamp_not?: InputMaybe<Scalars['BigInt']>;
    timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    tokenId?: InputMaybe<Scalars['BigInt']>;
    tokenId_gt?: InputMaybe<Scalars['BigInt']>;
    tokenId_gte?: InputMaybe<Scalars['BigInt']>;
    tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
    tokenId_lt?: InputMaybe<Scalars['BigInt']>;
    tokenId_lte?: InputMaybe<Scalars['BigInt']>;
    tokenId_not?: InputMaybe<Scalars['BigInt']>;
    tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};
export declare enum Vault_OrderBy {
    EmissionsSigned = "emissionsSigned",
    Id = "id",
    NftAddress = "nftAddress",
    Nonce = "nonce",
    Owner = "owner",
    Size = "size",
    Status = "status",
    Tickets = "tickets",
    Timestamp = "timestamp",
    TokenId = "tokenId"
}
export declare type _Block_ = {
    __typename?: '_Block_';
    /** The hash of the block */
    hash?: Maybe<Scalars['Bytes']>;
    /** The block number */
    number: Scalars['Int'];
};
/** The type for the top-level _meta field */
export declare type _Meta_ = {
    __typename?: '_Meta_';
    /**
     * Information about a specific subgraph block. The hash of the block
     * will be null if the _meta field has a block constraint that asks for
     * a block number. It will be filled if the _meta field has no block constraint
     * and therefore asks for the latest  block
     *
     */
    block: _Block_;
    /** The deployment ID */
    deployment: Scalars['String'];
    /** If `true`, the subgraph encountered indexing errors at some past block */
    hasIndexingErrors: Scalars['Boolean'];
};
export declare enum _SubgraphErrorPolicy_ {
    /** Data will be returned even if the subgraph has indexing errors */
    Allow = "allow",
    /** If the subgraph has indexing errors, data will be omitted. The default. */
    Deny = "deny"
}
export declare type GetAggregatesQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetAggregatesQuery = {
    __typename?: 'Query';
    aggregate?: {
        __typename?: 'Aggregate';
        id: string;
        totalPools: number;
        TVL: string;
        totalParticipants: number;
    } | null;
};
export declare type GetPoolsQueryVariables = Exact<{
    first: Scalars['Int'];
    skip: Scalars['Int'];
    orderBy?: InputMaybe<Vault_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Vault_Filter>;
}>;
export declare type GetPoolsQuery = {
    __typename?: 'Query';
    vaults: Array<{
        __typename?: 'Vault';
        id: string;
        nftAddress: string;
        tokenId: string;
        owner: string;
        status: number;
        nonce: number;
        timestamp: string;
        emissionsSigned: boolean;
        size: string;
        tickets: Array<{
            __typename?: 'Ticket';
            id: string;
            tokenPurchases: Array<{
                __typename?: 'TokenPurchase';
                owner: string;
                amount: string;
            }>;
        }>;
    }>;
};
export declare type GetTicketsQueryVariables = Exact<{
    first: Scalars['Int'];
    skip: Scalars['Int'];
    where?: InputMaybe<Ticket_Filter>;
}>;
export declare type GetTicketsQuery = {
    __typename?: 'Query';
    tickets: Array<{
        __typename?: 'Ticket';
        id: string;
        ticketNumber: string;
        vaultAddress: string;
        tokenPurchasesLength: number;
        tokenPurchases: Array<{
            __typename?: 'TokenPurchase';
            amount: string;
            id: string;
            length: string;
            owner: string;
            soldAt?: string | null;
            timestamp: string;
        }>;
    }>;
};
export declare const GetAggregatesDocument: DocumentNode<GetAggregatesQuery, Exact<{
    [key: string]: never;
}>>;
export declare const GetPoolsDocument: DocumentNode<GetPoolsQuery, Exact<{
    first: Scalars['Int'];
    skip: Scalars['Int'];
    orderBy?: Vault_OrderBy | null | undefined;
    orderDirection?: OrderDirection | null | undefined;
    where?: Vault_Filter | null | undefined;
}>>;
export declare const GetTicketsDocument: DocumentNode<GetTicketsQuery, Exact<{
    first: Scalars['Int'];
    skip: Scalars['Int'];
    where?: Ticket_Filter | null | undefined;
}>>;
