import { createAction } from "@reduxjs/toolkit"
import { Pool } from "./reducer"

export const getPools = createAction<Pool[]>("poolData/getPools")
export const getMyPools = createAction<Pool[]>("poolData/getMyPools")
