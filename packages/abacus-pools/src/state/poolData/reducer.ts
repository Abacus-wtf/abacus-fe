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

export interface Pool extends NFT {
  nftName: string
  owner: string
  ownerAddress: string
  nonce: number
  symbol?: string
  tokensLocked?: string
  tokenPrice?: string
  isManager?: boolean
  exitFeeStatic?: string
  exitFeePercentage?: string
  creditsAvailable?: string
  balance?: number
  isClosed: boolean
  hasPremiumPass?: boolean
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
