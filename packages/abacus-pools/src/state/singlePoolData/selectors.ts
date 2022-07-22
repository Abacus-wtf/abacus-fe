import { AppState } from ".."

export const sellablePositionsSelector = (state: AppState) =>
  state.singlePoolData.data.sellablePositions
