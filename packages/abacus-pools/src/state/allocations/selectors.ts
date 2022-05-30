import { AppState } from ".."

export const userAllocationsSelector = (state: AppState) =>
  state.allocations.userAllocations

export const epochAllocationsSelector = (state: AppState) =>
  state.allocations.epochAllocations
