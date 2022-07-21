import { createReducer } from "@reduxjs/toolkit"
import { BigNumber } from "ethers"
import {
  setLendingNfts,
  setCurrentLendingNft,
  setFetchingCurrentLendingNft,
  setCurrentLendingNFTTotalAvailable,
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
  lendApproved: boolean
  repayApproved: boolean
  nEthBalance: BigNumber
  vaults: {
    id: string
    name: string
  }[]
  loan?: {
    borrower: string
    pool: string
    loanAmount: BigNumber
    totalAvailable?: BigNumber
  }
}

interface LendingState {
  nfts: LendingNFT[]
  currentNft: LendingNFT
  fetchingCurrentNft: boolean
}

const initialState: LendingState = {
  nfts: [],
  currentNft: {
    lendApproved: false,
    repayApproved: false,
    nEthBalance: BigNumber.from(0),
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
    .addCase(setCurrentLendingNFTTotalAvailable, (state, action) => {
      state.currentNft.loan.totalAvailable = action.payload
    })
)
