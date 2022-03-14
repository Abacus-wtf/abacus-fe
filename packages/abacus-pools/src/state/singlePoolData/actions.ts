import { createAction } from "@reduxjs/toolkit"
import { Pool } from "@state/poolData/reducer"
import { Bribe, Ticket, TraderProfile } from "./reducer"

export const getPoolData = createAction<Pool>("singlePoolData/getPoolData")
export const getTraderProfile = createAction<TraderProfile>(
  "singlePoolData/getTraderProfile"
)
export const getTickets = createAction<Ticket[]>("singlePoolData/getTickets")
export const getBribe = createAction<Bribe>("singlePoolData/getBribe")
