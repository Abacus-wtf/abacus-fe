import { AppState } from "@state/index"
import { createSelector } from "reselect"

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
    return Math.round((value + Number.EPSILON) * 100) / 100
  }
)
