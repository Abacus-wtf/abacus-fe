import { createReducer } from "@reduxjs/toolkit"
import { getPoolData } from "./actions"
import { Pool } from "../poolData/reducer"

export enum PoolStateStatus {
  AMM,
  Auction,
}

export interface PoolState {
  data?: Pool
  status?: PoolStateStatus
}

const initialState: PoolState = {}

export default createReducer(initialState, (builder) =>
  builder.addCase(getPoolData, (state, action) => {
    state.data = action.payload.data
    state.status = action.payload.status
  })
)
