import { createReducer } from "@reduxjs/toolkit"
import { GetPoolsQuery, SellablePositionFragment } from "abacus-graph"
import { getPools, getMyPools } from "./actions"

export interface NFT {
  address: string
  tokenId: string
  img: string
  alt: string
  name: string
  collectionTitle?: string
  collectionLink?: string
  owner?: string
  ownerLink?: string
  isManager?: boolean
}

export interface NFTBasePool extends NFT {
  poolTokenName?: string
  poolTokenSymbol?: string
  exitFeePercentage?: number
  exitFeeStatic?: number
  ownershipSymbol?: string
  ownershipToken?: string
}

export interface Auction {
  auctionComplete: boolean
  auctionEndTime: number
  highestBid: number
  highestBidder: string
  closePoolAddress: string
  profit: number
  principalCalculated: boolean
  hasTickets: boolean
  creditsAvailableForPurchase: string
  isNFTClaimed: boolean
  isAccountClaimed: boolean
  claimPreviousBid: boolean
  ownedTickets: number[]
  bids: {
    id: string
    amount: number
    bidder: string
    timestamp: number
  }[]
}

export enum PoolStatus {
  Normal,
  Closed,
  Auction,
}

export interface Pool {
  vaultAddress?: string
  userTokensLocked?: string
  tokensLocked?: string
  tokenPrice?: string
  isManager?: boolean
  emissionsStarted?: boolean
  creditsAvailable?: string
  state: PoolStatus
  hasPremiumPass?: boolean
  auction?: Auction
  approved?: boolean
  approvedBribeFactory?: boolean
  totalParticipants: number
  tickets?: GetPoolsQuery["vaults"][number]["tickets"]
  nfts: NFT[]
  name: string
  epoch: number
  sellablePositions: SellablePositionFragment[]
}

export const INITIAL_POOL: Pool = {
  name: "",
  state: PoolStatus.Normal,
  totalParticipants: 0,
  nfts: [],
  sellablePositions: [],
  epoch: 0,
}

interface PoolState {
  pools?: Pool[]
  myPools?: Pool[]
}

const initialState: PoolState = {}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(getPools, (state, action) => {
      state.pools = action.payload
    })
    .addCase(getMyPools, (state, action) => {
      state.myPools = action.payload
    })
)
