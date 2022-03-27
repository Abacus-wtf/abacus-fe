import { useCallback, useRef } from "react"
import { AppState, AppDispatch } from "@state/index"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { request } from "graphql-request"
import {
  useWeb3Contract,
  useActiveWeb3React,
  useWeb3EthContract,
  useMultiCall,
} from "@hooks/index"
import {
  ABC_PRICING_SESSION_ADDRESS,
  ETH_USD_ORACLE_ADDRESS,
  NetworkSymbolEnum,
} from "@config/constants"
import ABC_PRICING_SESSION_ABI from "@config/contracts/ABC_PRICING_SESSION_ABI.json"
import ETH_USD_ORACLE_ABI from "@config/contracts/ETH_USD_ORACLE_ABI.json"
import _ from "lodash"
import {
  formatPricingSessionCheckMulticall,
  formatPricingSessionCoreMulticall,
  openseaGet,
  openseaGetMany,
  openseaGetRelated,
  OpenSeaGetResponse,
  shortenAddress,
} from "@config/utils"
import { formatEther } from "ethers/lib/utils"
import { PromiseStatus } from "@models/PromiseStatus"
import { useGetCurrentNetwork } from "@state/application/hooks"
import { BigNumber } from "@ethersproject/bignumber"
import {
  SessionData,
  UserState,
  SessionState,
  CurrentSessionData,
} from "./reducer"
import {
  setMultipleSessionData,
  setMultipleSessionFetchStatus,
  setUserStatus,
  setCurrentSessionFetchStatus,
  setMySessionsFetchStatus,
  setActiveSessionsFetchStatus,
  setActiveSessionsData,
  setMySessionsData,
  setMultipleSessionPage,
  setMultipleSessionIsLastPage,
  setMySessionsPage,
  setMySessionsIsLastPage,
  setActiveSessionsPage,
  setActiveSessionsIsLastPage,
  setFeaturedSessionFetchStatus,
  setFeaturedSessionData,
  setCurrentSessionStatus,
  setCurrentSessionData,
} from "./actions"
import {
  GET_PRICING_SESSIONS,
  GetPricingSessionsQueryResponse,
  GetPricingSessionQueryResponse,
  SubgraphPricingSession,
  GET_PRICING_SESSION,
  GetActiveSessionsQueryResponse,
  GET_ACTIVE_SESSIONS,
  GetMySessionsQueryResponse,
  GET_MY_SESSIONS,
  GetPricingSessionsVariables,
  GetMySessionsVariables,
  GetActiveSessionsVariables,
  GET_FEATURED_SESSIONS,
} from "./queries"
import { PAGINATE_BY } from "./constants"
import {
  currentSessionDataSelector,
  currentSessionStatusSelector,
  currentSessionUserStatusSelector,
  multiSessionStateSelector,
  currentSessionFetchStatusSelector,
  mySessionsStateSelector,
  activeSessionsStateSelector,
  featuredSessionStateSelector,
} from "./selectors"

const GRAPHQL_ENDPOINT = (networkSymbol: NetworkSymbolEnum): string => {
  switch (networkSymbol) {
    case NetworkSymbolEnum.ETH:
      return process.env.GATSBY_APP_SUBGRAPH_ENDPOINT_ETH
    case NetworkSymbolEnum.ARBITRUM:
      return process.env.GATSBY_APP_SUBGRAPH_ENDPOINT_ARBITRUM
    case NetworkSymbolEnum.NONE:
      return process.env.GATSBY_APP_SUBGRAPH_ENDPOINT_ARBITRUM
    default:
      return ""
  }
}

const modifyTimeAndSession = (getStatus: string, pricingSessionData: any) => {
  let sessionStatus = Number(getStatus)
  let endTime = Number(pricingSessionData.endTime) * 1000
  const currentTime = Date.now()
  if (sessionStatus === 1) {
    endTime += Number(pricingSessionData.votingTime) * 1000
    if (currentTime >= endTime) {
      sessionStatus = 2
    }
  } else if (sessionStatus === 0 && currentTime > endTime) {
    sessionStatus = 1
    endTime += Number(pricingSessionData.votingTime) * 1000
  }
  return { endTime, sessionStatus }
}

export const useCurrentSessionStatus = () =>
  useSelector<
    AppState,
    AppState["sessionData"]["currentSessionData"]["sessionStatus"]
  >(currentSessionStatusSelector)

export const useCurrentSessionData = () =>
  useSelector<
    AppState,
    AppState["sessionData"]["currentSessionData"]["sessionData"]
  >(currentSessionDataSelector)

