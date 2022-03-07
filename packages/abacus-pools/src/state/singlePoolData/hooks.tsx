import { useCallback } from "react"
import { AppDispatch, AppState } from "@state/index"
import { useDispatch, useSelector } from "react-redux"
import { useActiveWeb3React, useMultiCall, useWeb3Contract } from "@hooks/index"
import FACTORY_ABI from "@config/contracts/ABC_FACTORY_ABI.json"
import VAULT_ABI from "@config/contracts/ABC_VAULT_ABI.json"
import CLOSE_POOL_ABI from "@config/contracts/ABC_CLOSE_POOL_ABI.json"
import { ABC_FACTORY, ZERO_ADDRESS } from "@config/constants"
import { OpenSeaAsset, openseaGet, shortenAddress } from "@config/utils"
import { formatEther } from "ethers/lib/utils"
import moment from "moment"
import { BigNumber } from "ethers"
import { Auction, Pool, PoolStatus } from "../poolData/reducer"
import { getPoolData, getTraderProfile } from "./actions"

const getPoolDataSelector = (
  state: AppState
): AppState["singlePoolData"]["data"] => state.singlePoolData.data

export const useGetPoolData = () =>
  useSelector<AppState, AppState["singlePoolData"]["data"]>(getPoolDataSelector)

const getTraderSelector = (
  state: AppState
): AppState["singlePoolData"]["traderProfile"] =>
  state.singlePoolData.traderProfile

export const useTraderProfile = () =>
  useSelector<AppState, AppState["singlePoolData"]["traderProfile"]>(
    getTraderSelector
  )

export const useGetTraderProfileData = () => {
  const dispatch = useDispatch<AppDispatch>()
  const vault = useWeb3Contract(VAULT_ABI)
  const { account } = useActiveWeb3React()
  const poolData = useGetPoolData()

  return useCallback(async () => {
    if (poolData.vaultAddress === undefined) return

    const traderProfile = await vault(poolData.vaultAddress)
      .methods.traderProfile(account)
      .call()
    console.log(traderProfile)
    dispatch(getTraderProfile(traderProfile))
  }, [account, dispatch, vault, poolData])
}

export const useSetPoolData = () => {
  const dispatch = useDispatch<AppDispatch>()
  const factory = useWeb3Contract(FACTORY_ABI)
  const vault = useMultiCall(VAULT_ABI)
  const closePool = useMultiCall(CLOSE_POOL_ABI)
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
          await vault(
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

        let balance = BigNumber.from(0)
        let creditsAvailable = BigNumber.from(0)
        if (account) {
          const multi = await vault(
            vaultAddress,
            ["getCreditsAvailableForPurchase", "balanceOf"],
            [[account, moment().unix()], [account]]
          )
          creditsAvailable = multi[0][0]
          balance = multi[1][0]
        }

        let auction: Auction
        if (closePoolContract[0] !== ZERO_ADDRESS) {
          const [
            auctionLive,
            auctionComplete,
            nftRedeemed,
            auctionEndTime,
            highestBid,
            highestBidder,
          ] = await closePool(
            closePoolContract[0],
            [
              "auctionLive",
              "auctionComplete",
              "nftRedeemed",
              "auctionEndTime",
              "highestBid",
              "highestBidder",
            ],
            [[], [], [], [], [], []]
          )

          auction = {
            auctionLive: auctionLive[0],
            auctionComplete: auctionComplete[0],
            nftRedeemed: nftRedeemed[0],
            auctionEndTime: BigNumber.from(auctionEndTime[0]).toNumber(),
            highestBid: Number(formatEther(highestBid[0])),
            highestBidder: highestBidder[0],
            closePoolAddress: closePoolContract[0],
          }
        }

        const asset = (os as { assets: OpenSeaAsset[] }).assets[0]
        const pool: Pool = {
          vaultAddress,
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
          creditsAvailable: BigNumber.from(creditsAvailable).toString(),
          state:
            closePoolContract[0] === ZERO_ADDRESS
              ? PoolStatus.Normal
              : auction && auction.auctionLive
              ? PoolStatus.Auction
              : PoolStatus.Closed,
          auction,
          // @TODO
          exitFeeStatic: "5",
          exitFeePercentage: "5",

          img: asset.image_url,
        }
        dispatch(getPoolData(pool))
      } catch (e) {
        console.log("Look into this")
      }
    },
    [factory, vault, closePool, account, dispatch]
  )
}
