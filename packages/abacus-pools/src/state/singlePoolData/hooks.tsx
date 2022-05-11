import { useCallback } from "react"
import { AppDispatch, AppState } from "@state/index"
import { useDispatch, useSelector } from "react-redux"
import { useActiveWeb3React, useMultiCall, useWeb3Contract } from "@hooks/index"
import FACTORY_ABI from "@config/contracts/ABC_FACTORY_ABI.json"
import VAULT_ABI from "@config/contracts/ABC_VAULT_ABI.json"
import BRIBE_ABI from "@config/contracts/ABC_BRIBE_FACTORY_ABI.json"
import CLOSE_POOL_ABI from "@config/contracts/ABC_CLOSE_POOL_ABI.json"
import ERC_721_ABI from "@config/contracts/ERC_721_ABI.json"
import {
  ABC_BRIBE_FACTORY,
  ABC_FACTORY,
  GRAPHQL_ENDPOINT,
  IS_PRODUCTION,
  ZERO_ADDRESS,
} from "@config/constants"
import { OpenSeaAsset, openseaGet, shortenAddress } from "@config/utils"
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
import { aggregateVaultTokenLockHistory } from "utils/vaultTickets"
import { Auction, Pool, PoolStatus } from "../poolData/reducer"
import { getBribe, getPoolData, getTickets, getTraderProfile } from "./actions"
import { Bribe } from "./reducer"
import {
  GetTicketQueryResponse,
  GetTicketVariables,
  GET_TICKETS,
} from "./queries"

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

export const useEntryLevels = () => {
  const entryLevelsSelector = createSelector(
    getTicketsSelector,
    (tickets) =>
      tickets?.map((ticket) => ({
        ticketNumber: ticket.ticketNumber,
        amount: ticket.tokenPurchases.reduce(
          (acc, tokenPurchase) =>
            tokenPurchase.soldAt
              ? 0
              : acc + Number.parseFloat(formatEther(tokenPurchase.amount)),
          0
        ),
      })) ?? []
  )
  return useSelector(entryLevelsSelector)
}

type Activity = {
  id: string
  user: string
  action: "purchase" | "sale"
  timestamp: number
  amount: BigNumber
  length?: number
}

export const useActivity = () => {
  const initial: Activity[] = []
  const activitySelector = createSelector(getTicketsSelector, (tickets) =>
    tickets
      ?.reduce((acc, ticket) => {
        if (!ticket.tokenPurchasesLength) {
          return acc
        }
        const nextActivities: Activity[] = ticket.tokenPurchases.reduce(
          (tokenAcc, tokenPurchase) => {
            const timestamp = Number(tokenPurchase.timestamp) * 1000
            const purchase: Activity = {
              id: tokenPurchase.id,
              user: tokenPurchase.owner,
              action: "purchase",
              timestamp,
              amount: BigNumber.from(tokenPurchase.amount),
              length: Number(tokenPurchase.length) * 1000,
            }
            const sale: Activity = tokenPurchase.soldAt
              ? {
                  id: tokenPurchase.id,
                  user: tokenPurchase.owner,
                  action: "purchase",
                  timestamp,
                  amount: BigNumber.from(tokenPurchase.amount),
                }
              : null
            if (sale) {
              return [...tokenAcc, purchase, sale]
            }
            return [...tokenAcc, purchase]
          },
          initial
        )
        return [...acc, ...nextActivities]
      }, initial)
      .sort((a, b) => b.timestamp - a.timestamp)
  )
  return useSelector(activitySelector)
}

