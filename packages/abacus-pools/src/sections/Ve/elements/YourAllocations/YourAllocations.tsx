import { H4, Media, Button, ButtonType } from "abacus-ui"
import React, { useState } from "react"
import styled from "styled-components"
import { allocations } from "../placeholder-data"
import { SectionTitle, StyledSection } from "../Ve.styles"
import { Allocation } from "./Allocation"
import { AllocationModal } from "./AllocationModal"
import { ColumnContainer } from "./YourAllocations.styled"

type Spanable = { span: number }
const Heading = styled(H4)<Spanable>`
  flex: 0 1 auto;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.core[900]};

  ${Media.sm`
    grid-column: span ${({ span }: Spanable) => span};
  `}
`

const SeeAllButton = styled(Button)`
  align-self: center;
  margin-top: 16px;

  ${Media.sm`
    margin: 0;
  `}
`

const YourAllocations = () => {
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
            setAllocationToChange={setAllocationToChange}
          />
        ))}
      </ColumnContainer>
      <SeeAllButton buttonType={ButtonType.Gray}>{"See All >"}</SeeAllButton>
      <AllocationModal
        isOpen={Boolean(allocationToChange)}
        closeModal={() => setAllocationToChange(null)}
      />
    </StyledSection>
  )
}

export { YourAllocations }
