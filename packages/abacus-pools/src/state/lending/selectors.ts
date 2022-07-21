import { createSelector } from "@reduxjs/toolkit"
import { formatEther } from "ethers/lib/utils"
import { AppState } from ".."

const calculateHealthRatio = (
  loan: AppState["lending"]["currentNft"]["loan"]
) => {
  const loanAmount = Number(formatEther(loan?.loanAmount ?? "0x0"))
  const totalAvailable = Number(formatEther(loan?.totalAvailable ?? "0x0"))

  if (loanAmount && totalAvailable && totalAvailable !== 0) {
    return (loanAmount / totalAvailable) * 100
  }
  return 0
}

export const lendingNftsSelector = (state: AppState) => state.lending.nfts
export const currentLendingNftSelector = (state: AppState) =>
  state.lending.currentNft
export const fetchingCurrentLendingNftSelector = (state: AppState) =>
  state.lending.fetchingCurrentNft
export const nftHealthRatioSelector = createSelector(
  (state: AppState) => state.lending.currentNft.loan,
  (loan) => calculateHealthRatio(loan)
)
