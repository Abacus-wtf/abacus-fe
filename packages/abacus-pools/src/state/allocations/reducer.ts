import { createReducer } from "@reduxjs/toolkit"
import { VeAllocation } from "@sections/Ve/models"
import { EpochAllocationAggregate } from "abacus-graph"
import {
  setEpochAllocationAggregate,
  setEpochAllocations,
  setUserAllocations,
} from "./actions"

interface AllocationState {
  epochAllocations: VeAllocation[]
  userAllocations: VeAllocation[]
  epochAllocationAggregate: EpochAllocationAggregate
}

const initialState: AllocationState = {
  epochAllocations: [],
  userAllocations: [],
  epochAllocationAggregate: null,
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setUserAllocations, (state, action) => {
      state.userAllocations = action.payload
    })
    .addCase(setEpochAllocations, (state, action) => {
      state.epochAllocations = action.payload
    })
    .addCase(setEpochAllocationAggregate, (state, action) => {
      state.epochAllocationAggregate = action.payload
    })
)
