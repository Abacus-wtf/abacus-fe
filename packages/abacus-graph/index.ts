import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: string;
  BigInt: string;
  Bytes: any;
};

export type Aggregate = {
  __typename?: 'Aggregate';
  TVL: Scalars['BigInt'];
  id: Scalars['ID'];
  totalParticipants: Scalars['Int'];
  totalPools: Scalars['Int'];
};

export type Aggregate_Filter = {
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

export enum Aggregate_OrderBy {
  Tvl = 'TVL',
  Id = 'id',
  TotalParticipants = 'totalParticipants',
  TotalPools = 'totalPools'
}

export type Allocation = {
  __typename?: 'Allocation';
  amount: Scalars['BigInt'];
  collection: Scalars['ID'];
  epoch: Scalars['BigInt'];
  id: Scalars['ID'];
  timestamp: Scalars['BigInt'];
  user: User;
};

export type Allocation_Filter = {
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
  user_?: InputMaybe<User_Filter>;
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

export enum Allocation_OrderBy {
  Amount = 'amount',
  Collection = 'collection',
  Epoch = 'epoch',
  Id = 'id',
  Timestamp = 'timestamp',
  User = 'user'
}

export type Auction = {
  __typename?: 'Auction';
  bids: Array<Bid>;
  endTimestamp: Scalars['Int'];
  ended: Scalars['Boolean'];
  highestBid: Scalars['BigInt'];
  highestBidder?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
};


export type AuctionBidsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bid_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Bid_Filter>;
};

export type Auction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  bids?: InputMaybe<Array<Scalars['String']>>;
  bids_?: InputMaybe<Bid_Filter>;
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

export enum Auction_OrderBy {
  Bids = 'bids',
  EndTimestamp = 'endTimestamp',
  Ended = 'ended',
  HighestBid = 'highestBid',
  HighestBidder = 'highestBidder',
  Id = 'id'
}

export type Bid = {
  __typename?: 'Bid';
  amount: Scalars['BigInt'];
  bidder: Scalars['ID'];
  id: Scalars['ID'];
  timestamp: Scalars['Int'];
};

export type Bid_Filter = {
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

export enum Bid_OrderBy {
  Amount = 'amount',
  Bidder = 'bidder',
  Id = 'id',
  Timestamp = 'timestamp'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type EpochAllocation = {
  __typename?: 'EpochAllocation';
  amount: Scalars['BigInt'];
  collection: Scalars['ID'];
  epoch: Scalars['BigInt'];
  id: Scalars['ID'];
};

export type EpochAllocationAggregate = {
  __typename?: 'EpochAllocationAggregate';
  amount: Scalars['BigInt'];
  epoch: Scalars['BigInt'];
  id: Scalars['ID'];
};

export type EpochAllocationAggregate_Filter = {
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

export enum EpochAllocationAggregate_OrderBy {
  Amount = 'amount',
  Epoch = 'epoch',
  Id = 'id'
}

export type EpochAllocation_Filter = {
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

export enum EpochAllocation_OrderBy {
  Amount = 'amount',
  Collection = 'collection',
  Epoch = 'epoch',
  Id = 'id'
}

export type Nft = {
  __typename?: 'NFT';
  address: Scalars['String'];
  id: Scalars['ID'];
  tokenId: Scalars['String'];
  vaults?: Maybe<Array<VaultNft>>;
};


export type NftVaultsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VaultNft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VaultNft_Filter>;
};

export type Nft_Filter = {
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
  vaults_?: InputMaybe<VaultNft_Filter>;
};

export enum Nft_OrderBy {
  Address = 'address',
  Id = 'id',
  TokenId = 'tokenId',
  Vaults = 'vaults'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Participant = {
  __typename?: 'Participant';
  id: Scalars['ID'];
  vaults: Array<Scalars['ID']>;
};

export type Participant_Filter = {
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

export enum Participant_OrderBy {
  Id = 'id',
  Vaults = 'vaults'
}

export type Query = {
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
  vaultNFT?: Maybe<VaultNft>;
  vaultNFTs: Array<VaultNft>;
  vaults: Array<Vault>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAggregateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAggregatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Aggregate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Aggregate_Filter>;
};


export type QueryAllocationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAllocationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Allocation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Allocation_Filter>;
};


export type QueryAuctionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAuctionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Auction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Auction_Filter>;
};


export type QueryBidArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBidsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bid_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Bid_Filter>;
};


export type QueryEpochAllocationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEpochAllocationAggregateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryEpochAllocationAggregatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EpochAllocationAggregate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EpochAllocationAggregate_Filter>;
};


export type QueryEpochAllocationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EpochAllocation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EpochAllocation_Filter>;
};


export type QueryNftArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryNftsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Nft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Nft_Filter>;
};


