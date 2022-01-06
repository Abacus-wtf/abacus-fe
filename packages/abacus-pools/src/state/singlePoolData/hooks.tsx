import { useCallback } from "react"
import { AppDispatch, AppState } from "@state/index"
import { useDispatch, useSelector } from "react-redux"
import { getPoolData } from "./actions"
import { Pool } from "../poolData/reducer"
import { PoolStateStatus } from "./reducer"

export const useSetPoolData = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async (address: string, tokenId: string) => {
      const pool: Pool = {
        address,
        tokenId,
        collectionTitle: "Test",
        nftName: "Dragon",
        owner: "Man",
        ownerAddress: "0x",
        animation_url: null,
        symbol: "DRAGO",
        endTime: "1641545735000",
        tokensLeft: "1000",
        tokensClaimed: "200",
        tokenPrice: "0.5",
        img: "https://lh3.googleusercontent.com/SWhiz5ufXCRGpsNgLn21G8losMUGf0YbVb6Su3mljhiJ5VGvjobrDH_poUX2kve-vne5rSkUUcTtvKIby_0m2TyeaLJWD-tbs_K-=w600",
      }
      const poolState: PoolStateStatus = PoolStateStatus.Auction
      dispatch(getPoolData({ data: pool, status: poolState }))
    },
    [dispatch]
  )
}

const getPoolDataSelector = (
  state: AppState
): AppState["singlePoolData"]["data"] => state.singlePoolData.data

export const useGetPoolData = () =>
  useSelector<AppState, AppState["singlePoolData"]["data"]>(getPoolDataSelector)

const getPoolStatusSelector = (
  state: AppState
): AppState["singlePoolData"]["status"] => state.singlePoolData.status

export const useGetPoolStatus = () =>
  useSelector<AppState, AppState["singlePoolData"]["status"]>(
    getPoolStatusSelector
  )
