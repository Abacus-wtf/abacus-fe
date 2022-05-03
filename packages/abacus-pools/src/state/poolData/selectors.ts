import { createSelector } from "@reduxjs/toolkit"
import { aggregateVaultTokenLockHistory } from "utils/vaultTickets"
import { AppState } from ".."

export const poolSelector = createSelector(
  (state: AppState) => state.poolData.pools,
  (state: AppState, vaultId: string) => vaultId,
  (pools: AppState["poolData"]["pools"], vaultId: string) =>
    pools?.find((pool) => pool.vaultAddress === vaultId) ?? []
)

export const tokenLockHistorySelector = createSelector(poolSelector, (pool) =>
  aggregateVaultTokenLockHistory(pool.tickets)
)
