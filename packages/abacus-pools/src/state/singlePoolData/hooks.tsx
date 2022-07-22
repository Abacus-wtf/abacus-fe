import { useCallback } from "react"
import { AppDispatch, AppState } from "@state/index"
import { useDispatch, useSelector } from "react-redux"
import { useActiveWeb3React, useMultiCall, useWeb3Contract } from "@hooks/index"
import VAULT_ABI from "@config/contracts/ABC_VAULT_ABI.json"
import BRIBE_ABI from "@config/contracts/ABC_BRIBE_FACTORY_ABI.json"
import CLOSE_POOL_ABI from "@config/contracts/ABC_CLOSE_POOL_ABI.json"
import ERC_721_ABI from "@config/contracts/ERC_721_ABI.json"
import {
  ABC_BRIBE_FACTORY,
  GRAPHQL_ENDPOINT,
  IS_PRODUCTION,
  OPENSEA_LINK,
  ZERO_ADDRESS,
} from "@config/constants"
import { shortenAddress } from "@config/utils"
import { formatEther } from "ethers/lib/utils"
import { BigNumber } from "ethers"
import _ from "lodash"
import { PAGINATE_BY } from "@state/poolData/constants"
import request from "graphql-request"
import { createSelector } from "@reduxjs/toolkit"
import {
  GetAuctionDocument,
  GetAuctionQuery,
  GetAuctionQueryVariables,
  GetPoolDocument,
  GetPoolQuery,
  GetPoolQueryVariables,
} from "abacus-graph"
import { aggregateVaultTokenLockHistory, getPoolSize } from "utils/vaultTickets"
import { matchOpenSeaAssetToNFT, openseaGetMany } from "abacus-utils"

import { ActivitySectionProps } from "@components/ActivitySection"
import { Auction, Pool, PoolStatus } from "../poolData/reducer"
import {
  getBribe,
  getPoolData,
  getReserve,
  getTickets,
  getTraderProfile,
} from "./actions"
import { Bribe } from "./reducer"
import {
  GetTicketQueryResponse,
  GetTicketVariables,
  GET_TICKETS,
} from "./queries"
import { sellablePositionsSelector } from "./selectors"

const getPoolDataSelector = (
  state: AppState
): AppState["singlePoolData"]["data"] => state.singlePoolData.data

export const useGetPoolData = () =>
  useSelector<AppState, AppState["singlePoolData"]["data"]>(getPoolDataSelector)

const getBribeSelector = (
  state: AppState
): AppState["singlePoolData"]["bribe"] => state.singlePoolData.bribe

export const useBribeData = () =>
  useSelector<AppState, AppState["singlePoolData"]["bribe"]>(getBribeSelector)

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

const getPoolEpochSelector = (state: AppState) =>
  state.singlePoolData.data.epoch

export const useSellablePositions = () => useSelector(sellablePositionsSelector)

export const useEntryLevels = () => {
  const entryLevelsSelector = createSelector(
    getTicketsSelector,
    getPoolEpochSelector,
    (tickets, currentEpoch) =>
      tickets?.map((ticket) => ({
        ticketNumber: ticket.ticketNumber,
        amount: ticket.tokenPurchases.reduce(
          (acc, tokenPurchase) =>
            currentEpoch >= tokenPurchase.finalEpoch
              ? acc
              : acc + Number(tokenPurchase.amount),
          0
        ),
      })) ?? []
  )
  return useSelector(entryLevelsSelector)
}

export const useCurrentPoolSize = () => {
  const poolSizeSelector = createSelector(
    getPoolEpochSelector,
    getTicketsSelector,
    (currentEpoch, tickets) => getPoolSize(currentEpoch, tickets)
  )

  return useSelector(poolSizeSelector)
}

type Activity = ActivitySectionProps["activities"][number]

