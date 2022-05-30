import { createAction } from "@reduxjs/toolkit"
import { VeAllocation } from "@sections/Ve/models"

export const setUserAllocations = createAction<VeAllocation[]>(
  "allocations/userAllocations"
)
export const setEpochAllocations = createAction<VeAllocation[]>(
  "allocations/epochAllocations"
)
