import { createReducer } from "@reduxjs/toolkit"
import { getPools, getMyPools } from "./actions"

export interface NFT {
  address: string
  tokenId: string
  img?: string
  collectionTitle?: string
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
  auctionLive: boolean
  auctionComplete: boolean
  nftRedeemed: boolean
  auctionEndTime: number
  highestBid: number
  highestBidder: string
  closePoolAddress: string
}

export enum PoolStatus {
  Normal,
  Closed,
  Auction,
}

export interface Pool extends NFT {
  vaultAddress?: string
  nftName: string
  owner: string
  ownerAddress: string
  nonce: number
  symbol?: string
  tokensLocked?: string
  tokenPrice?: string
  isManager?: boolean
  emissionsStarted?: boolean
  creditsAvailable?: string
  balance?: number
  state: PoolStatus
  hasPremiumPass?: boolean
  auction?: Auction
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
