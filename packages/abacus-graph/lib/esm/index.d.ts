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
export declare type Auction = {
    __typename?: 'Auction';
    bids: Array<Bid>;
    endTimestamp: Scalars['Int'];
    ended: Scalars['Boolean'];
    highestBid: Scalars['BigInt'];
    highestBidder?: Maybe<Scalars['ID']>;
    id: Scalars['ID'];
};
export declare type AuctionBidsArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Bid_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Bid_Filter>;
};
export declare type Auction_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    bids?: InputMaybe<Array<Scalars['String']>>;
    bids_contains?: InputMaybe<Array<Scalars['String']>>;
    bids_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    bids_not?: InputMaybe<Array<Scalars['String']>>;
    bids_not_contains?: InputMaybe<Array<Scalars['String']>>;
    bids_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    endTimestamp?: InputMaybe<Scalars['Int']>;
    endTimestamp_gt?: InputMaybe<Scalars['Int']>;
    endTimestamp_gte?: InputMaybe<Scalars['Int']>;
    endTimestamp_in?: InputMaybe<Array<Scalars['Int']>>;
    endTimestamp_lt?: InputMaybe<Scalars['Int']>;
    endTimestamp_lte?: InputMaybe<Scalars['Int']>;
    endTimestamp_not?: InputMaybe<Scalars['Int']>;
    endTimestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
    ended?: InputMaybe<Scalars['Boolean']>;
    ended_in?: InputMaybe<Array<Scalars['Boolean']>>;
    ended_not?: InputMaybe<Scalars['Boolean']>;
    ended_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
    highestBid?: InputMaybe<Scalars['BigInt']>;
    highestBid_gt?: InputMaybe<Scalars['BigInt']>;
    highestBid_gte?: InputMaybe<Scalars['BigInt']>;
    highestBid_in?: InputMaybe<Array<Scalars['BigInt']>>;
    highestBid_lt?: InputMaybe<Scalars['BigInt']>;
    highestBid_lte?: InputMaybe<Scalars['BigInt']>;
    highestBid_not?: InputMaybe<Scalars['BigInt']>;
    highestBid_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    highestBidder?: InputMaybe<Scalars['ID']>;
    highestBidder_gt?: InputMaybe<Scalars['ID']>;
    highestBidder_gte?: InputMaybe<Scalars['ID']>;
    highestBidder_in?: InputMaybe<Array<Scalars['ID']>>;
    highestBidder_lt?: InputMaybe<Scalars['ID']>;
    highestBidder_lte?: InputMaybe<Scalars['ID']>;
    highestBidder_not?: InputMaybe<Scalars['ID']>;
    highestBidder_not_in?: InputMaybe<Array<Scalars['ID']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};
