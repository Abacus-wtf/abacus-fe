import { createAction } from "@reduxjs/toolkit"
import { Pool } from "@state/poolData/reducer"
import { PoolStateStatus } from "./reducer"

export const getPoolData = createAction<{
  data: Pool
  status: PoolStateStatus
}>("singlePoolData/getPoolData")
