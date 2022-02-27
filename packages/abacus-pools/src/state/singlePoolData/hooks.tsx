import { useCallback } from "react"
import { AppDispatch, AppState } from "@state/index"
import { useDispatch, useSelector } from "react-redux"
import { useActiveWeb3React, useMultiCall, useWeb3Contract } from "@hooks/index"
import FACTORY_ABI from "@config/contracts/ABC_FACTORY_ABI.json"
import VAULT_ABI from "@config/contracts/ABC_VAULT_ABI.json"
import { ABC_FACTORY, ZERO_ADDRESS } from "@config/constants"
import { OpenSeaAsset, openseaGet, shortenAddress } from "@config/utils"
import { formatEther } from "ethers/lib/utils"
import moment from "moment"
import { BigNumber } from "ethers"
import { Pool } from "../poolData/reducer"
import { getPoolData } from "./actions"

export const useSetPoolData = () => {
  const dispatch = useDispatch<AppDispatch>()
  const factory = useWeb3Contract(FACTORY_ABI)
  const multicall = useMultiCall(VAULT_ABI)
  const { account } = useActiveWeb3React()

  return useCallback(
    async (address: string, tokenId: string, nonce: number) => {
      try {
        const [vaultAddress, os] = await Promise.all([
          factory(ABC_FACTORY).methods.nftVault(nonce, address, tokenId).call(),
          openseaGet(
            `assets?token_ids=${tokenId}&asset_contract_address=${address}`
          ),
        ])

        const [owner, closePoolContract, pricePerToken, tokensLocked, symbol] =
          await multicall(
            vaultAddress,
            [
              "vaultOwner",
              "closePoolContract",
              "pricePerToken",
              "tokensLocked",
              "symbol",
            ],
            [[], [], [], [], [], []]
          )
        let hasPremiumPass = false
        let balance = BigNumber.from(0)
        let creditsAvailable = BigNumber.from(0)
        if (account) {
          const multi = await multicall(
            vaultAddress,
            ["premiumPass", "getCreditsAvailableForPurchase", "balanceOf"],
            [[account], [account, moment().unix()], [account]]
          )
          hasPremiumPass = multi[0][0]
          balance = multi[1][0]
          creditsAvailable = multi[2][0]
        }
        const asset = (os as { assets: OpenSeaAsset[] }).assets[0]
        const pool: Pool = {
          address,
          tokenId,
          nonce,
          collectionTitle: asset.collection.name,
          nftName: asset.name || "",
          owner: shortenAddress(owner[0]),
          ownerAddress: owner[0],
          symbol: symbol[0],
          tokensLocked: formatEther(tokensLocked[0]),
          tokenPrice: formatEther(pricePerToken[0]),
          isManager: String(owner[0]).toLowerCase() === account.toLowerCase(),
          balance: parseFloat(formatEther(balance)),
          // @TODO
          exitFeeStatic: "5",
          exitFeePercentage: "5",
          creditsAvailable: BigNumber.from(creditsAvailable).toString(),
          isClosed: closePoolContract[0] !== ZERO_ADDRESS,
          img: asset.image_url,
          hasPremiumPass,
        }
        dispatch(getPoolData(pool))
      } catch (e) {
        // console.error(e)
      }
    },
    [factory, multicall, account, dispatch]
  )
}

const getPoolDataSelector = (
  state: AppState
): AppState["singlePoolData"]["data"] => state.singlePoolData.data

export const useGetPoolData = () =>
  useSelector<AppState, AppState["singlePoolData"]["data"]>(getPoolDataSelector)
