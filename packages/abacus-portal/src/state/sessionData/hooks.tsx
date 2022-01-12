import { useCallback, useEffect, useRef } from "react"
import { AppState } from "@state/index"
import { useDispatch, useSelector } from "react-redux"
import {
  getMultipleSessionData,
  getCurrentSessionData,
  setUserStatus,
  setClaimPosition,
} from "./actions"
import {
  SessionData,
  CurrentSessionState,
  UserState,
  SessionState,
  ClaimState,
} from "./reducer"
import { AppDispatch } from "../index"
import {
  useWeb3Contract,
  useActiveWeb3React,
  useWeb3EthContract,
} from "@hooks/index"
import {
  ABC_PRICING_SESSION_ADDRESS,
  CURRENT_SESSIONS as CURRENT_SESSIONS_NETWORK,
  ETH_USD_ORACLE_ADDRESS,
  NetworkSymbolEnum,
} from "@config/constants"
import ABC_PRICING_SESSION_ABI from "@config/contracts/ABC_PRICING_SESSION_ABI.json"
import ETH_USD_ORACLE_ABI from "@config/contracts/ETH_USD_ORACLE_ABI.json"
import _ from "lodash"
import { openseaGet, shortenAddress } from "@config/utils"
import { formatEther } from "ethers/lib/utils"
import axios from "axios"
import {
  currentSessionDataSelector,
  currentSessionStatusSelector,
  currentSessionUserStatusSelector,
} from "./selectors"
import { useGetCurrentNetwork } from "@state/application/hooks"

const modifyTimeAndSession = (
  getStatus: string,
  pricingSessionData: any,
  stateVals: any
) => {
  let sessionStatus = Number(getStatus)
  let endTime = Number(pricingSessionData.endTime) * 1000
  const currentTime = Date.now()
  if (sessionStatus === 3) {
    endTime =
      Number(stateVals.timeFinalAppraisalSet) * 1000 +
      Number(pricingSessionData.votingTime) * 1000
    if (currentTime >= endTime) {
      sessionStatus = 4
    }
  } else if (sessionStatus === 4) {
    endTime =
      Number(stateVals.timeFinalAppraisalSet) * 1000 +
      Number(pricingSessionData.votingTime) * 2 * 1000
  } else if (sessionStatus == 1) {
    endTime = endTime + Number(pricingSessionData.votingTime) * 1000
    if (currentTime >= endTime) {
      sessionStatus = 2
    }
  } else if (sessionStatus == 0 && currentTime > endTime) {
    sessionStatus = 1
    endTime = endTime + Number(pricingSessionData.votingTime) * 1000
  }
  return { endTime, sessionStatus }
}

export const useRetrieveClaimData = () => {
  const dispatch = useDispatch<AppDispatch>()
  const getPricingSessionContract = useWeb3Contract(ABC_PRICING_SESSION_ABI)
  const sessionData = useCurrentSessionData()
  const networkSymbol = useGetCurrentNetwork()

  return useCallback(async () => {
    const pricingSession = getPricingSessionContract(
      ABC_PRICING_SESSION_ADDRESS(networkSymbol)
    )
    const [getEthPayout, ethToAbc] = await Promise.all([
      pricingSession.methods
        .getEthPayout(sessionData.address, sessionData.tokenId)
        .call(),
      pricingSession.methods.ethToAbc().call(),
    ])

    const claimData: ClaimState = {
      abcClaimAmount: Number(formatEther(getEthPayout * ethToAbc)),
      ethClaimAmount: Number(formatEther(getEthPayout)),
    }
    dispatch(setClaimPosition(claimData))
  }, [dispatch, sessionData, networkSymbol])
}

