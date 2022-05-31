import { VeAllocation } from "@sections/Ve/models"
import { useVeData } from "@sections/Ve/useVeData"
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

type YourAllocationsProps = {
  refreshVeState: () => void
}

const YourAllocations = ({ refreshVeState }: YourAllocationsProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [allocationToChange, setAllocationToChange] =
    useState<VeAllocation>(null)
  const allocations = useUserAllocations()
  const { holderData } = useVeData()
  return (
    <StyledSection order={2}>
      <SectionTitle>Your Allocations</SectionTitle>
      <Heading>Auto-Allocated: {holderData?.amountAutoAllocated} veABC</Heading>
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
                  setAllocationToChange(allocation)
                  setModalOpen(true)
                }}
              />
            ) : null
          )}
        </ColumnContainer>
      ) : (
        "You have no collection allocations yet"
      )}
      <SeeAllButton
        buttonType={ButtonType.Gray}
        onClick={() => setModalOpen(true)}
        disabled={!allocations?.length}
      >
        {"See All >"}
      </SeeAllButton>
      <AllocationModal
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        allocationToChange={allocationToChange}
        setAllocationToChange={setAllocationToChange}
        refreshVeState={refreshVeState}
      />
    </StyledSection>
  )
}

export { YourAllocations }