export const useMultiSessionState = () =>
  useSelector<AppState, AppState["sessionData"]["multiSessionState"]>(
    multiSessionStateSelector
  )
export const useFeaturedSessionState = () =>
  useSelector<AppState, AppState["sessionData"]["featuredSessionState"]>(
    featuredSessionStateSelector
  )

export const useCurrentSessionFetchStatus = () =>
  useSelector<
    AppState,
    AppState["sessionData"]["currentSessionData"]["fetchStatus"]
  >(currentSessionFetchStatusSelector)

export const useMultiSessionData = () =>
  useSelector<
    AppState,
    AppState["sessionData"]["multiSessionState"]["multiSessionData"]
  >((state) => state.sessionData.multiSessionState.multiSessionData)

export const useMySessionsState = () =>
  useSelector<AppState, AppState["sessionData"]["mySessionsState"]>(
    mySessionsStateSelector
  )

export const useActiveSessionsState = () =>
  useSelector<AppState, AppState["sessionData"]["activeSessionsState"]>(
    activeSessionsStateSelector
  )

export const useCurrentSessionUserStatus = () =>
  useSelector<
    AppState,
    AppState["sessionData"]["currentSessionData"]["userStatus"]
  >(currentSessionUserStatusSelector)

export const useCanUserInteract = () => {
  const sessionStatus = useCurrentSessionStatus()
  const userStatus = useSelector<
    AppState,
    AppState["sessionData"]["currentSessionData"]["userStatus"]
  >((state) => state.sessionData.currentSessionData.userStatus)

  switch (sessionStatus) {
    case SessionState.Vote:
      return (
        userStatus === UserState.NotVoted ||
        userStatus === UserState.CompletedVote
      )
    case SessionState.Weigh:
      return userStatus === UserState.CompletedVote
    case SessionState.SetFinalAppraisal:
      return true
    case SessionState.Harvest:
      return userStatus === UserState.CompletedWeigh
    case SessionState.Claim:
      return userStatus === UserState.CompletedWeigh
    case SessionState.Complete:
      return userStatus === UserState.CompletedWeigh
    default:
      return false
  }
}

const findAsset = (
  assets: OpenSeaGetResponse["assets"],
  session: SubgraphPricingSession
) => {
  const ret = assets.find(
    (asset) =>
      String(asset.asset_contract.address) === String(session.nftAddress) &&
      String(asset.token_id) === String(session.tokenId)
  )
  return ret
}

const parseSubgraphPricingSessions = async (
  pricingSessions: SubgraphPricingSession[]
) => {
  const { assets } = await openseaGetMany(pricingSessions)
  const sessionData: SessionData[] = _.map(
    pricingSessions,
    (session): SessionData => {
      const asset = findAsset(assets, session)
      return {
        image_url: (asset?.image_preview_url || asset?.image_url) ?? "",
        animation_url: null,
        endTime: Number(session.endTime) * 1000,
        votingTime: Number(session.votingTime),
        numPpl: Number(session.numParticipants),
        collectionTitle: asset?.asset_contract.name ?? "",
        totalStaked: Number(formatEther(session.totalStaked)),
        bounty: Number(formatEther(session.bounty)),
        nftName: asset?.name ?? "",
        finalAppraisalValue:
          session.sessionStatus >= 3
            ? Number(formatEther(session.finalAppraisalValue))
            : undefined,
        address: session.nftAddress,
        tokenId: session.tokenId,
        nonce: Number(session.nonce),
        ownerAddress: asset?.owner?.address ?? "",
        owner:
          asset?.owner?.user && asset?.owner?.user?.username
            ? asset?.owner?.user?.username
            : shortenAddress(asset?.owner?.address),
        maxAppraisal: Number(formatEther(session?.maxAppraisal)),
        currentStatus: session.sessionStatus,
        traits: asset.traits,
        creator: asset.creator,
        rankings: session.participants.map((participant) => ({
          ...participant,
          user: participant.user.id,
        })),
      }
    }
  )
  return sessionData
}

export const useGetFeaturedSessionData = () => {
  const dispatch = useDispatch<AppDispatch>()
  const networkSymbol = useGetCurrentNetwork()

  return useCallback(async () => {
    if (!networkSymbol) {
      return
    }
    dispatch(setFeaturedSessionFetchStatus(PromiseStatus.Pending))
    const variables: GetPricingSessionsVariables = {
      first: 7,
      skip: 0,
    }
    try {
      const { pricingSessions } =
        await request<GetPricingSessionsQueryResponse>(
          GRAPHQL_ENDPOINT(networkSymbol),
          GET_FEATURED_SESSIONS,
          variables
        )
      const sessionData = await parseSubgraphPricingSessions(pricingSessions)
      dispatch(setFeaturedSessionData(sessionData))
      dispatch(setFeaturedSessionFetchStatus(PromiseStatus.Resolved))
    } catch {
      dispatch(setFeaturedSessionFetchStatus(PromiseStatus.Rejected))
    }
  }, [dispatch, networkSymbol])
}

