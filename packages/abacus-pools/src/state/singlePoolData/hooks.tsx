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
import { OpenSeaAsset, openseaGet } from "@config/utils"
import { formatEther } from "ethers/lib/utils"
import moment from "moment"
import { BigNumber } from "ethers"
import _ from "lodash"
import { PAGINATE_BY } from "@state/poolData/constants"
import request from "graphql-request"
import { Auction, Pool, PoolStatus } from "../poolData/reducer"
import { getBribe, getPoolData, getTickets, getTraderProfile } from "./actions"
import { Bribe, Ticket } from "./reducer"
import {
  GetTicketQueryResponse,
  GetVaultVariables,
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

    const variables: GetVaultVariables = {
      first: PAGINATE_BY,
      skip: 0 * PAGINATE_BY,
    }

    let [traderProfile, { tickets }] = await Promise.all([
      vault(poolData.vaultAddress).methods.traderProfile(account).call(),
      request<GetTicketQueryResponse>(
        GRAPHQL_ENDPOINT,
        GET_TICKETS(
          `{ owner: "${account.toLowerCase()}", vaultAddress: "${poolData.vaultAddress.toLowerCase()}" }`
        ),
        variables
      ),
    ])
    traderProfile.tokensLocked = formatEther(traderProfile.tokensLocked)
    traderProfile.ticketsOwned = []
    _.forEach(tickets, (ticket) => {
      traderProfile.ticketsOwned[
        BigNumber.from(ticket.ticketNumber).toNumber()
      ] = formatEther(ticket.amount)
    })
    console.log(traderProfile)
    dispatch(getTraderProfile(traderProfile))
  }, [account, dispatch, vault, poolData])
}

export const useGetTickets = () => {
  const dispatch = useDispatch<AppDispatch>()
  const vault = useMultiCall(VAULT_ABI)
  const poolData = useGetPoolData()
  const { account } = useActiveWeb3React()

  return useCallback(async () => {
    if (poolData.vaultAddress === undefined) return
    const variables: GetVaultVariables = {
      first: PAGINATE_BY,
      skip: 0 * PAGINATE_BY,
    }

    const methods = _.map(_.range(0, 50), () => "ticketsPurchased")
    const args = _.map(_.range(0, 50), (i) => [i])
    const ticketFillings = await vault(poolData.vaultAddress, methods, args)
    const { tickets } = await request<GetTicketQueryResponse>(
      GRAPHQL_ENDPOINT,
      GET_TICKETS(`{ owner: "${account.toLowerCase()}" }`),
      variables
    )
    const ticketsReturned: Ticket[] = []
    for (let i = 0; i < ticketFillings.length; i += 1) {
      const hasOwnerBought = !_.find(
        tickets,
        (ticket) =>
          Number(ticket.ticketNumber) === i &&
          ticket.vaultAddress.toLowerCase() ===
            poolData.vaultAddress.toLowerCase()
      )
      ticketsReturned.push({
        order: i,
        amount: Number(formatEther(ticketFillings[i][0])),
        ownToken: hasOwnerBought,
      })
    }
    dispatch(getTickets(ticketsReturned))
  }, [dispatch, vault, poolData, account])
}