export const useCurrentPoolActivity = () => {
  const initial: Activity[] = []
  const activitySelector = createSelector(
    sellablePositionsSelector,
    (sellablePositions) =>
      sellablePositions
        ?.reduce((acc, sellablePosition) => {
          const timestamp = Number(sellablePosition.timestamp) * 1000
          const length =
            sellablePosition.finalEpoch - sellablePosition.startEpoch
          const purchase: Activity = {
            id: sellablePosition.id,
            user: sellablePosition.owner,
            description: `Purchased ${Number(
              sellablePosition.amount
            )} tokens for ${length} epoch${length > 1 ? "s" : ""}`,
            timestamp,
          }
          const sale: Activity = sellablePosition.soldAt
            ? {
                id: `${sellablePosition.id}_sale`,
                user: sellablePosition.owner,
                description: `Sold positon of ${Number(
                  sellablePosition.amount
                )} tokens`,
                timestamp,
              }
            : null
          if (sale) {
            return [...acc, purchase, sale]
          }
          return [...acc, purchase]
        }, initial)
        .sort((a, b) => b.timestamp - a.timestamp)
  )
  return useSelector(activitySelector)
}

export const useSinglePoolTokenLockHistory = () => {
  const tokenLockHistorySelector = createSelector(
    getTicketsSelector,
    getPoolEpochSelector,
    (tickets, currentEpoch) =>
      aggregateVaultTokenLockHistory(currentEpoch, tickets)
  )

  return useSelector(tokenLockHistorySelector)
}

export const useGetBribeData = () => {
  const dispatch = useDispatch<AppDispatch>()
  const bribeContract = useWeb3Contract(BRIBE_ABI)
  const bribeMulti = useMultiCall(BRIBE_ABI)
  const { account } = useActiveWeb3React()
  const poolData = useGetPoolData()

  return useCallback(async () => {
    if (poolData.vaultAddress === undefined) return

    const [offeredBribeSize] = await bribeMulti(
      ABC_BRIBE_FACTORY,
      ["offeredBribeSize"],
      [[poolData.vaultAddress]]
    )
    let bribe: Bribe = {
      offeredBribeSize: Number(formatEther(offeredBribeSize[0])),
      bribeOfferedByUser: 0,
    }
    if (account) {
      const accountBribe = await bribeContract(ABC_BRIBE_FACTORY)
        .methods.bribePerAccount(account, poolData.vaultAddress)
        .call()
      bribe.bribeOfferedByUser = Number(formatEther(accountBribe))
    }
    dispatch(getBribe(bribe))
  }, [account, dispatch, bribeContract, bribeMulti, poolData])
}

export const useGetTraderProfileData = () => {
  const dispatch = useDispatch<AppDispatch>()
  const vault = useWeb3Contract(VAULT_ABI)
  const { account } = useActiveWeb3React()
  const poolData = useGetPoolData()

  return useCallback(async () => {
    if (poolData.vaultAddress === undefined) return

    const variables: GetTicketVariables = {
      first: PAGINATE_BY,
      skip: 0 * PAGINATE_BY,
      where: {
        vaultAddress: poolData.vaultAddress.toLowerCase(),
      },
    }

    let [traderProfile, { tickets }] = await Promise.all([
      vault(poolData.vaultAddress).methods.traderProfile(account).call(),
      request<GetTicketQueryResponse>(GRAPHQL_ENDPOINT, GET_TICKETS, variables),
    ])
    traderProfile.tokensLocked = formatEther(traderProfile.tokensLocked)
    traderProfile.ticketsOwned = []
    _.forEach(tickets, (ticket) => {
      const totalTicketAmount = ticket.tokenPurchases.reduce(
        (acc, tokenPurchase) =>
          tokenPurchase.owner.toLowerCase() === account.toLowerCase() &&
          tokenPurchase.soldAt === null
            ? acc.add(tokenPurchase.amount)
            : acc,
        BigNumber.from("0")
      )

      if (totalTicketAmount.eq(BigNumber.from(0))) {
        return
      }
      traderProfile.ticketsOwned[
        BigNumber.from(ticket.ticketNumber).toNumber()
      ] = formatEther(totalTicketAmount)
    })

    dispatch(getTraderProfile(traderProfile))
  }, [poolData, account, vault, dispatch])
}

export const useGetTickets = () => {
  const dispatch = useDispatch<AppDispatch>()
  const poolData = useGetPoolData()

  return useCallback(async () => {
    if (poolData.vaultAddress === undefined) return
    const variables: GetPoolQueryVariables = {
      id: poolData.vaultAddress.toLowerCase(),
    }

    const { vault } = await request<GetPoolQuery>(
      GRAPHQL_ENDPOINT,
      GetPoolDocument,
      variables
    )

    const ticketsReturned = _.map(_.range(0, 50), (i) => {
      const ticket = vault.tickets.find((ticket) => ticket.ticketNumber === i)

      if (!ticket) {
        return {
          id: "",
          vaultAddress: poolData.vaultAddress ?? "",
          tokenPurchasesLength: 0,
          ticketNumber: i,
          tokenPurchases: [],
        }
      }

      return {
        ...ticket,
      }
    })
    dispatch(getTickets(ticketsReturned))
  }, [dispatch, poolData])
}

