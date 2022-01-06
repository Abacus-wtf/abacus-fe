import { useCallback } from "react"
import { AppDispatch, AppState } from "@state/index"
import { useDispatch, useSelector } from "react-redux"
import { getPools } from "./actions"
import { Pool } from "./reducer"

export const useSetPools = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(async () => {
    const pools: Pool[] = [
      {
        address: "0xcc14dd8e6673fee203366115d3f9240b079a4930",
        tokenId: "120",
        collectionTitle: "Test",
        nftName: "Dragon",
        owner: "Man",
        ownerAddress: "0x",
        animation_url: null,
        img: "https://lh3.googleusercontent.com/SWhiz5ufXCRGpsNgLn21G8losMUGf0YbVb6Su3mljhiJ5VGvjobrDH_poUX2kve-vne5rSkUUcTtvKIby_0m2TyeaLJWD-tbs_K-=w600",
      },
      {
        address: "0xcc14dd8e6673fee203366115d3f9240b079a4930",
        tokenId: "120",
        collectionTitle: "Test",
        nftName: "Dragon",
        owner: "Man",
        ownerAddress: "0x",
        animation_url: null,
        img: "https://lh3.googleusercontent.com/SWhiz5ufXCRGpsNgLn21G8losMUGf0YbVb6Su3mljhiJ5VGvjobrDH_poUX2kve-vne5rSkUUcTtvKIby_0m2TyeaLJWD-tbs_K-=w600",
      },
      {
        address: "0xcc14dd8e6673fee203366115d3f9240b079a4930",
        tokenId: "120",
        collectionTitle: "Test",
        nftName: "Dragon",
        owner: "Man",
        ownerAddress: "0x",
        animation_url: null,
        img: "https://lh3.googleusercontent.com/SWhiz5ufXCRGpsNgLn21G8losMUGf0YbVb6Su3mljhiJ5VGvjobrDH_poUX2kve-vne5rSkUUcTtvKIby_0m2TyeaLJWD-tbs_K-=w600",
      },
      {
        address: "0xcc14dd8e6673fee203366115d3f9240b079a4930",
        tokenId: "120",
        collectionTitle: "Test",
        nftName: "Dragon",
        owner: "Man",
        ownerAddress: "0x",
        animation_url: null,
        img: "https://lh3.googleusercontent.com/SWhiz5ufXCRGpsNgLn21G8losMUGf0YbVb6Su3mljhiJ5VGvjobrDH_poUX2kve-vne5rSkUUcTtvKIby_0m2TyeaLJWD-tbs_K-=w600",
      },
    ]
    dispatch(getPools(pools))
  }, [dispatch])
}

const getPoolsSelector = (state: AppState): AppState["poolData"]["pools"] =>
  state.poolData.pools

export const useGetPools = () =>
  useSelector<AppState, AppState["poolData"]["pools"]>(getPoolsSelector)
