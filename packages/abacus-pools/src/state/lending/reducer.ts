import { createReducer } from "@reduxjs/toolkit"
import {
  setLendingNfts,
  setCurrentLendingNft,
  setFetchingCurrentLendingNft,
} from "./actions"

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
  vaults: {
    id: string
    name: string
  }[]
}

interface LendingState {
  nfts: LendingNFT[]
  currentNft: LendingNFT
  fetchingCurrentNft: boolean
}

const initialState: LendingState = {
  nfts: [],
  currentNft: {
    address: "",
    tokenId: "",
    img: "",
    alt: "",
    name: "",
    collectionTitle: "",
    collectionLink: "",
    owner: "",
    isManager: false,
    vaults: [],
  },
  fetchingCurrentNft: false,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setLendingNfts, (state, action) => {
      state.nfts = action.payload
    })
    .addCase(setCurrentLendingNft, (state, action) => {
      state.currentNft = action.payload
    })
    .addCase(setFetchingCurrentLendingNft, (state, action) => {
      state.fetchingCurrentNft = action.payload
    })
)
