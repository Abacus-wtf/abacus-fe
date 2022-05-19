import React, { useState } from "react"
import { allocations as placeholder } from "../../../placeholder-data"
import { UserState } from "../AllocationModal"
import { ColumnTitle } from "../AllocationModal.styled"
import { OverallAllocationRow } from "./OverallAllocationRow"
import {
  SectionContainer,
  SectionHeader,
  Table,
  TR,
} from "./OverallAllocations.styled"

type OverallAllocationsProps = {
  userState: UserState
}

const OverallAllocations = ({ userState }: OverallAllocationsProps) => {
  const [selectedAllocation, setSelectedAllocation] = useState("")
  const editMode = userState === UserState.WRITE
  const allocations = Array(8)
    .fill(placeholder[0])
    .map((allocation) => ({
      ...allocation,
      percent: 12.7,
    }))
  return (
    <SectionContainer>
      <SectionHeader>Overall Allocations</SectionHeader>
      <Table>
        <TR>
          <ColumnTitle as="th">#</ColumnTitle>
          <ColumnTitle as="th">Collection</ColumnTitle>
          <ColumnTitle as="th">Amount</ColumnTitle>
          <ColumnTitle as="th">%</ColumnTitle>
        </TR>
        {allocations.map((allocation, index) => (
          <OverallAllocationRow
            key={allocation.address}
            {...allocation}
            index={index}
            editMode={editMode}
            selectedAllocation={selectedAllocation}
            setSelectedAllocation={setSelectedAllocation}
          />
        ))}
      </Table>
    </SectionContainer>
  )
}

export { OverallAllocations }
