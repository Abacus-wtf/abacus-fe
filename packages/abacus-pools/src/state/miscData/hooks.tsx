import { useSelector } from "react-redux"
import { AppState } from "../index"

export const useAuctionData = () =>
  useSelector<AppState, AppState["miscData"]["auctionData"]>(
    (state) => state.miscData.auctionData
  )

export const useClaimPayoutData = () =>
  useSelector<AppState, AppState["miscData"]["claimPayoutData"]>(
    (state) => state.miscData.claimPayoutData
  )
