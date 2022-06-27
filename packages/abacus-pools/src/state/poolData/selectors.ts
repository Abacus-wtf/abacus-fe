import { createSelector } from "@reduxjs/toolkit"
import { aggregateVaultTokenLockHistory } from "utils/vaultTickets"
import { AppState } from ".."

export const poolSelector = createSelector(
  (state: AppState) => state.poolData.pools,
  (state: AppState, vaultId: string) => vaultId,
  (pools: AppState["poolData"]["pools"], vaultId: string) => {
    // eslint-disable-next-line no-underscore-dangle
    const _pools = pools ?? []

    return _pools.find((pool) => pool.vaultAddress === vaultId)
  }
)

export const tokenLockHistorySelector = (currentEpoch: number) =>
  createSelector(poolSelector, (pool) =>
    aggregateVaultTokenLockHistory(currentEpoch)(pool?.tickets)
  )