export const useGetMultiSessionData = () => {
  const dispatch = useDispatch<AppDispatch>()
  const getPricingSessionContract = useWeb3Contract(ABC_PRICING_SESSION_ABI)
  const networkSymbol = useGetCurrentNetwork()
  const { chainId } = useActiveWeb3React()

  return useCallback(async () => {
    const pricingSession = getPricingSessionContract(
      ABC_PRICING_SESSION_ADDRESS(networkSymbol)
    )
    const CURRENT_SESSIONS = CURRENT_SESSIONS_NETWORK(networkSymbol)

    // TODO: Make sure API works for more than 20 contracts
    let URL =
      `assets?` +
      _.map(CURRENT_SESSIONS, i => {
        return `asset_contract_addresses=${i.address}&token_ids=${Number(
          i.tokenId
        )}&`
      })
    URL = URL.replaceAll(",", "")
    let pricingSessionMetadata
    try {
      pricingSessionMetadata = await openseaGet(URL)
    } catch (e) {
      console.error(e)
      return
    }
    pricingSessionMetadata = pricingSessionMetadata.assets

    if (!_.get(pricingSession, "currentProvider")) {
      return
    }

    const pricingSessionNonce = await Promise.all(
      _.map(CURRENT_SESSIONS, session =>
        pricingSession.methods.nftNonce(session.address, session.tokenId).call()
      )
    )

    const statuses = await Promise.all(
      _.map(CURRENT_SESSIONS, session =>
        pricingSession.methods
          .getStatus(session.address, session.tokenId)
          .call()
      )
    )

    const finalAppraisalValues = await Promise.all(
      _.map(_.range(0, CURRENT_SESSIONS.length), i =>
        pricingSession.methods
          .finalAppraisalValue(
            Number(pricingSessionNonce[i]),
            CURRENT_SESSIONS[i].address,
            CURRENT_SESSIONS[i].tokenId
          )
          .call()
      )
    )

    const pricingSessionCoreData = await Promise.all(
      _.map(_.range(0, CURRENT_SESSIONS.length), i =>
        pricingSession.methods
          .NftSessionCore(
            pricingSessionNonce[i],
            CURRENT_SESSIONS[i].address,
            CURRENT_SESSIONS[i].tokenId
          )
          .call()
      )
    )

    const pricingSessionCheckData = await Promise.all(
      _.map(_.range(0, CURRENT_SESSIONS.length), i =>
        pricingSession.methods
          .NftSessionCheck(
            pricingSessionNonce[i],
            CURRENT_SESSIONS[i].address,
            CURRENT_SESSIONS[i].tokenId
          )
          .call()
      )
    )

    const sessionData: SessionData[] = _.map(
      _.range(0, CURRENT_SESSIONS.length),
      i => {
        const { endTime, sessionStatus } = modifyTimeAndSession(
          statuses[i],
          pricingSessionCoreData[i],
          pricingSessionCheckData[i]
        )
        return {
          img:
            pricingSessionMetadata?.[i]?.image_preview_url ||
            pricingSessionMetadata?.[i]?.image_url,
          endTime: endTime,
          numPpl: Number(pricingSessionCoreData[i].uniqueVoters),
          collectionTitle: pricingSessionMetadata?.[i]?.collection?.name,
          totalStaked: Number(
            formatEther(pricingSessionCoreData[i].totalSessionStake)
          ),
          nftName: pricingSessionMetadata?.[i]?.name,
          finalAppraisalValue:
            sessionStatus >= 3
              ? Number(formatEther(finalAppraisalValues[i]))
              : undefined,
          address: CURRENT_SESSIONS[i].address,
          tokenId: CURRENT_SESSIONS[i].tokenId,
          nonce: Number(pricingSessionNonce[i]),
          ownerAddress: pricingSessionMetadata?.[i]?.owner?.address,
          owner:
            pricingSessionMetadata?.[i]?.owner?.user &&
            pricingSessionMetadata?.[i]?.owner?.user?.username
              ? pricingSessionMetadata?.[i]?.owner?.user?.username
              : shortenAddress(pricingSessionMetadata?.[i]?.owner?.address),
          maxAppraisal: Number(pricingSessionCoreData[i].maxAppraisal),
        }
      }
    )
    dispatch(getMultipleSessionData(sessionData))
  }, [dispatch, networkSymbol, chainId])
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
  const callbackRef = useRef(
    (address: string, tokenId: string, nonce: number) => {}
  )
  const getPricingSessionContract = useWeb3Contract(ABC_PRICING_SESSION_ABI)
  const getEthUsdContract = useWeb3EthContract(ETH_USD_ORACLE_ABI)
  const networkSymbol = useGetCurrentNetwork()
  const { account, chainId } = useActiveWeb3React()

  const callback = useCallback(
    async (address: string, tokenId: string, nonce: number) => {
      const pricingSession = getPricingSessionContract(
        ABC_PRICING_SESSION_ADDRESS(networkSymbol)
      )
      const ethUsdOracle = getEthUsdContract(ETH_USD_ORACLE_ADDRESS)

      let URL = `asset/${address}/${tokenId}`
      const [
        pricingSessionMetadata,
        pricingSessionCore,
        getStatus,
        pricingSessionCheck,
        finalAppraisalValue,
      ] = await Promise.all([
        openseaGet(URL),
        pricingSession.methods.NftSessionCore(nonce, address, tokenId).call(),
        pricingSession.methods.getStatus(address, tokenId).call(),
        pricingSession.methods.NftSessionCheck(nonce, address, tokenId).call(),
        pricingSession.methods
          .finalAppraisalValue(nonce, address, tokenId)
          .call(),
      ])

      let ethUsd
      try {
        ethUsd = await ethUsdOracle.methods.latestRoundData().call()
        ethUsd = Number(ethUsd.answer) / 100000000
      } catch (e) {
        ethUsd = 4500
      }

      const { endTime, sessionStatus } = modifyTimeAndSession(
        getStatus,
        pricingSessionCore,
        pricingSessionCheck
      )
      const sessionData: SessionData = {
        img:
          pricingSessionMetadata?.image_url ||
          pricingSessionMetadata?.image_preview_url,
        endTime,
        numPpl: Number(pricingSessionCore.uniqueVoters),
        collectionTitle: pricingSessionMetadata?.collection?.name,
        totalStaked: Number(formatEther(pricingSessionCore.totalSessionStake)),
        totalStakedInUSD:
          Number(formatEther(pricingSessionCore.totalSessionStake)) *
          Number(ethUsd),
        nftName: pricingSessionMetadata?.name,
        address: address,
        tokenId: tokenId,
        nonce: nonce,
        finalAppraisalValue:
          sessionStatus >= 3
            ? Number(formatEther(finalAppraisalValue))
            : undefined,
        owner:
          pricingSessionMetadata?.owner?.user &&
          pricingSessionMetadata?.owner?.user?.username
            ? pricingSessionMetadata?.owner?.user?.username
            : shortenAddress(pricingSessionMetadata?.owner?.address),
        ownerAddress: pricingSessionMetadata?.owner?.address,
        maxAppraisal: Number(pricingSessionCore.maxAppraisal),
      }

      console.log(sessionData)

      const userStatus = await getUserStatus({
        address,
        account,
        getPricingSessionContract,
        tokenId,
        networkSymbol,
      })

      const currentSessionData: CurrentSessionState = {
        sessionData,
        userStatus,
        sessionStatus: sessionStatus,
      }
      dispatch(getCurrentSessionData(currentSessionData))
    },
    [dispatch, account, getPricingSessionContract, networkSymbol, chainId]
  )

  useEffect(() => {
    callbackRef.current = _.debounce(callback, 1500)
  }, [callback])

  return callbackRef.current
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
  >(state => state.sessionData.currentSessionData.userStatus)

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
      return userStatus === UserState.CompletedHarvest
    case SessionState.Complete:
      return true
    default:
      return false
  }
}
