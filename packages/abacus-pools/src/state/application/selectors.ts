import { createSelector } from "@reduxjs/toolkit"
import { AppState } from "@state/index"
import { round2Decimals } from "@utils"

export const networkSymbolSelector = (
  state: AppState
): AppState["application"]["networkSymbol"] => state.application.networkSymbol

export const generalizedContractErrorMessageSelector = (
  state: AppState
): AppState["application"]["generalizedContract"]["errorMessage"] =>
  state.application.generalizedContract.errorMessage

export const ethToUSDCalculationSelector = createSelector(
  (state: AppState) => state.application.ethToUSD,
  (state: AppState, eth: number) => eth,
  (ethToUSD, eth) => {
    const value = eth * ethToUSD
    return round2Decimals(value)
  }
)

export const abcBalanceSelector = (
  state: AppState
): AppState["application"]["abcBalance"] => state.application.abcBalance
