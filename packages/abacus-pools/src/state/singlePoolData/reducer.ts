import { createReducer } from "@reduxjs/toolkit"
import { getBribe, getPoolData, getTickets, getTraderProfile } from "./actions"
import { Pool } from "../poolData/reducer"

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

export interface Ticket {
  order: number
  amount: number
  ownToken: boolean
}

export interface Bribe {
  offeredBribeSize: number
  bribeOfferedByUser: number
}

export interface PoolState {
  data?: Pool
  traderProfile?: TraderProfile
  bribe?: Bribe
  tickets?: Ticket[]
}

const initialState: PoolState = {}

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