export const useSetPoolData = () => {
  const dispatch = useDispatch<AppDispatch>()
  const factory = useWeb3Contract(FACTORY_ABI)
  const erc721 = useWeb3Contract(ERC_721_ABI)
  const vaultIndividual = useWeb3Contract(VAULT_ABI)
  const vault = useMultiCall(VAULT_ABI)
  const closePool = useMultiCall(CLOSE_POOL_ABI)
  const { account } = useActiveWeb3React()

  return useCallback(
    async (address: string, tokenId: string, nonce: number) => {
      const variables: GetVaultVariables = {
        first: PAGINATE_BY,
        skip: 0 * PAGINATE_BY,
      }
      try {
        const [vaultAddress, os, ownerOf] = await Promise.all([
          factory(ABC_FACTORY).methods.nftVault(nonce, address, tokenId).call(),
          openseaGet(
            `assets?token_ids=${tokenId}&asset_contract_address=${address}`
          ),
          erc721(address).methods.ownerOf(tokenId).call(),
        ])
        console.log("here")
        const [closePoolContract, tokensLocked, symbol, emissionsStarted] =
          await vault(
            vaultAddress,
            ["closePoolContract", "tokensLocked", "symbol", "emissionsStarted"],
            [[], [], [], [], [], []]
          )
        console.log(vaultAddress)

        let creditsAvailable = BigNumber.from(0)
        let approved = false
        let approvedBribeFactory = false
        let tickets = []
        let ownerOfNFT = ""
        if (account) {
          const [
            finalCreditCount,
            getTokensLocked,
            traderProfile,
            approval,
            approvalBribe,
            _ownerOfNFT,
            { tickets: _tickets },
          ] = await Promise.all([
            vaultIndividual(vaultAddress)
              .methods.getFinalCreditCount(account)
              .call(),
            vaultIndividual(vaultAddress)
              .methods.getTokensLocked(account)
              .call(),
            vaultIndividual(vaultAddress).methods.traderProfile(account).call(),
            erc721(address)
              .methods.isApprovedForAll(account, vaultAddress)
              .call(),
            erc721(address)
              .methods.isApprovedForAll(account, ABC_BRIBE_FACTORY)
              .call(),
            erc721(address).methods.ownerOf(tokenId).call(),
            request<GetTicketQueryResponse>(
              GRAPHQL_ENDPOINT,
              GET_TICKETS(`{ owner: "${account.toLowerCase()}" }`),
              variables
            ),
          ])
          ownerOfNFT = _ownerOfNFT
          tickets = _tickets
          const tokensLockedBigNumb = BigNumber.from(getTokensLocked)
            .mul(BigNumber.from("1000000000000000"))
            .div(BigNumber.from("1000000000000000000"))
          creditsAvailable = tokensLockedBigNumb.add(
            BigNumber.from(finalCreditCount).sub(
              tokensLockedBigNumb.mul(
                BigNumber.from(moment().unix())
                  .sub(BigNumber.from(traderProfile.startTime))
                  .div(BigNumber.from(43200))
                  .div(
                    BigNumber.from(traderProfile.timeUnlock).sub(
                      BigNumber.from(traderProfile.startTime)
                    )
                  )
                  .div(BigNumber.from(43200))
              )
            )
          )
          approved = approval
          approvedBribeFactory = approvalBribe
        }
        let auction: Auction
        if (closePoolContract[0] !== ZERO_ADDRESS) {
          console.log("here")
          const [auctionComplete, auctionEndTime, highestBid, highestBidder] =
            await closePool(
              closePoolContract[0],
              [
                "auctionComplete",
                "auctionEndTime",
                "highestBid",
                "highestBidder",
              ],
              [[], [], [], []]
            )
          auction = {
            auctionComplete: auctionComplete[0],
            auctionEndTime: BigNumber.from(auctionEndTime[0]).toNumber(),
            highestBid: Number(formatEther(highestBid[0])),
            highestBidder: highestBidder[0],
            closePoolAddress: closePoolContract[0],
            profit: 0,
            principalCalculated: false,
            hasTickets: tickets.length > 0,
            creditsAvailableForPurchase: "0",
            ownedTickets: _.map(tickets, (ticket) => ticket.ticketNumber),
            isNFTClaimed:
              ownerOfNFT !== "" &&
              ownerOfNFT.toLowerCase() !== vaultAddress.toLowerCase(),
            isAccountClaimed: false,
            claimPreviousBid: false,
          }

          if (account) {
            const [
              [
                principalCalculated,
                auctionPremium,
                isAccountClaimed,
                claimPreviousBid,
              ],
              [getTokensLocked, tokensLocked],
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
              vault(
                vaultAddress,
                ["getTokensLocked", "tokensLocked"],
                [[account], []]
              ),
            ])

            auction.isAccountClaimed = isAccountClaimed[0]
            auction.principalCalculated = principalCalculated[0]
            auction.profit =
              (Number(formatEther(auctionPremium[0])) *
                Number(formatEther(getTokensLocked[0]))) /
              Number(formatEther(tokensLocked[0]))
            auction.claimPreviousBid = claimPreviousBid[0]
            auction.creditsAvailableForPurchase = creditsAvailable.toString()
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
          symbol: symbol[0],
          tokensLocked: formatEther(tokensLocked[0]),
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
