import { H4, Media } from "abacus-ui"
import { BigNumber } from "ethers"
import React from "react"
import styled from "styled-components"
import { SectionTitle, StyledSection } from "../Ve.styles"
import { Allocation } from "./Allocation"
import { ColumnContainer } from "./YourAllocations.styled"

const allocations = [
  {
    collection: "Doodles",
    imgSrc: "/vomit.png",
    address: "0xdeds",
    amount: BigNumber.from("1231250000000000000000"),
  },
  {
    collection: "Doodles",
    imgSrc: "/vomit.png",
    address: "0xdeddds",
    amount: BigNumber.from("1231250000000000000000"),
  },
  {
    collection: "Doodles",
    imgSrc: "/vomit.png",
    address: "0xded23s",
    amount: BigNumber.from("1231250000000000000000"),
  },
]

type Spanable = { span: number }
const Heading = styled(H4)<Spanable>`
  flex: 0 1 auto;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.core[900]};

  ${Media.sm`
    grid-column: span ${({ span }: Spanable) => span};
  `}
`

const YourAllocations = () => (
  <StyledSection order={2}>
    <SectionTitle>Your Allocations</SectionTitle>
    <ColumnContainer>
      <Heading>Collection</Heading>
      <Heading span={2}>Amount</Heading>
      {allocations.map((allocation) => (
        <Allocation key={allocation.address} {...allocation} />
      ))}
    </ColumnContainer>
  </StyledSection>
)

export { YourAllocations }
