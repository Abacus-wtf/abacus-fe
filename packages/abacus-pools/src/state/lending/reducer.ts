import { createReducer } from "@reduxjs/toolkit"
import { setNfts } from "./actions"

export interface LendingNFT {
  address: string
  tokenId: string
  img: string
  alt: string
  name: string
  collectionTitle: string
  collectionLink: string
  owner: string
  isManager: boolean
}

interface LendingState {
  nfts: LendingNFT[]
}

const initialState: LendingState = {
  nfts: [],
}

export default createReducer(initialState, (builder) =>
  builder.addCase(setNfts, (state, action) => {
    state.nfts = action.payload
  })
)
