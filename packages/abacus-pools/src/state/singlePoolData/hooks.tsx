import { useCallback } from "react"
import { AppDispatch, AppState } from "@state/index"
import { useDispatch, useSelector } from "react-redux"
import { useActiveWeb3React, useMultiCall, useWeb3Contract } from "@hooks/index"
import FACTORY_ABI from "@config/contracts/ABC_FACTORY_ABI.json"
import VAULT_ABI from "@config/contracts/ABC_VAULT_ABI.json"
import CLOSE_POOL_ABI from "@config/contracts/ABC_CLOSE_POOL_ABI.json"
import ERC_721_ABI from "@config/contracts/ERC_721_ABI.json"
import { ABC_FACTORY, ZERO_ADDRESS } from "@config/constants"
import { OpenSeaAsset, openseaGet, shortenAddress } from "@config/utils"
import { formatEther } from "ethers/lib/utils"
import moment from "moment"
import { BigNumber } from "ethers"
import _ from "lodash"
import { Auction, Pool, PoolStatus } from "../poolData/reducer"
import { getPoolData, getTickets, getTraderProfile } from "./actions"
import { Ticket } from "./reducer"

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

const getTicketsSelector = (
  state: AppState
): AppState["singlePoolData"]["tickets"] => state.singlePoolData.tickets

export const useTickets = () =>
  useSelector<AppState, AppState["singlePoolData"]["tickets"]>(
    getTicketsSelector
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

export const useGetTickets = () => {
  const dispatch = useDispatch<AppDispatch>()
  const vault = useMultiCall(VAULT_ABI)
  const poolData = useGetPoolData()

  return useCallback(async () => {
    if (poolData.vaultAddress === undefined) return

    const methods = _.map(_.range(0, 50), () => "ticketsPurchased")
    const args = _.map(_.range(0, 50), (i) => [i])
    const ticketFillings = await vault(poolData.vaultAddress, methods, args)
    const tickets: Ticket[] = []
    for (let i = 0; i < ticketFillings.length; i += 1) {
      tickets.push({
        order: i,
        amount: BigNumber.from(ticketFillings[i][0]).toNumber(),
      })
    }
    dispatch(getTickets(tickets))
  }, [dispatch, vault, poolData])
}

export const useSetPoolData = () => {
  const dispatch = useDispatch<AppDispatch>()
  const factory = useWeb3Contract(FACTORY_ABI)
  const erc721 = useWeb3Contract(ERC_721_ABI)
  const vault = useMultiCall(VAULT_ABI)
  const closePool = useMultiCall(CLOSE_POOL_ABI)
  const { account } = useActiveWeb3React()

  return useCallback(
    async (address: string, tokenId: string, nonce: number) => {
      try {
        const [vaultAddress, os, ownerOf] = await Promise.all([
          factory(ABC_FACTORY).methods.nftVault(nonce, address, tokenId).call(),
          openseaGet(
            `assets?token_ids=${tokenId}&asset_contract_address=${address}`
          ),
          erc721(address).methods.ownerOf(tokenId).call(),
        ])

        const [
          owner,
          closePoolContract,
          pricePerToken,
          tokensLocked,
          symbol,
          emissionsStarted,
        ] = await vault(
          vaultAddress,
          [
            "vaultOwner",
            "closePoolContract",
            "pricePerToken",
            "tokensLocked",
            "symbol",
            "emissionsStarted",
          ],
          [[], [], [], [], [], [], []]
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
          emissionsStarted: emissionsStarted[0],
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
          isManager:
            String(owner[0]).toLowerCase() === account.toLowerCase() ||
            ownerOf.toLowerCase() === account.toLowerCase(),
          balance: parseFloat(formatEther(balance)),
          creditsAvailable: BigNumber.from(creditsAvailable).toString(),
          state:
            closePoolContract[0] === ZERO_ADDRESS
              ? PoolStatus.Normal
              : auction && auction.auctionLive
              ? PoolStatus.Auction
              : PoolStatus.Closed,
          auction,
          img: asset.image_url,
        }
        dispatch(getPoolData(pool))
      } catch (e) {
        console.log("Look into this")
      }
    },
    [factory, vault, closePool, account, dispatch, erc721]
  )
}