export type QueryParticipantArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryParticipantsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Participant_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Participant_Filter>;
};


export type QueryTicketArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTicketsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Ticket_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Ticket_Filter>;
};


export type QueryTokenPurchaseArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokenPurchasesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenPurchase_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenPurchase_Filter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};


export type QueryVaultArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVaultNftArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVaultNfTsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VaultNft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultNft_Filter>;
};


export type QueryVaultsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vault_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vault_Filter>;
};

export type Subscription = {
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
  vaultNFT?: Maybe<VaultNft>;
  vaultNFTs: Array<VaultNft>;
  vaults: Array<Vault>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAggregateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAggregatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Aggregate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Aggregate_Filter>;
};


export type SubscriptionAllocationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAllocationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Allocation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Allocation_Filter>;
};


export type SubscriptionAuctionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAuctionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Auction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Auction_Filter>;
};


export type SubscriptionBidArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBidsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bid_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Bid_Filter>;
};


export type SubscriptionEpochAllocationArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionEpochAllocationAggregateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionEpochAllocationAggregatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EpochAllocationAggregate_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EpochAllocationAggregate_Filter>;
};


export type SubscriptionEpochAllocationsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<EpochAllocation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<EpochAllocation_Filter>;
};


export type SubscriptionNftArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionNftsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Nft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Nft_Filter>;
};


export type SubscriptionParticipantArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionParticipantsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Participant_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Participant_Filter>;
};


export type SubscriptionTicketArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTicketsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Ticket_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Ticket_Filter>;
};


export type SubscriptionTokenPurchaseArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokenPurchasesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenPurchase_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TokenPurchase_Filter>;
};


export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};


export type SubscriptionVaultArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVaultNftArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVaultNfTsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VaultNft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VaultNft_Filter>;
};


export type SubscriptionVaultsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Vault_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Vault_Filter>;
};

export type Ticket = {
  __typename?: 'Ticket';
  id: Scalars['ID'];
  ticketNumber: Scalars['BigInt'];
  tokenPurchases: Array<TokenPurchase>;
  tokenPurchasesLength: Scalars['Int'];
  vaultAddress: Scalars['ID'];
};


export type TicketTokenPurchasesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TokenPurchase_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TokenPurchase_Filter>;
};

