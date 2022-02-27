import { createAction } from "@reduxjs/toolkit"
import { Pool } from "@state/poolData/reducer"

export const getPoolData = createAction<Pool>("singlePoolData/getPoolData")