export const useGetMultiSessionData = () => {
  const dispatch = useDispatch<AppDispatch>()
  const whereRef = useRef("")
  const orderRef = useRef("")
  const { page, multiSessionData } = useMultiSessionState()
  const networkSymbol = useGetCurrentNetwork()

  return useCallback(
    async (where: string | null, orderBy?: string, orderDirection?: string) => {
      if (!networkSymbol) {
        return
      }
      let currentPage = page
      let currentData = multiSessionData
      const currentOrder = `${orderBy}${orderDirection}`
      const shouldReset =
        where !== whereRef.current || currentOrder !== orderRef.current
      if (shouldReset) {
        currentPage = 0
        currentData = []
        dispatch(setMultipleSessionData([]))
      }
      orderRef.current = currentOrder
      whereRef.current = where
      dispatch(setMultipleSessionFetchStatus(PromiseStatus.Pending))
      const variables: GetPricingSessionsVariables = {
        first: PAGINATE_BY,
        skip: currentPage * PAGINATE_BY,
        orderBy: orderBy || "sessionStatus",
        orderDirection: orderDirection || "asc",
      }
      try {
        const query = GET_PRICING_SESSIONS(where)
        const { pricingSessions } =
          await request<GetPricingSessionsQueryResponse>(
            GRAPHQL_ENDPOINT(networkSymbol),
            query,
            variables
          )
        const sessionData = await parseSubgraphPricingSessions(pricingSessions)
        const isLastPage = sessionData.length < PAGINATE_BY
        dispatch(setMultipleSessionData([...currentData, ...sessionData]))
        dispatch(setMultipleSessionPage(currentPage + 1))
        dispatch(setMultipleSessionIsLastPage(isLastPage))
        dispatch(setMultipleSessionFetchStatus(PromiseStatus.Resolved))
      } catch {
        dispatch(setMultipleSessionFetchStatus(PromiseStatus.Rejected))
      }
    },
    [dispatch, page, multiSessionData, networkSymbol]
  )
}

export const useGetMySessionsData = () => {
  const dispatch = useDispatch<AppDispatch>()
  const whereRef = useRef(null)
  const { account } = useActiveWeb3React()
  const { page, data } = useMySessionsState()
  const networkSymbol = useGetCurrentNetwork()

  return useCallback(
    async (where: string | null) => {
      if (!account || !networkSymbol) {
        return
      }
      dispatch(setMySessionsFetchStatus(PromiseStatus.Pending))
      let currentPage = page
      let currentData = data
      if (where !== whereRef.current) {
        currentPage = 0
        currentData = []
        dispatch(setMySessionsData(currentData))
      }
      whereRef.current = where
      const variables: GetMySessionsVariables = {
        userId: account.toLowerCase(),
        first: PAGINATE_BY,
        skip: currentPage * PAGINATE_BY,
      }

      try {
        const { user } = await request<GetMySessionsQueryResponse>(
          GRAPHQL_ENDPOINT(networkSymbol),
          GET_MY_SESSIONS(where),
          variables
        )
        if (user) {
          const { creatorOf: pricingSessions } = user
          const sessionData = await parseSubgraphPricingSessions(
            pricingSessions
          )
          const isLastPage = sessionData.length < PAGINATE_BY
          dispatch(setMySessionsData([...currentData, ...sessionData]))
          dispatch(setMySessionsPage(currentPage + 1))
          dispatch(setMySessionsIsLastPage(isLastPage))
        } else {
          dispatch(setMySessionsData([]))
          dispatch(setMySessionsPage(0))
          dispatch(setMySessionsIsLastPage(true))
        }
        dispatch(setMySessionsFetchStatus(PromiseStatus.Resolved))
      } catch {
        dispatch(setMySessionsFetchStatus(PromiseStatus.Rejected))
      }
    },
    [dispatch, account, page, data, networkSymbol]
  )
}

