import { createSelector } from "@reduxjs/toolkit"
import { AppState } from "@state/index"
import { round2Decimals } from "@utils"

export const networkSymbolSelector = (state: AppState) =>
  state.application.networkSymbol

export const generalizedContractErrorMessageSelector = (state: AppState) =>
  state.application.generalizedContract.errorMessage

export const ethToUSDCalculationSelector = createSelector(
  (state: AppState) => state.application.ethToUSD,
  (state: AppState, eth: number) => eth,
  (ethToUSD, eth) => {
    const value = eth * ethToUSD
    return round2Decimals(value)
  }
)

export const abcBalanceSelector = (state: AppState) =>
  state.application.abcBalance

export const aggregateSelector = (state: AppState) =>
  state.application.aggregate

export const currentEpochSelector = (state: AppState) =>
  state.application.epoch.current

export const epochLengthSelector = (state: AppState) =>
  state.application.epoch.length

export const selectNetworkModalOpen = (state: AppState) =>
  state.application.isSelectNetworkModalOpen