export const useSetPoolData = () => {
  const dispatch = useDispatch<AppDispatch>()
  const erc721 = useWeb3Contract(ERC_721_ABI)
  const vault = useMultiCall(VAULT_ABI)
  const closePool = useMultiCall(CLOSE_POOL_ABI)
  const { account } = useActiveWeb3React()

  return useCallback(
    async (vaultAddress: string) => {
      try {
        const now = Math.floor(new Date().getTime() / 1000)
        const [[closePoolContract], [currentEpoch]] = await vault(
          vaultAddress,
          ["closePoolContract", "getEpoch"],
          [[], [now]]
        )

        let creditsAvailable = BigNumber.from(0)
        let approved = false
        let approvedBribeFactory = false
        let tickets = []
        let userTokensLocked = ""
        const variables: GetPoolQueryVariables | GetAuctionQueryVariables = {
          id: vaultAddress?.toLowerCase() ?? "",
        }

        const { vault: _pool } = await request<GetPoolQuery>(
          GRAPHQL_ENDPOINT,
          GetPoolDocument,
          variables
        )

        const { auction: _auction } = await request<GetAuctionQuery>(
          GRAPHQL_ENDPOINT,
          GetAuctionDocument,
          variables
        )

        const { assets } = await openseaGetMany(
          _pool.nfts.map(({ nft }) => ({ ...nft, nftAddress: nft.address })),
          { url: OPENSEA_LINK }
        )

        // TODO: Do this in multi-call
        const owners = await Promise.all(
          _pool.nfts.map(async ({ nft }) => {
            const ownerOf: string = await erc721(nft.address)
              .methods.ownerOf(nft.tokenId)
              .call()
            return ownerOf ?? ""
          })
        )

        const nfts = _pool.nfts.map(({ nft }, index) => {
          const asset = matchOpenSeaAssetToNFT(assets, {
            nftAddress: nft.address,
            tokenId: nft.tokenId,
          })
          const owner = owners[index]

          return {
            ...nft,
            img: asset.image_preview_url || asset.image_url,
            alt: asset.name,
            isNftClaimed:
              owner !== "" &&
              owner.toLowerCase() !== vaultAddress.toLowerCase(),
            owner:
              asset?.owner?.user && asset?.owner?.user?.username
                ? asset.owner.user.username
                : shortenAddress(asset?.owner?.address),
            ownerAddress: asset?.owner?.address,
            ownerLink: asset?.owner?.address
              ? `https://${IS_PRODUCTION ? "" : "testnets."}opensea.io/${
                  asset.owner.address
                }`
              : "",
            collectionTitle: asset.collection.name,
            collectionLink: asset?.collection?.name
              ? `https://${
                  IS_PRODUCTION ? "" : "testnets."
                }opensea.io/collection/${asset.collection.name.toLowerCase()}`
              : "",
            name: asset.name || "",
            isManager: owner.toLowerCase() === account?.toLowerCase(),
          }
        })

        // TODO: Owners will need to check isApprovedForAll for every address they own - do in multicall
        if (account) {
          const [multi] = await Promise.all([
            vault(vaultAddress, ["totAvailFunds"], [[account]]),
            // TODO: Determine why these are failing
            // erc721(nfts[0].address)
            //   .methods.isApprovedForAll(account, vaultAddress)
            //   .call(),
            // erc721(nfts[0].address)
            //   .methods.isApprovedForAll(account, ABC_BRIBE_FACTORY)
            //   .call(),
          ])
          tickets = _pool.tickets.filter((ticket) =>
            ticket.tokenPurchases.some(
              (token) => token.owner === account.toLowerCase()
            )
          )
          creditsAvailable = multi[0][0]
          approved = false // approval
          approvedBribeFactory = false // approvalBribe
        }

        let auction: Auction
        if (closePoolContract !== ZERO_ADDRESS) {
          const [auctionComplete, auctionEndTime] = await closePool(
            closePoolContract,
            ["auctionComplete", "auctionEndTime"],
            [[], []]
          )
          auction = {
            auctionComplete: auctionComplete[0],
            auctionEndTime: BigNumber.from(auctionEndTime[0]).toNumber(),
            highestBid: Number(formatEther(_auction.highestBid)),
            highestBidder: _auction.highestBidder ?? "",
            closePoolAddress: closePoolContract,
            profit: 0,
            principalCalculated: false,
            hasTickets: _pool.tickets.length > 0,
            creditsAvailableForPurchase: "0",
            ownedTickets: _.map(tickets, (ticket) => ticket.ticketNumber),
            isAccountClaimed: false,
            claimPreviousBid: false,
            bids: _auction.bids.map((bid) => ({
              ...bid,
              timestamp: bid.timestamp * 1000,
              amount: Number(formatEther(bid.amount)),
            })),
            isNFTClaimed: nfts.some((nft) => nft.isNftClaimed), // TODO: Validate this assumption
          }
          if (account) {
            const [
              [
                principalCalculated,
                auctionPremium,
                isAccountClaimed,
                claimPreviousBid,
              ],
            ] = await Promise.all([
              closePool(
                closePoolContract,
                [
                  "principalCalculated",
                  "auctionPremium",
                  "claimed",
                  "claimedPreviousBid",
                ],
                [[account], [], [account], [account]]
              ),
            ])

            auction.isAccountClaimed = isAccountClaimed[0]
            auction.principalCalculated = principalCalculated[0]
            auction.profit =
              Number(formatEther(auctionPremium[0])) * Number(userTokensLocked)

            auction.claimPreviousBid = claimPreviousBid[0]
          }
        }

        const [[emissionStartedCount]] = await vault(
          vaultAddress,
          ["emissionStartedCount"],
          [[currentEpoch]]
        )

        const pool: Pool = {
          name: _pool.name,
          emissionsStarted: BigNumber.from(emissionStartedCount).gte(
            BigNumber.from(0)
          ),
          vaultAddress,
          userTokensLocked,
          tokenPrice: IS_PRODUCTION ? ".001" : "0.001",
          creditsAvailable: BigNumber.from(creditsAvailable).toString(),
          state:
            closePoolContract === ZERO_ADDRESS
              ? PoolStatus.Normal
              : auction && !auction.auctionComplete
              ? PoolStatus.Auction
              : PoolStatus.Closed,
          auction,
          approved,
          approvedBribeFactory,
          nfts,
          isManager: nfts.some((nft) => nft.isManager),
          totalParticipants: _pool.totalParticipants,
          epoch: BigNumber.from(currentEpoch).toNumber(),
          sellablePositions: _pool.sellablePositions,
        }
        dispatch(getPoolData(pool))
      } catch (e) {
        console.log("Unable to fetch pool data")
        console.error(e)
      }
    },
    [account, closePool, dispatch, erc721, vault]
  )
}

