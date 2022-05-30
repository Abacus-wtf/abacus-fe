import { createReducer } from "@reduxjs/toolkit"
import { VeAllocation } from "@sections/Ve/models"
import { setEpochAllocations, setUserAllocations } from "./actions"

interface AllocationState {
  epochAllocations: VeAllocation[]
  userAllocations: VeAllocation[]
}

const initialState: AllocationState = {
  epochAllocations: [],
  userAllocations: [],
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(setUserAllocations, (state, action) => {
      state.userAllocations = action.payload
    })
    .addCase(setEpochAllocations, (state, action) => {
      state.epochAllocations = action.payload
    })
)