export type Ticket_Filter = {
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
  tokenPurchases_?: InputMaybe<TokenPurchase_Filter>;
  vaultAddress?: InputMaybe<Scalars['ID']>;
  vaultAddress_gt?: InputMaybe<Scalars['ID']>;
  vaultAddress_gte?: InputMaybe<Scalars['ID']>;
  vaultAddress_in?: InputMaybe<Array<Scalars['ID']>>;
  vaultAddress_lt?: InputMaybe<Scalars['ID']>;
  vaultAddress_lte?: InputMaybe<Scalars['ID']>;
  vaultAddress_not?: InputMaybe<Scalars['ID']>;
  vaultAddress_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum Ticket_OrderBy {
  Id = 'id',
  TicketNumber = 'ticketNumber',
  TokenPurchases = 'tokenPurchases',
  TokenPurchasesLength = 'tokenPurchasesLength',
  VaultAddress = 'vaultAddress'
}

export type TokenPurchase = {
  __typename?: 'TokenPurchase';
  amount: Scalars['BigInt'];
  finalEpoch: Scalars['Int'];
  id: Scalars['ID'];
  owner: Scalars['ID'];
  soldAt?: Maybe<Scalars['BigInt']>;
  startEpoch: Scalars['Int'];
  ticket: Ticket;
  timestamp: Scalars['BigInt'];
};

export type TokenPurchase_Filter = {
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
  finalEpoch?: InputMaybe<Scalars['Int']>;
  finalEpoch_gt?: InputMaybe<Scalars['Int']>;
  finalEpoch_gte?: InputMaybe<Scalars['Int']>;
  finalEpoch_in?: InputMaybe<Array<Scalars['Int']>>;
  finalEpoch_lt?: InputMaybe<Scalars['Int']>;
  finalEpoch_lte?: InputMaybe<Scalars['Int']>;
  finalEpoch_not?: InputMaybe<Scalars['Int']>;
  finalEpoch_not_in?: InputMaybe<Array<Scalars['Int']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
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
  startEpoch?: InputMaybe<Scalars['Int']>;
  startEpoch_gt?: InputMaybe<Scalars['Int']>;
  startEpoch_gte?: InputMaybe<Scalars['Int']>;
  startEpoch_in?: InputMaybe<Array<Scalars['Int']>>;
  startEpoch_lt?: InputMaybe<Scalars['Int']>;
  startEpoch_lte?: InputMaybe<Scalars['Int']>;
  startEpoch_not?: InputMaybe<Scalars['Int']>;
  startEpoch_not_in?: InputMaybe<Array<Scalars['Int']>>;
  ticket?: InputMaybe<Scalars['String']>;
  ticket_?: InputMaybe<Ticket_Filter>;
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

export enum TokenPurchase_OrderBy {
  Amount = 'amount',
  FinalEpoch = 'finalEpoch',
  Id = 'id',
  Owner = 'owner',
  SoldAt = 'soldAt',
  StartEpoch = 'startEpoch',
  Ticket = 'ticket',
  Timestamp = 'timestamp'
}

export type User = {
  __typename?: 'User';
  allocations: Array<Allocation>;
  id: Scalars['ID'];
};


export type UserAllocationsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Allocation_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Allocation_Filter>;
};

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  allocations_?: InputMaybe<Allocation_Filter>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export enum User_OrderBy {
  Allocations = 'allocations',
  Id = 'id'
}

export type Vault = {
  __typename?: 'Vault';
  emissionsSigned: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  nfts?: Maybe<Array<VaultNft>>;
  owner: Scalars['ID'];
  status: Scalars['Int'];
  tickets: Array<Ticket>;
  timestamp: Scalars['BigInt'];
  totalParticipants: Scalars['Int'];
};


export type VaultNftsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VaultNft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<VaultNft_Filter>;
};


export type VaultTicketsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Ticket_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Ticket_Filter>;
};

export type VaultNft = {
  __typename?: 'VaultNFT';
  id: Scalars['ID'];
  nft: Nft;
  vault: Vault;
};

