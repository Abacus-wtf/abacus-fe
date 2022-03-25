import { createReducer } from "@reduxjs/toolkit"
import { PromiseStatus } from "@models/PromiseStatus"
import { OpenSeaAsset } from "@config/utils"
import {
  setUserStatus,
  setMultipleSessionData,
  setMultipleSessionFetchStatus,
  setMultipleSessionErrorMessage,
  setCurrentSessionFetchStatus,
  setCurrentSessionErrorMessage,
  setMySessionsData,
  setMySessionsFetchStatus,
  setMySessionsErrorMessage,
  setActiveSessionsData,
  setActiveSessionsFetchStatus,
  setActiveSessionsErrorMessage,
  setMultipleSessionPage,
  setMySessionsPage,
  setActiveSessionsPage,
  setMultipleSessionIsLastPage,
  setMySessionsIsLastPage,
  setActiveSessionsIsLastPage,
  setFeaturedSessionData,
  setFeaturedSessionFetchStatus,
  setFeaturedSessionErrorMessage,
  setCurrentSessionData,
  setCurrentSessionStatus,
} from "./actions"

export interface Vote {
  user: string
  appraisal: string
  amountStaked: string
  weight: string
}

export enum SessionState {
  Vote = 0,
  Weigh = 1,
  SetFinalAppraisal = 2,
  Harvest = 3,
  Claim = 4,
  Complete = 5,
}

export enum UserState {
  NotLoggedIn = -1,
  NotVoted = 0,
  CompletedVote = 1,
  CompletedWeigh = 2,
}

export interface SessionData {
  image_url: string
  animation_url: string | null
  endTime: number
  votingTime: number
  numPpl: number
  collectionTitle: string
  totalStaked: number
  bounty: number
  bountyInUSD?: number
  nftName: string
  address: string
  tokenId: string
  owner: string
  ownerAddress: string
  nonce: number
  maxAppraisal: number
  guessedAppraisal?: number
  finalAppraisalValue?: number
  totalStakedInUSD?: number
  rankings?: Vote[]
  winnerAmount?: number
  currentStatus?: SessionState
  traits: OpenSeaAsset["traits"]
  creator: OpenSeaAsset["creator"]
}

export interface CurrentSessionData extends SessionData {
  votes: Vote[]
  relatedAssets: { src: string; link: string }[]
}

export interface ClaimState {
  ethClaimAmount: number
  abcClaimAmount: number
  totalProfit: number
}

export interface CurrentSessionState {
  sessionData: CurrentSessionData
  sessionStatus: SessionState
  userStatus: UserState
  fetchStatus?: PromiseStatus
  errorMessage?: string | null
}

export interface FeaturedSessionState {
  featuredSessionData: SessionData[] | null
  fetchStatus: PromiseStatus
  errorMessage: string | null
}

export interface MultiSessionState {
  multiSessionData: SessionData[] | null
  fetchStatus: PromiseStatus
  errorMessage: string | null
  page: number
  isLastPage: boolean
}

export interface MySessionsState {
  data: SessionData[]
  fetchStatus: PromiseStatus
  errorMessage: string | null
  page: number
  isLastPage: boolean
}

export interface ActiveSessionsState {
  data: SessionData[]
  fetchStatus: PromiseStatus
  errorMessage: string | null
  page: number
  isLastPage: boolean
}

interface SessionDataState {
  currentSessionData: CurrentSessionState | null
  featuredSessionState: FeaturedSessionState
  multiSessionState: MultiSessionState
  mySessionsState: MySessionsState
  activeSessionsState: ActiveSessionsState
}

