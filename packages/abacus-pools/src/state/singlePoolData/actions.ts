import { createAction } from "@reduxjs/toolkit"
import { Pool } from "@state/poolData/reducer"
import { TraderProfile } from "./reducer"

export const getPoolData = createAction<Pool>("singlePoolData/getPoolData")
export const getTraderProfile = createAction<TraderProfile>(
  "singlePoolData/getTraderProfile"
)
