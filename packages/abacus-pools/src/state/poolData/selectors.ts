import { createSelector } from "@reduxjs/toolkit"
import { currentEpochSelector } from "@state/application/selectors"
import { aggregateVaultTokenLockHistory, getPoolSize } from "utils/vaultTickets"
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

export const tokenLockHistorySelector = createSelector(
  currentEpochSelector,
  poolSelector,
  (currentEpoch, pool) =>
    aggregateVaultTokenLockHistory(currentEpoch, pool?.tickets)
)

export const poolSizeSelector = createSelector(
  currentEpochSelector,
  poolSelector,
  (currentEpoch, pool) => getPoolSize(currentEpoch, pool?.tickets)
)
