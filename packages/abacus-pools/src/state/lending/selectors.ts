import { AppState } from ".."

export const lendingNftsSelector = (state: AppState) => state.lending.nfts
export const currentLendingNftSelector = (state: AppState) =>
  state.lending.currentNft
export const fetchingCurrentLendingNftSelector = (state: AppState) =>
  state.lending.fetchingCurrentNft