export const useGetActiveSessionsData = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { account } = useActiveWeb3React()
  const whereRef = useRef(null)
  const { page, data } = useActiveSessionsState()
  const networkSymbol = useGetCurrentNetwork()

  return useCallback(
    async (where: string | null) => {
      if (!account || !networkSymbol) {
        return
      }
      dispatch(setActiveSessionsFetchStatus(PromiseStatus.Pending))
      let currentPage = page
      let currentData = data
      if (where !== whereRef.current) {
        currentPage = 0
        currentData = []
        dispatch(setActiveSessionsData(currentData))
      }
      whereRef.current = where
      const variables: GetActiveSessionsVariables = {
        userId: account.toLowerCase(),
        first: PAGINATE_BY,
        skip: currentPage * PAGINATE_BY,
      }

      try {
        const { user } = await request<GetActiveSessionsQueryResponse>(
          GRAPHQL_ENDPOINT(networkSymbol),
          GET_ACTIVE_SESSIONS(where),
          variables
        )
        if (user) {
          const { pricingSessionsVotedIn } = user
          const sessionData = await parseSubgraphPricingSessions(
            pricingSessionsVotedIn
          )
          const isLastPage = sessionData.length < PAGINATE_BY
          dispatch(setActiveSessionsData([...currentData, ...sessionData]))
          dispatch(setActiveSessionsPage(currentPage + 1))
          dispatch(setActiveSessionsIsLastPage(isLastPage))
        } else {
          dispatch(setActiveSessionsData([]))
          dispatch(setActiveSessionsPage(0))
          dispatch(setActiveSessionsIsLastPage(true))
        }
        dispatch(setActiveSessionsFetchStatus(PromiseStatus.Resolved))
      } catch {
        dispatch(setActiveSessionsFetchStatus(PromiseStatus.Rejected))
      }
    },
    [dispatch, account, page, data, networkSymbol]
  )
}

type GetUserStatusParams = {
  account: string
  getPricingSessionContract: ReturnType<typeof useWeb3Contract>
  address: string
  tokenId: string
  networkSymbol: NetworkSymbolEnum
}
const getUserStatus = async ({
  account,
  getPricingSessionContract,
  address,
  tokenId,
  networkSymbol,
}: GetUserStatusParams) => {
  let getVoterCheck = -1
  const pricingSession = getPricingSessionContract(
    ABC_PRICING_SESSION_ADDRESS(networkSymbol)
  )
  if (account) {
    getVoterCheck = await pricingSession.methods
      .getVoterCheck(address, tokenId, account)
      .call()
  }
  return Number(getVoterCheck)
}