export const usePoolCurrentEpoch = () =>
  useSelector<AppState, AppState["singlePoolData"]["data"]["epoch"]>(
    getPoolEpochSelector
  )

export const useSetReserve = () => {
  const dispatch = useDispatch<AppDispatch>()
  const vaultMulti = useMultiCall(VAULT_ABI)
  const currentEpoch = usePoolCurrentEpoch()

  return useCallback(
    async (
      vaultAddress: string,
      address: string,
      tokenId: number,
      endEpoch: number
    ) => {
      const [[amountOfReservations], [costToReserve], [reservationsAvailable]] =
        await vaultMulti(
          vaultAddress,
          [
            "getAmountOfReservations",
            "getCostToReserve",
            "reservationsAvailable",
          ],
          [[currentEpoch], [endEpoch], []]
        )

      const total = BigNumber.from(reservationsAvailable).toNumber()
      const totalAvailable =
        BigNumber.from(reservationsAvailable).toNumber() -
        BigNumber.from(amountOfReservations).toNumber()

      dispatch(
        getReserve({
          total,
          totalAvailable,
          costToReserve: BigNumber.from(costToReserve),
        })
      )
    },
    [currentEpoch, dispatch, vaultMulti]
  )
}

const getPoolReserveSelector = (state: AppState) => state.singlePoolData.reserve

export const usePoolReserve = () =>
  useSelector<AppState, AppState["singlePoolData"]["reserve"]>(
    getPoolReserveSelector
  )
