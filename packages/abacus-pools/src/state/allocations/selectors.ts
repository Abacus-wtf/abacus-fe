import { AppState } from ".."

export const userAllocationsSelector = (state: AppState) =>
  state.allocations.userAllocations

export const allocationsSelector = (state: AppState) =>
  state.allocations.userAllocations