export const initialState = {
  currentSessionData: {},
  featuredSessionState: {
    featuredSessionData: [],
    fetchStatus: PromiseStatus.Idle,
    errorMessage: null,
  },
  multiSessionState: {
    multiSessionData: [],
    fetchStatus: PromiseStatus.Idle,
    errorMessage: null,
    page: 0,
    isLastPage: true,
  },
  mySessionsState: {
    data: [],
    fetchStatus: PromiseStatus.Idle,
    errorMessage: null,
    page: 0,
    isLastPage: true,
  },
  activeSessionsState: {
    data: [],
    fetchStatus: PromiseStatus.Idle,
    errorMessage: null,
    page: 0,
    isLastPage: true,
  },
} as SessionDataState

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setCurrentSessionData, (state, action) => {
      state.currentSessionData.sessionData = action.payload
    })
    .addCase(setCurrentSessionStatus, (state, action) => {
      state.currentSessionData.sessionStatus = action.payload
    })
    .addCase(setUserStatus, (state, action) => {
      state.currentSessionData.userStatus = action.payload
    })
    .addCase(setCurrentSessionFetchStatus, (state, action) => {
      if (state.currentSessionData !== null) {
        state.currentSessionData.fetchStatus = action.payload
      }
    })
    .addCase(setCurrentSessionErrorMessage, (state, action) => {
      if (state.currentSessionData !== null) {
        state.currentSessionData.errorMessage = action.payload
      }
    })
    .addCase(setFeaturedSessionData, (state, action) => {
      state.featuredSessionState.featuredSessionData = action.payload
    })
    .addCase(setFeaturedSessionFetchStatus, (state, action) => {
      if (action.payload === PromiseStatus.Rejected) {
        state.featuredSessionState.errorMessage = "Failed to get Session Data"
      } else if (action.payload === PromiseStatus.Resolved) {
        state.featuredSessionState.errorMessage = null
      }
      state.featuredSessionState.fetchStatus = action.payload
    })
    .addCase(setFeaturedSessionErrorMessage, (state, action) => {
      state.featuredSessionState.errorMessage = action.payload
    })
    .addCase(setMultipleSessionData, (state, action) => {
      state.multiSessionState.multiSessionData = action.payload
    })
    .addCase(setMultipleSessionFetchStatus, (state, action) => {
      if (action.payload === PromiseStatus.Rejected) {
        state.multiSessionState.errorMessage = "Failed to get Session Data"
      } else if (action.payload === PromiseStatus.Resolved) {
        state.multiSessionState.errorMessage = null
      }
      state.multiSessionState.fetchStatus = action.payload
    })
    .addCase(setMultipleSessionErrorMessage, (state, action) => {
      state.multiSessionState.errorMessage = action.payload
    })
    .addCase(setMultipleSessionPage, (state, action) => {
      state.multiSessionState.page = action.payload
    })
    .addCase(setMultipleSessionIsLastPage, (state, action) => {
      state.multiSessionState.isLastPage = action.payload
    })
    .addCase(setMySessionsData, (state, action) => {
      state.mySessionsState.data = action.payload
    })
    .addCase(setMySessionsFetchStatus, (state, action) => {
      if (action.payload === PromiseStatus.Rejected) {
        state.mySessionsState.errorMessage = "Failed to get My Sessions Data"
      } else if (action.payload === PromiseStatus.Resolved) {
        state.mySessionsState.errorMessage = null
      }
      state.mySessionsState.fetchStatus = action.payload
    })
    .addCase(setMySessionsErrorMessage, (state, action) => {
      state.mySessionsState.errorMessage = action.payload
    })
    .addCase(setMySessionsPage, (state, action) => {
      state.mySessionsState.page = action.payload
    })
    .addCase(setMySessionsIsLastPage, (state, action) => {
      state.mySessionsState.isLastPage = action.payload
    })
    .addCase(setActiveSessionsData, (state, action) => {
      state.activeSessionsState.data = action.payload
    })
    .addCase(setActiveSessionsFetchStatus, (state, action) => {
      if (action.payload === PromiseStatus.Rejected) {
        state.activeSessionsState.errorMessage =
          "Failed to get Active Sessions Data"
      } else if (action.payload === PromiseStatus.Resolved) {
        state.activeSessionsState.errorMessage = null
      }
      state.activeSessionsState.fetchStatus = action.payload
    })
    .addCase(setActiveSessionsErrorMessage, (state, action) => {
      state.activeSessionsState.errorMessage = action.payload
    })
    .addCase(setActiveSessionsPage, (state, action) => {
      state.activeSessionsState.page = action.payload
    })
    .addCase(setActiveSessionsIsLastPage, (state, action) => {
      state.activeSessionsState.isLastPage = action.payload
    })
)
