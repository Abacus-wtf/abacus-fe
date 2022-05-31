import React from "react"
import styled from "styled-components"
import { Button, P } from "abacus-ui"
import { useUserAllocations } from "@state/allocations/hooks"
import { VeAllocation } from "@sections/Ve/models"
import { ColumnContainer, Heading } from "../../YourAllocations.styled"
import { SectionContainer, SectionHeader } from "../AllocationModal.styled"
import { Allocation } from "../../Allocation"
import { UserState } from "../AllocationModal"

type YourAllocationsProps = {
  userState: UserState
  allocationToChange: VeAllocation
  setAllocationToChange: React.Dispatch<VeAllocation>
  changeAllocation: () => void
  changeAllocationDisabled: boolean
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
  changeAllocation,
  changeAllocationDisabled,
}: YourAllocationsProps) => {
  const editMode = userState === UserState.WRITE
  const allocations = useUserAllocations()
  return (
    <SectionContainer>
      <SectionHeader>Your Allocations</SectionHeader>
      <ColumnContainer>
        <Heading>Collection</Heading>
        <Heading span={2}>Amount</Heading>
        {allocations.map((allocation) => {
          const hasSelectedAllocation = Boolean(allocationToChange)
          const isSelectedAllocation =
            allocation.address === allocationToChange?.address
          const action = () =>
            setAllocationToChange(hasSelectedAllocation ? null : allocation)
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
          <Button
            disabled={changeAllocationDisabled}
            onClick={changeAllocation}
          >
            Save Changes
          </Button>
          {changeAllocationDisabled && (
            <P>
              Select collection on the left or input custom address to change
              allocation
            </P>
          )}
        </SaveChanges>
      )}
    </SectionContainer>
  )
}

export { YourAllocations }
