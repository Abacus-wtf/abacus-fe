import { createReducer } from "@reduxjs/toolkit"
import { getPools, getMyPools } from "./actions"

export interface NFT {
  address: string
  tokenId: string
  img?: string
  collectionTitle?: string
  owner?: string
  ownerLink?: string
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
  creditsAvailableForPurchase: number
  isNFTClaimed: boolean
  isAccountClaimed: boolean
  claimPreviousBid: boolean
  ownedTickets: number[]
}

export enum PoolStatus {
  Normal,
  Closed,
  Auction,
}

export interface Pool extends NFT {
  vaultAddress?: string
  nftName: string
  nonce: number
  symbol?: string
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
}

export const INITIAL_POOL: Pool = {
  nftName: "",
  owner: "",
  ownerLink: "",
  address: "",
  nonce: -1,
  tokenId: "",
  state: PoolStatus.Normal,
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
