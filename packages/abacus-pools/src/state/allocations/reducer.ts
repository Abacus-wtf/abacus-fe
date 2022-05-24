import { createReducer } from "@reduxjs/toolkit"
import { VeAllocation } from "@sections/Ve/models"
import { setUserAllocations } from "./actions"

interface AllocationState {
  allocations: VeAllocation[]
  userAllocations: VeAllocation[]
}

const initialState: AllocationState = {
  allocations: [],
  userAllocations: [],
}

export default createReducer(initialState, (builder) =>
  builder.addCase(setUserAllocations, (state, action) => {
    state.userAllocations = action.payload
  })
)