export const useSinglePoolTokenLockHistory = () => {
  const tokenLockHistorySelector = createSelector(
    getTicketsSelector,
    aggregateVaultTokenLockHistory
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

    const [offeredBribeSize, bribePerUserIndex] = await bribeMulti(
      ABC_BRIBE_FACTORY,
      ["offeredBribeSize", "bribePerUserIndex"],
      [
        [poolData.address, poolData.tokenId],
        [poolData.address, poolData.tokenId],
      ]
    )

    let bribe: Bribe = {
      offeredBribeSize: Number(formatEther(offeredBribeSize[0])),
      bribeOfferedByUser: 0,
    }
    if (account) {
      const accountBribe = await bribeContract(ABC_BRIBE_FACTORY)
        .methods.bribePerAccount(
          bribePerUserIndex[0],
          poolData.address,
          poolData.tokenId,
          account
        )
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
      console.log(totalTicketAmount)
      if (totalTicketAmount.eq(BigNumber.from(0))) {
        return
      }
      traderProfile.ticketsOwned[
        BigNumber.from(ticket.ticketNumber).toNumber()
      ] = formatEther(totalTicketAmount)
    })
    console.log("traderProfile", traderProfile)
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
    console.log("vault", vault)

    const ticketsReturned = _.map(_.range(0, 50), (i) => {
      const ticket = vault.tickets.find(
        (ticket) => Number(ticket.ticketNumber) === i
      )

      if (!ticket) {
        return {
          id: "",
          vaultAddress: poolData.vaultAddress ?? "",
          tokenPurchasesLength: 0,
          ticketNumber: String(i),
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
        const [closePoolContract, symbol, emissionsStarted] = await vault(
          vaultAddress,
          ["closePoolContract", "symbol", "emissionsStarted"],
          [[], [], []]
        )

        let creditsAvailable = BigNumber.from(0)
        let approved = false
        let approvedBribeFactory = false
        let tickets = []
        let ownerOfNFT = ""
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

        if (account) {
          const [multi, approval, approvalBribe, _ownerOfNFT] =
            await Promise.all([
              vault(
                vaultAddress,
                ["getAvailableCredits", "getUserPositionInfo"],
                [[account], [account]]
              ),
              erc721(address)
                .methods.isApprovedForAll(account, vaultAddress)
                .call(),
              erc721(address)
                .methods.isApprovedForAll(account, ABC_BRIBE_FACTORY)
                .call(),
              erc721(address).methods.ownerOf(tokenId).call(),
            ])
          ownerOfNFT = _ownerOfNFT
          tickets = _pool.tickets.filter((ticket) =>
            ticket.tokenPurchases.some(
              (token) => token.owner === account.toLowerCase()
            )
          )
          creditsAvailable = multi[0][0]
          userTokensLocked = formatEther(multi[1][0])
          approved = approval
          approvedBribeFactory = approvalBribe
        }

        let auction: Auction
        if (closePoolContract[0] !== ZERO_ADDRESS) {
          const [auctionComplete, auctionEndTime] = await closePool(
            closePoolContract[0],
            ["auctionComplete", "auctionEndTime"],
            [[], [], []]
          )
          auction = {
            auctionComplete: auctionComplete[0],
            auctionEndTime: BigNumber.from(auctionEndTime[0]).toNumber(),
            highestBid: Number(formatEther(_auction.highestBid)),
            highestBidder: _auction.highestBidder ?? "",
            closePoolAddress: closePoolContract[0],
            profit: 0,
            principalCalculated: false,
            hasTickets: _pool.tickets.length > 0,
            creditsAvailableForPurchase: "0",
            ownedTickets: _.map(tickets, (ticket) => ticket.ticketNumber),
            isNFTClaimed:
              ownerOfNFT !== "" &&
              ownerOfNFT.toLowerCase() !== vaultAddress.toLowerCase(),
            isAccountClaimed: false,
            claimPreviousBid: false,
            bids: _auction.bids.map((bid) => ({
              ...bid,
              timestamp: bid.timestamp * 1000,
              amount: Number(formatEther(bid.amount)),
            })),
          }
          if (account) {
            const [
              [
                principalCalculated,
                auctionPremium,
                isAccountClaimed,
                claimPreviousBid,
              ],
              [creditsAvailableForPurchase],
            ] = await Promise.all([
              closePool(
                closePoolContract[0],
                [
                  "principalCalculated",
                  "auctionPremium",
                  "claimed",
                  "claimedPreviousBid",
                ],
                [[account], [], [account], [account]]
              ),
              vault(vaultAddress, ["getAvailableCredits"], [[account]]),
            ])

            auction.isAccountClaimed = isAccountClaimed[0]
            auction.principalCalculated = principalCalculated[0]
            auction.profit =
              Number(formatEther(auctionPremium[0])) * Number(userTokensLocked)
            auction.creditsAvailableForPurchase = formatEther(
              creditsAvailableForPurchase[0]
            )

            auction.claimPreviousBid = claimPreviousBid[0]
          }
        }

        const asset = (os as { assets: OpenSeaAsset[] }).assets[0]
        console.log("asset", asset)
        const pool: Pool = {
          emissionsStarted: emissionsStarted[0],
          vaultAddress,
          address,
          tokenId,
          nonce,
          collectionTitle: asset.collection.name,
          collectionLink: asset?.collection?.name
            ? `https://${
                IS_PRODUCTION ? "" : "testnets."
              }opensea.io/collection/${asset.collection.name.toLowerCase()}`
            : "",
          nftName: asset.name || "",
          symbol: symbol[0],
          userTokensLocked,
          tokenPrice: IS_PRODUCTION ? ".001" : "0.001",
          isManager: ownerOf.toLowerCase() === account.toLowerCase(),
          creditsAvailable: BigNumber.from(creditsAvailable).toString(),
          state:
            closePoolContract[0] === ZERO_ADDRESS
              ? PoolStatus.Normal
              : auction && !auction.auctionComplete
              ? PoolStatus.Auction
              : PoolStatus.Closed,
          auction,
          img: asset.image_url,
          approved,
          approvedBribeFactory,
          owner:
            asset?.owner?.user && asset?.owner?.user?.username
              ? asset.owner.user.username
              : shortenAddress(asset?.owner?.address),
          ownerLink: asset?.owner?.address
            ? `https://${IS_PRODUCTION ? "" : "testnets."}opensea.io/${
                asset.owner.address
              }`
            : "",
          size: BigNumber.from(_pool.size),
          totalParticipants: _pool.totalParticipants,
        }
        dispatch(getPoolData(pool))
      } catch (e) {
        console.log("Look into this")
        console.error(e)
      }
    },
    [factory, vault, closePool, account, dispatch, erc721]
  )
}
