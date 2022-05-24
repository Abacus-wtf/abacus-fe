import { useUserAllocations } from "@state/allocations/hooks"
import { Button, ButtonType } from "abacus-ui"
import React, { useState } from "react"
import styled from "styled-components"
import { SectionTitle, StyledSection } from "../Ve.styles"
import { Allocation } from "./Allocation"
import { AllocationModal } from "./AllocationModal"
import { ColumnContainer, Heading } from "./YourAllocations.styled"

const SeeAllButton = styled(Button)`
  align-self: center;
  margin-top: auto;
`

const YourAllocations = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [allocationToChange, setAllocationToChange] = useState<string>(null)
  const allocations = useUserAllocations()
  return (
    <StyledSection order={2}>
      <SectionTitle>Your Allocations</SectionTitle>
      {allocations.length > 0 ? (
        <ColumnContainer>
          <Heading>Collection</Heading>
          <Heading span={2}>Amount</Heading>
          {allocations.map((allocation, i) =>
            i < 3 ? ( // Only show the first 3
              <Allocation
                key={allocation.address}
                {...allocation}
                changeAction={() => {
                  setAllocationToChange(allocation.address)
                  setModalOpen(true)
                }}
              />
            ) : null
          )}
        </ColumnContainer>
      ) : (
        "You have no allocations yet"
      )}
      <SeeAllButton
        buttonType={ButtonType.Gray}
        onClick={() => setModalOpen(true)}
      >
        {"See All >"}
      </SeeAllButton>
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