export type VaultNft_Filter = {
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
  nft?: InputMaybe<Scalars['String']>;
  nft_?: InputMaybe<Nft_Filter>;
  nft_contains?: InputMaybe<Scalars['String']>;
  nft_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_ends_with?: InputMaybe<Scalars['String']>;
  nft_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_gt?: InputMaybe<Scalars['String']>;
  nft_gte?: InputMaybe<Scalars['String']>;
  nft_in?: InputMaybe<Array<Scalars['String']>>;
  nft_lt?: InputMaybe<Scalars['String']>;
  nft_lte?: InputMaybe<Scalars['String']>;
  nft_not?: InputMaybe<Scalars['String']>;
  nft_not_contains?: InputMaybe<Scalars['String']>;
  nft_not_contains_nocase?: InputMaybe<Scalars['String']>;
  nft_not_ends_with?: InputMaybe<Scalars['String']>;
  nft_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  nft_not_in?: InputMaybe<Array<Scalars['String']>>;
  nft_not_starts_with?: InputMaybe<Scalars['String']>;
  nft_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  nft_starts_with?: InputMaybe<Scalars['String']>;
  nft_starts_with_nocase?: InputMaybe<Scalars['String']>;
  vault?: InputMaybe<Scalars['String']>;
  vault_?: InputMaybe<Vault_Filter>;
  vault_contains?: InputMaybe<Scalars['String']>;
  vault_contains_nocase?: InputMaybe<Scalars['String']>;
  vault_ends_with?: InputMaybe<Scalars['String']>;
  vault_ends_with_nocase?: InputMaybe<Scalars['String']>;
  vault_gt?: InputMaybe<Scalars['String']>;
  vault_gte?: InputMaybe<Scalars['String']>;
  vault_in?: InputMaybe<Array<Scalars['String']>>;
  vault_lt?: InputMaybe<Scalars['String']>;
  vault_lte?: InputMaybe<Scalars['String']>;
  vault_not?: InputMaybe<Scalars['String']>;
  vault_not_contains?: InputMaybe<Scalars['String']>;
  vault_not_contains_nocase?: InputMaybe<Scalars['String']>;
  vault_not_ends_with?: InputMaybe<Scalars['String']>;
  vault_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  vault_not_in?: InputMaybe<Array<Scalars['String']>>;
  vault_not_starts_with?: InputMaybe<Scalars['String']>;
  vault_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  vault_starts_with?: InputMaybe<Scalars['String']>;
  vault_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum VaultNft_OrderBy {
  Id = 'id',
  Nft = 'nft',
  Vault = 'vault'
}

export type Vault_Filter = {
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
  nfts_?: InputMaybe<VaultNft_Filter>;
  owner?: InputMaybe<Scalars['ID']>;
  owner_gt?: InputMaybe<Scalars['ID']>;
  owner_gte?: InputMaybe<Scalars['ID']>;
  owner_in?: InputMaybe<Array<Scalars['ID']>>;
  owner_lt?: InputMaybe<Scalars['ID']>;
  owner_lte?: InputMaybe<Scalars['ID']>;
  owner_not?: InputMaybe<Scalars['ID']>;
  owner_not_in?: InputMaybe<Array<Scalars['ID']>>;
  status?: InputMaybe<Scalars['Int']>;
  status_gt?: InputMaybe<Scalars['Int']>;
  status_gte?: InputMaybe<Scalars['Int']>;
  status_in?: InputMaybe<Array<Scalars['Int']>>;
  status_lt?: InputMaybe<Scalars['Int']>;
  status_lte?: InputMaybe<Scalars['Int']>;
  status_not?: InputMaybe<Scalars['Int']>;
  status_not_in?: InputMaybe<Array<Scalars['Int']>>;
  tickets?: InputMaybe<Array<Scalars['String']>>;
  tickets_?: InputMaybe<Ticket_Filter>;
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

export enum Vault_OrderBy {
  EmissionsSigned = 'emissionsSigned',
  Id = 'id',
  Name = 'name',
  Nfts = 'nfts',
  Owner = 'owner',
  Status = 'status',
  Tickets = 'tickets',
  Timestamp = 'timestamp',
  TotalParticipants = 'totalParticipants'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
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

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type GetAggregatesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAggregatesQuery = { __typename?: 'Query', aggregate?: { __typename?: 'Aggregate', id: string, totalPools: number, TVL: string, totalParticipants: number } | null };

export type AllocationFragment = { __typename?: 'Allocation', id: string, epoch: string, collection: string, amount: string, timestamp: string };

export type AllocationsQueryVariables = Exact<{
  first: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type AllocationsQuery = { __typename?: 'Query', allocations: Array<{ __typename?: 'Allocation', id: string, epoch: string, collection: string, amount: string, timestamp: string }> };

export type BidFragment = { __typename?: 'Bid', id: string, bidder: string, timestamp: number, amount: string };

export type GetAuctionQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetAuctionQuery = { __typename?: 'Query', auction?: { __typename?: 'Auction', id: string, highestBid: string, highestBidder?: string | null, bids: Array<{ __typename?: 'Bid', id: string, bidder: string, timestamp: number, amount: string }> } | null };

export type GetAuctionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAuctionsQuery = { __typename?: 'Query', auctions: Array<{ __typename?: 'Auction', id: string, highestBid: string, highestBidder?: string | null, bids: Array<{ __typename?: 'Bid', id: string, bidder: string, timestamp: number, amount: string }> }> };

export type GetEpochAllocationAggregateQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetEpochAllocationAggregateQuery = { __typename?: 'Query', epochAllocationAggregate?: { __typename?: 'EpochAllocationAggregate', id: string, amount: string, epoch: string } | null };

export type GetEpochAllocationsQueryVariables = Exact<{
  where?: InputMaybe<EpochAllocation_Filter>;
}>;


export type GetEpochAllocationsQuery = { __typename?: 'Query', epochAllocations: Array<{ __typename?: 'EpochAllocation', id: string, amount: string, collection: string, epoch: string }> };

export type NftFragment = { __typename?: 'NFT', id: string, address: string, tokenId: string, vaults?: Array<{ __typename?: 'VaultNFT', vault: { __typename?: 'Vault', id: string, name: string } }> | null };

export type GetNftQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetNftQuery = { __typename?: 'Query', nft?: { __typename?: 'NFT', id: string, address: string, tokenId: string, vaults?: Array<{ __typename?: 'VaultNFT', vault: { __typename?: 'Vault', id: string, name: string } }> | null } | null };

export type NfTsQueryVariables = Exact<{
  first: Scalars['Int'];
  skip: Scalars['Int'];
  orderBy?: InputMaybe<Nft_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Nft_Filter>;
}>;


export type NfTsQuery = { __typename?: 'Query', nfts: Array<{ __typename?: 'NFT', id: string, address: string, tokenId: string, vaults?: Array<{ __typename?: 'VaultNFT', vault: { __typename?: 'Vault', id: string, name: string } }> | null }> };

export type VaultFragment = { __typename?: 'Vault', id: string, name: string, owner: string, status: number, timestamp: string, emissionsSigned: boolean, totalParticipants: number, nfts?: Array<{ __typename?: 'VaultNFT', nft: { __typename?: 'NFT', id: string, address: string, tokenId: string, vaults?: Array<{ __typename?: 'VaultNFT', vault: { __typename?: 'Vault', id: string, name: string } }> | null }, vault: { __typename?: 'Vault', id: string } }> | null, tickets: Array<{ __typename?: 'Ticket', id: string, ticketNumber: string, vaultAddress: string, tokenPurchasesLength: number, tokenPurchases: Array<{ __typename?: 'TokenPurchase', amount: string, id: string, startEpoch: number, finalEpoch: number, owner: string, soldAt?: string | null, timestamp: string }> }> };

export type GetPoolsQueryVariables = Exact<{
  first: Scalars['Int'];
  skip: Scalars['Int'];
  orderBy?: InputMaybe<Vault_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Vault_Filter>;
}>;


export type GetPoolsQuery = { __typename?: 'Query', vaults: Array<{ __typename?: 'Vault', id: string, name: string, owner: string, status: number, timestamp: string, emissionsSigned: boolean, totalParticipants: number, nfts?: Array<{ __typename?: 'VaultNFT', nft: { __typename?: 'NFT', id: string, address: string, tokenId: string, vaults?: Array<{ __typename?: 'VaultNFT', vault: { __typename?: 'Vault', id: string, name: string } }> | null }, vault: { __typename?: 'Vault', id: string } }> | null, tickets: Array<{ __typename?: 'Ticket', id: string, ticketNumber: string, vaultAddress: string, tokenPurchasesLength: number, tokenPurchases: Array<{ __typename?: 'TokenPurchase', amount: string, id: string, startEpoch: number, finalEpoch: number, owner: string, soldAt?: string | null, timestamp: string }> }> }> };

export type GetPoolQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPoolQuery = { __typename?: 'Query', vault?: { __typename?: 'Vault', id: string, name: string, owner: string, status: number, timestamp: string, emissionsSigned: boolean, totalParticipants: number, nfts?: Array<{ __typename?: 'VaultNFT', nft: { __typename?: 'NFT', id: string, address: string, tokenId: string, vaults?: Array<{ __typename?: 'VaultNFT', vault: { __typename?: 'Vault', id: string, name: string } }> | null }, vault: { __typename?: 'Vault', id: string } }> | null, tickets: Array<{ __typename?: 'Ticket', id: string, ticketNumber: string, vaultAddress: string, tokenPurchasesLength: number, tokenPurchases: Array<{ __typename?: 'TokenPurchase', amount: string, id: string, startEpoch: number, finalEpoch: number, owner: string, soldAt?: string | null, timestamp: string }> }> } | null };

export type TokenPurchaseFragment = { __typename?: 'TokenPurchase', amount: string, id: string, startEpoch: number, finalEpoch: number, owner: string, soldAt?: string | null, timestamp: string };

export type TicketFragment = { __typename?: 'Ticket', id: string, ticketNumber: string, vaultAddress: string, tokenPurchasesLength: number, tokenPurchases: Array<{ __typename?: 'TokenPurchase', amount: string, id: string, startEpoch: number, finalEpoch: number, owner: string, soldAt?: string | null, timestamp: string }> };

export type GetTicketsQueryVariables = Exact<{
  first: Scalars['Int'];
  skip: Scalars['Int'];
  where?: InputMaybe<Ticket_Filter>;
}>;


export type GetTicketsQuery = { __typename?: 'Query', tickets: Array<{ __typename?: 'Ticket', id: string, ticketNumber: string, vaultAddress: string, tokenPurchasesLength: number, tokenPurchases: Array<{ __typename?: 'TokenPurchase', amount: string, id: string, startEpoch: number, finalEpoch: number, owner: string, soldAt?: string | null, timestamp: string }> }> };

export type UserAllocationsQueryVariables = Exact<{
  id: Scalars['ID'];
  where?: InputMaybe<Allocation_Filter>;
}>;


export type UserAllocationsQuery = { __typename?: 'Query', user?: { __typename?: 'User', allocations: Array<{ __typename?: 'Allocation', id: string, epoch: string, collection: string, amount: string, timestamp: string }> } | null };

export type VaultNftFragment = { __typename?: 'VaultNFT', nft: { __typename?: 'NFT', id: string, address: string, tokenId: string, vaults?: Array<{ __typename?: 'VaultNFT', vault: { __typename?: 'Vault', id: string, name: string } }> | null }, vault: { __typename?: 'Vault', id: string } };

export const AllocationFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Allocation"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Allocation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"epoch"}},{"kind":"Field","name":{"kind":"Name","value":"collection"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]} as unknown as DocumentNode<AllocationFragment, unknown>;
export const BidFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Bid"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bid"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"bidder"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}}]} as unknown as DocumentNode<BidFragment, unknown>;
export const NftFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NFT"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NFT"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}},{"kind":"Field","name":{"kind":"Name","value":"vaults"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<NftFragment, unknown>;
export const VaultNftFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VaultNFT"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"VaultNFT"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nft"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NFT"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vault"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},...NftFragmentDoc.definitions]} as unknown as DocumentNode<VaultNftFragment, unknown>;
export const TokenPurchaseFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TokenPurchase"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TokenPurchase"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startEpoch"}},{"kind":"Field","name":{"kind":"Name","value":"finalEpoch"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"soldAt"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]} as unknown as DocumentNode<TokenPurchaseFragment, unknown>;
export const TicketFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Ticket"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Ticket"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ticketNumber"}},{"kind":"Field","name":{"kind":"Name","value":"vaultAddress"}},{"kind":"Field","name":{"kind":"Name","value":"tokenPurchasesLength"}},{"kind":"Field","name":{"kind":"Name","value":"tokenPurchases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TokenPurchase"}}]}}]}},...TokenPurchaseFragmentDoc.definitions]} as unknown as DocumentNode<TicketFragment, unknown>;
export const VaultFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Vault"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Vault"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"nfts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VaultNFT"}}]}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"emissionsSigned"}},{"kind":"Field","name":{"kind":"Name","value":"totalParticipants"}},{"kind":"Field","name":{"kind":"Name","value":"tickets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Ticket"}}]}}]}},...VaultNftFragmentDoc.definitions,...TicketFragmentDoc.definitions]} as unknown as DocumentNode<VaultFragment, unknown>;
export const GetAggregatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAggregates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"StringValue","value":"MEDICI_RULES","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalPools"}},{"kind":"Field","name":{"kind":"Name","value":"TVL"}},{"kind":"Field","name":{"kind":"Name","value":"totalParticipants"}}]}}]}}]} as unknown as DocumentNode<GetAggregatesQuery, GetAggregatesQueryVariables>;
export const AllocationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Allocations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allocations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Allocation"}}]}}]}},...AllocationFragmentDoc.definitions]} as unknown as DocumentNode<AllocationsQuery, AllocationsQueryVariables>;
export const GetAuctionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAuction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"highestBid"}},{"kind":"Field","name":{"kind":"Name","value":"highestBidder"}},{"kind":"Field","name":{"kind":"Name","value":"bids"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Bid"}}]}}]}}]}},...BidFragmentDoc.definitions]} as unknown as DocumentNode<GetAuctionQuery, GetAuctionQueryVariables>;
export const GetAuctionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAuctions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auctions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"highestBid"}},{"kind":"Field","name":{"kind":"Name","value":"highestBidder"}},{"kind":"Field","name":{"kind":"Name","value":"bids"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Bid"}}]}}]}}]}},...BidFragmentDoc.definitions]} as unknown as DocumentNode<GetAuctionsQuery, GetAuctionsQueryVariables>;
export const GetEpochAllocationAggregateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEpochAllocationAggregate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"epochAllocationAggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"epoch"}}]}}]}}]} as unknown as DocumentNode<GetEpochAllocationAggregateQuery, GetEpochAllocationAggregateQueryVariables>;
export const GetEpochAllocationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEpochAllocations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EpochAllocation_filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"epochAllocations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"collection"}},{"kind":"Field","name":{"kind":"Name","value":"epoch"}}]}}]}}]} as unknown as DocumentNode<GetEpochAllocationsQuery, GetEpochAllocationsQueryVariables>;
export const GetNftDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNFT"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nft"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NFT"}}]}}]}},...NftFragmentDoc.definitions]} as unknown as DocumentNode<GetNftQuery, GetNftQueryVariables>;
export const NfTsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NFTs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NFT_orderBy"}},"defaultValue":{"kind":"EnumValue","value":"address"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}},"defaultValue":{"kind":"EnumValue","value":"desc"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NFT_filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nfts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NFT"}}]}}]}},...NftFragmentDoc.definitions]} as unknown as DocumentNode<NfTsQuery, NfTsQueryVariables>;
export const GetPoolsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPools"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Vault_orderBy"}},"defaultValue":{"kind":"EnumValue","value":"timestamp"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderDirection"}},"defaultValue":{"kind":"EnumValue","value":"desc"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Vault_filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vaults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderDirection"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Vault"}}]}}]}},...VaultFragmentDoc.definitions]} as unknown as DocumentNode<GetPoolsQuery, GetPoolsQueryVariables>;
export const GetPoolDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPool"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vault"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Vault"}}]}}]}},...VaultFragmentDoc.definitions]} as unknown as DocumentNode<GetPoolQuery, GetPoolQueryVariables>;
export const GetTicketsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTickets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Ticket_filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tickets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"ticketNumber"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Ticket"}}]}}]}},...TicketFragmentDoc.definitions]} as unknown as DocumentNode<GetTicketsQuery, GetTicketsQueryVariables>;
export const UserAllocationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserAllocations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Allocation_filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allocations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Allocation"}}]}}]}}]}},...AllocationFragmentDoc.definitions]} as unknown as DocumentNode<UserAllocationsQuery, UserAllocationsQueryVariables>;