export declare enum Auction_OrderBy {
    Bids = "bids",
    EndTimestamp = "endTimestamp",
    Ended = "ended",
    HighestBid = "highestBid",
    HighestBidder = "highestBidder",
    Id = "id"
}
export declare type Bid = {
    __typename?: 'Bid';
    amount: Scalars['BigInt'];
    bidder: Scalars['ID'];
    id: Scalars['ID'];
    timestamp: Scalars['Int'];
};
export declare type Bid_Filter = {
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
    bidder?: InputMaybe<Scalars['ID']>;
    bidder_gt?: InputMaybe<Scalars['ID']>;
    bidder_gte?: InputMaybe<Scalars['ID']>;
    bidder_in?: InputMaybe<Array<Scalars['ID']>>;
    bidder_lt?: InputMaybe<Scalars['ID']>;
    bidder_lte?: InputMaybe<Scalars['ID']>;
    bidder_not?: InputMaybe<Scalars['ID']>;
    bidder_not_in?: InputMaybe<Array<Scalars['ID']>>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    timestamp?: InputMaybe<Scalars['Int']>;
    timestamp_gt?: InputMaybe<Scalars['Int']>;
    timestamp_gte?: InputMaybe<Scalars['Int']>;
    timestamp_in?: InputMaybe<Array<Scalars['Int']>>;
    timestamp_lt?: InputMaybe<Scalars['Int']>;
    timestamp_lte?: InputMaybe<Scalars['Int']>;
    timestamp_not?: InputMaybe<Scalars['Int']>;
    timestamp_not_in?: InputMaybe<Array<Scalars['Int']>>;
};
export declare enum Bid_OrderBy {
    Amount = "amount",
    Bidder = "bidder",
    Id = "id",
    Timestamp = "timestamp"
}
export declare type BlockChangedFilter = {
    number_gte: Scalars['Int'];
};
export declare type Block_Height = {
    hash?: InputMaybe<Scalars['Bytes']>;
    number?: InputMaybe<Scalars['Int']>;
    number_gte?: InputMaybe<Scalars['Int']>;
};
export declare type EpochAllocation = {
    __typename?: 'EpochAllocation';
    amount: Scalars['BigInt'];
    collection: Scalars['ID'];
    epoch: Scalars['BigInt'];
    id: Scalars['ID'];
};
export declare type EpochAllocationAggregate = {
    __typename?: 'EpochAllocationAggregate';
    amount: Scalars['BigInt'];
    epoch: Scalars['BigInt'];
    id: Scalars['ID'];
};
export declare type EpochAllocationAggregate_Filter = {
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
};
export declare enum EpochAllocationAggregate_OrderBy {
    Amount = "amount",
    Epoch = "epoch",
    Id = "id"
}
export declare type EpochAllocation_Filter = {
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
};
export declare enum EpochAllocation_OrderBy {
    Amount = "amount",
    Collection = "collection",
    Epoch = "epoch",
    Id = "id"
}
export declare type Nft = {
    __typename?: 'NFT';
    address: Scalars['String'];
    id: Scalars['ID'];
    tokenId: Scalars['String'];
};
export declare type Nft_Filter = {
    /** Filter for the block changed event. */
    _change_block?: InputMaybe<BlockChangedFilter>;
    address?: InputMaybe<Scalars['String']>;
    address_contains?: InputMaybe<Scalars['String']>;
    address_contains_nocase?: InputMaybe<Scalars['String']>;
    address_ends_with?: InputMaybe<Scalars['String']>;
    address_ends_with_nocase?: InputMaybe<Scalars['String']>;
    address_gt?: InputMaybe<Scalars['String']>;
    address_gte?: InputMaybe<Scalars['String']>;
    address_in?: InputMaybe<Array<Scalars['String']>>;
    address_lt?: InputMaybe<Scalars['String']>;
    address_lte?: InputMaybe<Scalars['String']>;
    address_not?: InputMaybe<Scalars['String']>;
    address_not_contains?: InputMaybe<Scalars['String']>;
    address_not_contains_nocase?: InputMaybe<Scalars['String']>;
    address_not_ends_with?: InputMaybe<Scalars['String']>;
    address_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    address_not_in?: InputMaybe<Array<Scalars['String']>>;
    address_not_starts_with?: InputMaybe<Scalars['String']>;
    address_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    address_starts_with?: InputMaybe<Scalars['String']>;
    address_starts_with_nocase?: InputMaybe<Scalars['String']>;
    id?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    tokenId?: InputMaybe<Scalars['String']>;
    tokenId_contains?: InputMaybe<Scalars['String']>;
    tokenId_contains_nocase?: InputMaybe<Scalars['String']>;
    tokenId_ends_with?: InputMaybe<Scalars['String']>;
    tokenId_ends_with_nocase?: InputMaybe<Scalars['String']>;
    tokenId_gt?: InputMaybe<Scalars['String']>;
    tokenId_gte?: InputMaybe<Scalars['String']>;
    tokenId_in?: InputMaybe<Array<Scalars['String']>>;
    tokenId_lt?: InputMaybe<Scalars['String']>;
    tokenId_lte?: InputMaybe<Scalars['String']>;
    tokenId_not?: InputMaybe<Scalars['String']>;
    tokenId_not_contains?: InputMaybe<Scalars['String']>;
    tokenId_not_contains_nocase?: InputMaybe<Scalars['String']>;
    tokenId_not_ends_with?: InputMaybe<Scalars['String']>;
    tokenId_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    tokenId_not_in?: InputMaybe<Array<Scalars['String']>>;
    tokenId_not_starts_with?: InputMaybe<Scalars['String']>;
    tokenId_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    tokenId_starts_with?: InputMaybe<Scalars['String']>;
    tokenId_starts_with_nocase?: InputMaybe<Scalars['String']>;
};
export declare enum Nft_OrderBy {
    Address = "address",
    Id = "id",
    TokenId = "tokenId"
}
/** Defines the order direction, either ascending or descending */
export declare enum OrderDirection {
    Asc = "asc",
    Desc = "desc"
}
export declare type Participant = {
    __typename?: 'Participant';
    id: Scalars['ID'];
    vaults: Array<Scalars['ID']>;
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
    vaults?: InputMaybe<Array<Scalars['ID']>>;
    vaults_contains?: InputMaybe<Array<Scalars['ID']>>;
    vaults_contains_nocase?: InputMaybe<Array<Scalars['ID']>>;
    vaults_not?: InputMaybe<Array<Scalars['ID']>>;
    vaults_not_contains?: InputMaybe<Array<Scalars['ID']>>;
    vaults_not_contains_nocase?: InputMaybe<Array<Scalars['ID']>>;
};
export declare enum Participant_OrderBy {
    Id = "id",
    Vaults = "vaults"
}
export declare type Query = {
    __typename?: 'Query';
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
    aggregate?: Maybe<Aggregate>;
    aggregates: Array<Aggregate>;
    allocation?: Maybe<Allocation>;
    allocations: Array<Allocation>;
    auction?: Maybe<Auction>;
    auctions: Array<Auction>;
    bid?: Maybe<Bid>;
    bids: Array<Bid>;
    epochAllocation?: Maybe<EpochAllocation>;
    epochAllocationAggregate?: Maybe<EpochAllocationAggregate>;
    epochAllocationAggregates: Array<EpochAllocationAggregate>;
    epochAllocations: Array<EpochAllocation>;
    nft?: Maybe<Nft>;
    nfts: Array<Nft>;
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
export declare type QueryAuctionArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryAuctionsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Auction_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Auction_Filter>;
};
export declare type QueryBidArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryBidsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Bid_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Bid_Filter>;
};
export declare type QueryEpochAllocationArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryEpochAllocationAggregateArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryEpochAllocationAggregatesArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<EpochAllocationAggregate_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<EpochAllocationAggregate_Filter>;
};
export declare type QueryEpochAllocationsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<EpochAllocation_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<EpochAllocation_Filter>;
};
export declare type QueryNftArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryNftsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Nft_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Nft_Filter>;
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
    auction?: Maybe<Auction>;
    auctions: Array<Auction>;
    bid?: Maybe<Bid>;
    bids: Array<Bid>;
    epochAllocation?: Maybe<EpochAllocation>;
    epochAllocationAggregate?: Maybe<EpochAllocationAggregate>;
    epochAllocationAggregates: Array<EpochAllocationAggregate>;
    epochAllocations: Array<EpochAllocation>;
    nft?: Maybe<Nft>;
    nfts: Array<Nft>;
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
export declare type SubscriptionAuctionArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionAuctionsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Auction_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Auction_Filter>;
};
export declare type SubscriptionBidArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionBidsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Bid_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Bid_Filter>;
};
export declare type SubscriptionEpochAllocationArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionEpochAllocationAggregateArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionEpochAllocationAggregatesArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<EpochAllocationAggregate_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<EpochAllocationAggregate_Filter>;
};
export declare type SubscriptionEpochAllocationsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<EpochAllocation_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<EpochAllocation_Filter>;
};
export declare type SubscriptionNftArgs = {
    block?: InputMaybe<Block_Height>;
    id: Scalars['ID'];
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionNftsArgs = {
    block?: InputMaybe<Block_Height>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Nft_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    subgraphError?: _SubgraphErrorPolicy_;
    where?: InputMaybe<Nft_Filter>;
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
    name: Scalars['String'];
    nfts: Array<Nft>;
    owner: Scalars['ID'];
    size: Scalars['BigInt'];
    status: Scalars['Int'];
    tickets: Array<Ticket>;
    timestamp: Scalars['BigInt'];
    totalParticipants: Scalars['Int'];
};
export declare type VaultNftsArgs = {
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Nft_OrderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    skip?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<Nft_Filter>;
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
    name?: InputMaybe<Scalars['String']>;
    name_contains?: InputMaybe<Scalars['String']>;
    name_contains_nocase?: InputMaybe<Scalars['String']>;
    name_ends_with?: InputMaybe<Scalars['String']>;
    name_ends_with_nocase?: InputMaybe<Scalars['String']>;
    name_gt?: InputMaybe<Scalars['String']>;
    name_gte?: InputMaybe<Scalars['String']>;
    name_in?: InputMaybe<Array<Scalars['String']>>;
    name_lt?: InputMaybe<Scalars['String']>;
    name_lte?: InputMaybe<Scalars['String']>;
    name_not?: InputMaybe<Scalars['String']>;
    name_not_contains?: InputMaybe<Scalars['String']>;
    name_not_contains_nocase?: InputMaybe<Scalars['String']>;
    name_not_ends_with?: InputMaybe<Scalars['String']>;
    name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
    name_not_in?: InputMaybe<Array<Scalars['String']>>;
    name_not_starts_with?: InputMaybe<Scalars['String']>;
    name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
    name_starts_with?: InputMaybe<Scalars['String']>;
    name_starts_with_nocase?: InputMaybe<Scalars['String']>;
    nfts?: InputMaybe<Array<Scalars['String']>>;
    nfts_contains?: InputMaybe<Array<Scalars['String']>>;
    nfts_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
    nfts_not?: InputMaybe<Array<Scalars['String']>>;
    nfts_not_contains?: InputMaybe<Array<Scalars['String']>>;
    nfts_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
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
    totalParticipants?: InputMaybe<Scalars['Int']>;
    totalParticipants_gt?: InputMaybe<Scalars['Int']>;
    totalParticipants_gte?: InputMaybe<Scalars['Int']>;
    totalParticipants_in?: InputMaybe<Array<Scalars['Int']>>;
    totalParticipants_lt?: InputMaybe<Scalars['Int']>;
    totalParticipants_lte?: InputMaybe<Scalars['Int']>;
    totalParticipants_not?: InputMaybe<Scalars['Int']>;
    totalParticipants_not_in?: InputMaybe<Array<Scalars['Int']>>;
};
export declare enum Vault_OrderBy {
    EmissionsSigned = "emissionsSigned",
    Id = "id",
    Name = "name",
    Nfts = "nfts",
    Owner = "owner",
    Size = "size",
    Status = "status",
    Tickets = "tickets",
    Timestamp = "timestamp",
    TotalParticipants = "totalParticipants"
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
export declare type AllocationFragment = {
    __typename?: 'Allocation';
    id: string;
    epoch: string;
    collection: string;
    amount: string;
    timestamp: string;
};
export declare type AllocationsQueryVariables = Exact<{
    first: Scalars['Int'];
    skip: Scalars['Int'];
}>;
export declare type AllocationsQuery = {
    __typename?: 'Query';
    allocations: Array<{
        __typename?: 'Allocation';
        id: string;
        epoch: string;
        collection: string;
        amount: string;
        timestamp: string;
    }>;
};
export declare type BidFragment = {
    __typename?: 'Bid';
    id: string;
    bidder: string;
    timestamp: number;
    amount: string;
};
export declare type GetAuctionQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetAuctionQuery = {
    __typename?: 'Query';
    auction?: {
        __typename?: 'Auction';
        id: string;
        highestBid: string;
        highestBidder?: string | null;
        bids: Array<{
            __typename?: 'Bid';
            id: string;
            bidder: string;
            timestamp: number;
            amount: string;
        }>;
    } | null;
};
export declare type GetAuctionsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetAuctionsQuery = {
    __typename?: 'Query';
    auctions: Array<{
        __typename?: 'Auction';
        id: string;
        highestBid: string;
        highestBidder?: string | null;
        bids: Array<{
            __typename?: 'Bid';
            id: string;
            bidder: string;
            timestamp: number;
            amount: string;
        }>;
    }>;
};
export declare type GetEpochAllocationAggregateQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetEpochAllocationAggregateQuery = {
    __typename?: 'Query';
    epochAllocationAggregate?: {
        __typename?: 'EpochAllocationAggregate';
        id: string;
        amount: string;
        epoch: string;
    } | null;
};
export declare type GetEpochAllocationsQueryVariables = Exact<{
    where?: InputMaybe<EpochAllocation_Filter>;
}>;
export declare type GetEpochAllocationsQuery = {
    __typename?: 'Query';
    epochAllocations: Array<{
        __typename?: 'EpochAllocation';
        id: string;
        amount: string;
        collection: string;
        epoch: string;
    }>;
};
export declare type VaultFragment = {
    __typename?: 'Vault';
    id: string;
    name: string;
    owner: string;
    status: number;
    timestamp: string;
    emissionsSigned: boolean;
    size: string;
    totalParticipants: number;
    nfts: Array<{
        __typename?: 'NFT';
        id: string;
        address: string;
        tokenId: string;
    }>;
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
        name: string;
        owner: string;
        status: number;
        timestamp: string;
        emissionsSigned: boolean;
        size: string;
        totalParticipants: number;
        nfts: Array<{
            __typename?: 'NFT';
            id: string;
            address: string;
            tokenId: string;
        }>;
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
    }>;
};
export declare type GetPoolQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetPoolQuery = {
    __typename?: 'Query';
    vault?: {
        __typename?: 'Vault';
        id: string;
        name: string;
        owner: string;
        status: number;
        timestamp: string;
        emissionsSigned: boolean;
        size: string;
        totalParticipants: number;
        nfts: Array<{
            __typename?: 'NFT';
            id: string;
            address: string;
            tokenId: string;
        }>;
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
    } | null;
};
export declare type TokenPurchaseFragment = {
    __typename?: 'TokenPurchase';
    amount: string;
    id: string;
    length: string;
    owner: string;
    soldAt?: string | null;
    timestamp: string;
};
export declare type TicketFragment = {
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
export declare type UserAllocationsQueryVariables = Exact<{
    id: Scalars['ID'];
    where?: InputMaybe<Allocation_Filter>;
}>;
export declare type UserAllocationsQuery = {
    __typename?: 'Query';
    user?: {
        __typename?: 'User';
        allocations: Array<{
            __typename?: 'Allocation';
            id: string;
            epoch: string;
            collection: string;
            amount: string;
            timestamp: string;
        }>;
    } | null;
};
export declare const AllocationFragmentDoc: DocumentNode<AllocationFragment, unknown>;
export declare const BidFragmentDoc: DocumentNode<BidFragment, unknown>;
export declare const TokenPurchaseFragmentDoc: DocumentNode<TokenPurchaseFragment, unknown>;
export declare const TicketFragmentDoc: DocumentNode<TicketFragment, unknown>;
export declare const VaultFragmentDoc: DocumentNode<VaultFragment, unknown>;
export declare const GetAggregatesDocument: DocumentNode<GetAggregatesQuery, Exact<{
    [key: string]: never;
}>>;
export declare const AllocationsDocument: DocumentNode<AllocationsQuery, Exact<{
    first: Scalars['Int'];
    skip: Scalars['Int'];
}>>;
export declare const GetAuctionDocument: DocumentNode<GetAuctionQuery, Exact<{
    id: Scalars['ID'];
}>>;
export declare const GetAuctionsDocument: DocumentNode<GetAuctionsQuery, Exact<{
    [key: string]: never;
}>>;
export declare const GetEpochAllocationAggregateDocument: DocumentNode<GetEpochAllocationAggregateQuery, Exact<{
    id: Scalars['ID'];
}>>;
export declare const GetEpochAllocationsDocument: DocumentNode<GetEpochAllocationsQuery, Exact<{
    where?: InputMaybe<EpochAllocation_Filter> | undefined;
}>>;
export declare const GetPoolsDocument: DocumentNode<GetPoolsQuery, Exact<{
    first: Scalars['Int'];
    skip: Scalars['Int'];
    orderBy?: InputMaybe<Vault_OrderBy> | undefined;
    orderDirection?: InputMaybe<OrderDirection> | undefined;
    where?: InputMaybe<Vault_Filter> | undefined;
}>>;
export declare const GetPoolDocument: DocumentNode<GetPoolQuery, Exact<{
    id: Scalars['ID'];
}>>;
export declare const GetTicketsDocument: DocumentNode<GetTicketsQuery, Exact<{
    first: Scalars['Int'];
    skip: Scalars['Int'];
    where?: InputMaybe<Ticket_Filter> | undefined;
}>>;
export declare const UserAllocationsDocument: DocumentNode<UserAllocationsQuery, Exact<{
    id: Scalars['ID'];
    where?: InputMaybe<Allocation_Filter> | undefined;
}>>;
