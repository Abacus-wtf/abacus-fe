import { createReducer } from "@reduxjs/toolkit"
import { GetTicketsQuery } from "abacus-graph"
import { getBribe, getPoolData, getTickets, getTraderProfile } from "./actions"
import { INITIAL_POOL, Pool } from "../poolData/reducer"

export interface TraderProfile {
  creditPurchasePercentage: number
  ticketsOpen: number
  startTime: number
  timeUnlock: number
  tokensLocked: number
  finalCreditCount: number
  creditsPurchased: number
  ticketsOwned: {
    [ticket: number]: number
  }
}

export interface Bribe {
  offeredBribeSize: number
  bribeOfferedByUser: number
}

export interface PoolState {
  data: Pool
  traderProfile?: TraderProfile
  bribe?: Bribe
  tickets?: GetTicketsQuery["tickets"]
}

const initialState: PoolState = {
  data: INITIAL_POOL,
  traderProfile: {
    creditPurchasePercentage: 0,
    ticketsOpen: 0,
    startTime: 0,
    timeUnlock: 0,
    tokensLocked: 0,
    finalCreditCount: 0,
    creditsPurchased: 0,
    ticketsOwned: {},
  },
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(getPoolData, (state, action) => {
      state.data = action.payload
    })
    .addCase(getTraderProfile, (state, action) => {
      state.traderProfile = action.payload
    })
    .addCase(getTickets, (state, action) => {
      state.tickets = action.payload
    })
    .addCase(getBribe, (state, action) => {
      state.bribe = action.payload
    })
)
