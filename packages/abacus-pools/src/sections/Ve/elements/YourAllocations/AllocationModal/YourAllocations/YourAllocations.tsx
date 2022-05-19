import React from "react"
import styled from "styled-components"
import { Button, P } from "abacus-ui"
import { ColumnContainer, Heading } from "../../YourAllocations.styled"
import { SectionContainer, SectionHeader } from "../AllocationModal.styled"
import { allocations } from "../../../placeholder-data"
import { Allocation } from "../../Allocation"
import { UserState } from "../AllocationModal"

type YourAllocationsProps = {
  userState: UserState
  allocationToChange: string
  setAllocationToChange: React.Dispatch<string>
}

const SaveChanges = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: auto;
  row-gap: 8px;
  text-align: center;
`

const YourAllocations = ({
  userState,
  setAllocationToChange,
  allocationToChange,
}: YourAllocationsProps) => {
  const editMode = userState === UserState.WRITE
  return (
    <SectionContainer>
      <SectionHeader>Your Allocations</SectionHeader>
      <ColumnContainer>
        <Heading>Collection</Heading>
        <Heading span={2}>Amount</Heading>
        {allocations.map((allocation) => {
          const hasSelectedAllocation = Boolean(allocationToChange)
          const isSelectedAllocation = allocation.address === allocationToChange
          const action = () =>
            setAllocationToChange(
              hasSelectedAllocation ? null : allocation.address
            )
          return (
            <Allocation
              key={allocation.address}
              {...allocation}
              changeAction={action}
              isSelected={isSelectedAllocation}
              changeDisabled={hasSelectedAllocation && !isSelectedAllocation}
              conserveSpace
            />
          )
        })}
      </ColumnContainer>
      {editMode && (
        <SaveChanges>
          <Button>Save Changes</Button>
          <P>
            Select collection on the left or input custom address to change
            allocation
          </P>
        </SaveChanges>
      )}
    </SectionContainer>
  )
}

export { YourAllocations }
