import { createReducer } from "@reduxjs/toolkit"
import { getPoolData } from "./actions"
import { Pool } from "../poolData/reducer"

export interface PoolState {
  data?: Pool
}

const initialState: PoolState = {}

export default createReducer(initialState, (builder) =>
  builder.addCase(getPoolData, (state, action) => {
    state.data = action.payload
  })
)
