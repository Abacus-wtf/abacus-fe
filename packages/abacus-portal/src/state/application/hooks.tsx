import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NetworkSymbolEnum } from "@config/constants"
import axios from "axios"
import { AppDispatch, AppState } from "../index"
import { toggleWalletModal, selectNetwork, setEthToUSD } from "./actions"
import {
  ethToUSDCalculationSelector,
  generalizedContractErrorMessageSelector,
  networkSymbolSelector,
} from "./selectors"

export const useToggleWalletModal = () => {
  const isWalletModalOpen = useSelector<
    AppState,
    AppState["application"]["isWalletModalOpen"]
  >((state) => state.application.isWalletModalOpen)
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(async () => {
    dispatch(toggleWalletModal(!isWalletModalOpen))
  }, [dispatch, isWalletModalOpen])
}

export const useSelectNetwork = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    async (networkChoice: NetworkSymbolEnum) => {
      dispatch(selectNetwork(networkChoice))
    },
    [dispatch]
  )
}

export const useGetCurrentNetwork = () =>
  useSelector<AppState, AppState["application"]["networkSymbol"]>(
    networkSymbolSelector
  )

export const useGeneralizedContractError = () =>
  useSelector<
    AppState,
    AppState["application"]["generalizedContract"]["errorMessage"]
  >(generalizedContractErrorMessageSelector)

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
type CoinGeckoResponse = {
  ethereum: {
    usd: number
  }
}

export const useEthToUSD = (eth: number) =>
  useSelector<AppState, AppState["application"]["ethToUSD"]>((state) =>
    ethToUSDCalculationSelector(state, eth)
  )

export const useGetEthToUSD = () => {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(async () => {
    try {
      const res = await axios.get<CoinGeckoResponse>(COINGECKO_URL)
      const ethToUSD = res?.data?.ethereum?.usd ?? null
      if (typeof ethToUSD === "number") {
        dispatch(setEthToUSD(ethToUSD))
      }
    } catch {
      console.log("Unable to fetch ETH to USD exchange rate")
    }
  }, [dispatch])
}
