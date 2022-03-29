import { NetworkSymbolEnum } from "@config/constants"
import { createAction } from "@reduxjs/toolkit"

export const toggleWalletModal = createAction<boolean>(
  "application/toggleWalletModal"
)
export const selectNetwork = createAction<NetworkSymbolEnum>(
  "application/selectNetwork"
)
export const setGeneralizedContractErrorMessage = createAction<any>(
  "application/generalizedContract/errorMessage"
)
export const setEthToUSD = createAction<number>("application/ethToUSD")
export const setAbcBalance = createAction<number>("application/abcBalance")
