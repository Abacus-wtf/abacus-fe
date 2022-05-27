import { createAction } from "@reduxjs/toolkit"
import { VeAllocation } from "@sections/Ve/models"

export const setUserAllocations = createAction<VeAllocation[]>(
  "allocations/userAllocations"
)
export const setAllocations = createAction<VeAllocation[]>(
  "allocations/allocations"
)
