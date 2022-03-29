import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ABC_TOKEN, NetworkSymbolEnum } from "@config/constants"
import axios from "axios"
import { getContract } from "@config/utils"
import ABC_TOKEN_ABI from "@config/contracts/ABC_TOKEN_ABI.json"
import { useActiveWeb3React } from "@hooks/index"
import { formatEther } from "ethers/lib/utils"
import { AppDispatch, AppState } from "../index"
import {
  toggleWalletModal,
  selectNetwork,
  setEthToUSD,
  setAbcBalance,
} from "./actions"
import {
  abcBalanceSelector,
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

export const useGetAbcBalance = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { account, library, chainId } = useActiveWeb3React()

  return useCallback(async () => {
    try {
      const tokenContract = getContract(
        ABC_TOKEN,
        ABC_TOKEN_ABI,
        library,
        account
      )
      const balance = await tokenContract.balanceOf(account)
      const parsedBalance = formatEther(balance)
      dispatch(setAbcBalance(Number(parsedBalance)))
    } catch {
      console.log(`Unable to get current ABC Balance for ${account}`)
    }
    // We want to update on chainId change as well
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, dispatch, library, chainId])
}

export const useAbcBalance = () =>
  useSelector<AppState, AppState["application"]["abcBalance"]>(
    abcBalanceSelector
  )
