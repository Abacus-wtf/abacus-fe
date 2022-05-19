import { Button, ButtonType, Input } from "abacus-ui"
import React, { useState } from "react"
import styled from "styled-components"
import { allocations as placeholder } from "../../../placeholder-data"
import { UserState } from "../AllocationModal"
import {
  ColumnTitle,
  SectionContainer,
  SectionHeader,
} from "../AllocationModal.styled"
import { OverallAllocationRow } from "./OverallAllocationRow"
import { Table, TR } from "./OverallAllocations.styled"

type OverallAllocationsProps = {
  userState: UserState
}

const ViewMoreButton = styled(Button)`
  align-self: center;
  color: ${({ theme }) => theme.colors.utility.blue};
  text-decoration: underline;
`

const OverallAllocations = ({ userState }: OverallAllocationsProps) => {
  const [selectedAllocation, setSelectedAllocation] = useState("")
  const [customAddress, setCustomAddress] = useState("")
  const editMode = userState === UserState.WRITE
  const allocations = Array(8)
    .fill(placeholder[0])
    .map((allocation, i) => ({
      ...allocation,
      address: `${allocation.address}${i}`,
      percent: 12.7,
    }))
  return (
    <SectionContainer>
      <SectionHeader>Overall Allocations</SectionHeader>
      {editMode && (
        <>
          <Input
            type="text"
            value={customAddress}
            onChange={(s) => {
              setSelectedAllocation("")
              setCustomAddress(s)
            }}
            placeholder="0X000000000000000000000"
            name="custom_address"
            label="Input Custom Collection Address"
          />
          <div style={{ marginBottom: "24px" }} />
        </>
      )}
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
            setSelectedAllocation={(s) => {
              setCustomAddress("")
              setSelectedAllocation(s)
            }}
          />
        ))}
      </Table>
      <ViewMoreButton buttonType={ButtonType.Clear}>View More</ViewMoreButton>
    </SectionContainer>
  )
}

export { OverallAllocations }
