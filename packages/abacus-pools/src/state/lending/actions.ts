import { createAction } from "@reduxjs/toolkit"
import { LendingNFT } from "./reducer"

export const setNfts = createAction<LendingNFT[]>("poolData/getPools")
