import { createAction } from "@reduxjs/toolkit"
import { Pool } from "@state/poolData/reducer"
import { GetTicketsQuery } from "abacus-graph"
import { Bribe, TraderProfile } from "./reducer"

export const getPoolData = createAction<Pool>("singlePoolData/getPoolData")
export const getTraderProfile = createAction<TraderProfile>(
  "singlePoolData/getTraderProfile"
)
export const getTickets = createAction<GetTicketsQuery["tickets"]>(
  "singlePoolData/getTickets"
)
export const getBribe = createAction<Bribe>("singlePoolData/getBribe")
