import { createAction } from "@reduxjs/toolkit"
import { VeAllocation } from "@sections/Ve/models"
import { EpochAllocationAggregate } from "abacus-graph"

export const setUserAllocations = createAction<VeAllocation[]>(
  "allocations/userAllocations"
)
export const setEpochAllocations = createAction<VeAllocation[]>(
  "allocations/epochAllocations"
)
export const setEpochAllocationAggregate =
  createAction<EpochAllocationAggregate>("allocations/epochAllocationAggregate")
