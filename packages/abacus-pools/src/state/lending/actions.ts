import { createAction } from "@reduxjs/toolkit"
import { LendingNFT } from "./reducer"

export const setLendingNfts = createAction<LendingNFT[]>(
  "poolData/setLendingNfts"
)
export const setCurrentLendingNft = createAction<LendingNFT>(
  "poolData/setCurrentLendingNft"
)
export const setFetchingCurrentLendingNft = createAction<boolean>(
  "poolData/setFetchingCurrentLendingNft"
)
