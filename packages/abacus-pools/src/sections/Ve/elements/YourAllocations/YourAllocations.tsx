import { Media, Button, ButtonType } from "abacus-ui"
import React, { useState } from "react"
import styled from "styled-components"
import { allocations } from "../placeholder-data"
import { SectionTitle, StyledSection } from "../Ve.styles"
import { Allocation } from "./Allocation"
import { AllocationModal } from "./AllocationModal"
import { ColumnContainer, Heading } from "./YourAllocations.styled"

const SeeAllButton = styled(Button)`
  align-self: center;
  margin-top: 16px;

  ${Media.sm`
    margin: 0;
  `}
`

const YourAllocations = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [allocationToChange, setAllocationToChange] = useState<string>(null)
  return (
    <StyledSection order={2}>
      <SectionTitle>Your Allocations</SectionTitle>
      <ColumnContainer>
        <Heading>Collection</Heading>
        <Heading span={2}>Amount</Heading>
        {allocations.map((allocation) => (
          <Allocation
            key={allocation.address}
            {...allocation}
            changeAction={() => {
              setAllocationToChange(allocation.address)
              setModalOpen(true)
            }}
          />
        ))}
      </ColumnContainer>
      <SeeAllButton buttonType={ButtonType.Gray}>{"See All >"}</SeeAllButton>
      <AllocationModal
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        allocationToChange={allocationToChange}
        setAllocationToChange={setAllocationToChange}
      />
    </StyledSection>
  )
}

export { YourAllocations }
