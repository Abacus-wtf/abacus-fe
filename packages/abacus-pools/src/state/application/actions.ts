import { NetworkSymbolEnum } from "@config/constants"
import { createAction } from "@reduxjs/toolkit"
import { Aggregate } from "abacus-graph"
import { GeneralizedContractState } from "./reducer"

export const toggleWalletModal = createAction<boolean>(
  "application/toggleWalletModal"
)
export const setSelectNetworkModalOpen = createAction<boolean>(
  "application/setSelectNetworkModalOpen"
)
export const selectNetwork = createAction<NetworkSymbolEnum>(
  "application/selectNetwork"
)
export const setGeneralizedContractErrorMessage = createAction<
  GeneralizedContractState["errorMessage"]
>("application/generalizedContract/errorMessage")
export const setEthToUSD = createAction<number>("application/ethToUSD")
export const setAbcBalance = createAction<number>("application/abcBalance")
export const setAggregate = createAction<Aggregate>("application/aggregate")
export const setEpoch =
  createAction<{ current: number; length: number }>("application/epoch")
