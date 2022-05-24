import { AppState } from ".."

export const userAllocationsSelector = (state: AppState) =>
  state.allocations.userAllocations
