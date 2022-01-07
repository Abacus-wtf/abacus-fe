import { createReducer } from "@reduxjs/toolkit"
import { getPools, getMyPools } from "./actions"

export interface Pool {
  address: string
  tokenId: string
  img: string
  animation_url: string | null
  collectionTitle: string
  nftName: string
  owner: string
  ownerAddress: string
  symbol?: string
  endTime?: string
  tokensLeft?: string
  tokensClaimed?: string
  tokenPrice?: string
  isManager?: boolean
  exitFee?: string
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
