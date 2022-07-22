import { createAction } from "@reduxjs/toolkit"
import { BigNumber } from "ethers"
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

type LendingVaultInfo = {
  totalAvailable: BigNumber
  reservationStatus: boolean
  nextReservationStatus: boolean
}
export const setCurrentLendingNFTVaultInfo = createAction<LendingVaultInfo>(
  "poolData/setCurrentLendingNFTVaultInfo"
)