export const useGetCurrentSessionData = () => {
  const dispatch = useDispatch<AppDispatch>()
  const getEthUsdContract = useWeb3EthContract(ETH_USD_ORACLE_ABI)
  const networkSymbol = useGetCurrentNetwork()
  const multicall = useMultiCall(ABC_PRICING_SESSION_ABI)

  return useCallback(
    async (address: string, tokenId: string, nonce: number) => {
      dispatch(setCurrentSessionFetchStatus(PromiseStatus.Pending))
      const ethUsdOracle = getEthUsdContract(ETH_USD_ORACLE_ADDRESS)
      const URL = `asset/${address}/${tokenId}`

      const [
        pricingSessionMetadata,
        [
          pricingSessionCoreToFormat,
          getStatusToFormat,
          pricingSessionCheckToFormat,
          finalAppraisalResultToFormat,
        ],
        grtData,
        relatedAssets,
      ] = await Promise.all([
        openseaGet(URL),
        multicall(
          ABC_PRICING_SESSION_ADDRESS(networkSymbol),
          [
            "NftSessionCore",
            "getStatus",
            "NftSessionCheck",
            "finalAppraisalValue",
          ],
          [
            [nonce, address, tokenId],
            [address, tokenId],
            [nonce, address, tokenId],
            [nonce, address, tokenId],
          ]
        ),
        axios.post<GetPricingSessionQueryResponse>(
          GRAPHQL_ENDPOINT(networkSymbol),
          {
            query: GET_PRICING_SESSION(`${address}/${tokenId}/${nonce}`),
          },
          {
            headers: {
              "content-type": "application/json",
            },
          }
        ),
        openseaGetRelated("assets/", { asset_contract_address: address }),
      ])
      const pricingSessionCore = formatPricingSessionCoreMulticall(
        pricingSessionCoreToFormat
      )
      const pricingSessionCheck = formatPricingSessionCheckMulticall(
        pricingSessionCheckToFormat
      )
      const getStatus = `${parseInt(getStatusToFormat[0].hex, 16)}`
      const finalAppraisalResult = `${parseInt(
        finalAppraisalResultToFormat[0].hex,
        16
      )}`
      const { pricingSession: pricingSessionGrt } = grtData?.data.data ?? {}
      let ethUsd
      try {
        ethUsd = await ethUsdOracle.methods.latestRoundData().call()
        ethUsd = Number(ethUsd.answer) / 100000000
      } catch (e) {
        ethUsd = 4500
      }

      const { endTime, sessionStatus } = modifyTimeAndSession(
        getStatus,
        pricingSessionCore
      )

      const finalAppraisalValue =
        sessionStatus >= 3
          ? Number(formatEther(finalAppraisalResult))
          : undefined

      let rankings = _.map(
        pricingSessionGrt !== null ? pricingSessionGrt.participants : [],
        (vote) => ({
          ...vote,
          user: vote.user.id,
          appraisal: formatEther(vote.appraisal),
          amountStaked: formatEther(vote.amountStaked),
        })
      )

      if (finalAppraisalValue !== undefined) {
        rankings = rankings.sort((a, b) => {
          const aVal = Number(a.appraisal)
          const bVal = Number(b.appraisal)
          if (aVal === 0) return 10000000
          if (bVal === 0) return -10000000
          return (
            Math.abs(finalAppraisalValue - aVal) -
            Math.abs(finalAppraisalValue - bVal)
          )
        })
      } else if (rankings !== undefined) {
        rankings = rankings.sort((a, b) => {
          const aVal = Number(a.appraisal)
          const bVal = Number(b.appraisal)
          if (aVal === 0) return 10000000
          if (bVal === 0) return -10000000
          return 0
        })
      }
      const sessionData: CurrentSessionData = {
        winnerAmount:
          Number(pricingSessionCheck.secondaryPoints) !== 0
            ? 0.05
            : Number(pricingSessionCheck.finalStdev),
        rankings,
        bounty: Number(pricingSessionCore.bounty),
        image_url:
          pricingSessionMetadata?.image_url ||
          pricingSessionMetadata?.image_preview_url,
        animation_url: pricingSessionMetadata?.animation_url || null,
        endTime: Number(endTime),
        votingTime: Number(pricingSessionCore.votingTime),
        numPpl:
          sessionStatus >= 2
            ? Number(pricingSessionGrt.numParticipants)
            : Number(pricingSessionCore.uniqueVoters),
        collectionTitle: pricingSessionMetadata?.collection?.name,
        totalStaked:
          sessionStatus >= 2
            ? Number(formatEther(pricingSessionGrt.totalStaked))
            : Number(pricingSessionCore.totalSessionStake),
        totalStakedInUSD:
          sessionStatus >= 2
            ? Number(formatEther(pricingSessionGrt.totalStaked)) *
              Number(ethUsd)
            : Number(pricingSessionCore.totalSessionStake) * Number(ethUsd),
        bountyInUSD: Number(pricingSessionCore.bounty) * Number(ethUsd),
        nftName: pricingSessionMetadata?.name,
        address,
        tokenId,
        nonce: Number(nonce),
        finalAppraisalValue: Number(finalAppraisalValue),
        owner:
          pricingSessionMetadata?.owner?.user &&
          pricingSessionMetadata?.owner?.user?.username
            ? pricingSessionMetadata?.owner?.user?.username
            : shortenAddress(pricingSessionMetadata?.owner?.address),
        ownerAddress: pricingSessionMetadata?.owner?.address,
        maxAppraisal: Number(pricingSessionCore.maxAppraisal),
        votes: pricingSessionGrt.participants.map(
          ({ user, weight, appraisal, amountStaked }) => ({
            user: user.id,
            weight,
            appraisal: formatEther(appraisal),
            amountStaked: formatEther(amountStaked),
          })
        ),
        relatedAssets: relatedAssets?.assets?.map((asset) => ({
          src: asset.image_url,
          link: asset.permalink,
        })),
        traits: pricingSessionMetadata.traits,
        creator: pricingSessionMetadata.creator,
      }

      dispatch(setCurrentSessionData(sessionData))
      dispatch(setCurrentSessionStatus(sessionStatus))
      dispatch(setCurrentSessionFetchStatus(PromiseStatus.Resolved))
    },

    [dispatch, getEthUsdContract, multicall, networkSymbol]
  )
}

export const useGetUserStatus = () => {
  const dispatch = useDispatch<AppDispatch>()
  const getPricingSessionContract = useWeb3Contract(ABC_PRICING_SESSION_ABI)
  const { account } = useActiveWeb3React()
  const networkSymbol = useGetCurrentNetwork()

  return useCallback(
    async (address: string, tokenId: string) => {
      const userStatus = await getUserStatus({
        address,
        account,
        getPricingSessionContract,
        tokenId,
        networkSymbol,
      })
      dispatch(setUserStatus(userStatus))
    },
    [account, dispatch, getPricingSessionContract, networkSymbol]
  )
}
