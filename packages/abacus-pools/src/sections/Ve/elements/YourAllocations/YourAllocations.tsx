import { H4 } from "abacus-ui"
import { BigNumber } from "ethers"
import React from "react"
import styled from "styled-components"
import { SectionTitle, StyledSection } from "../Ve.styles"
import { Allocation } from "./Allocation"

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

const HeadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const Heading = styled(H4)`
  flex: 0 1 auto;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.core[900]};
`

const YourAllocations = () => (
  <StyledSection order={2}>
    <SectionTitle>Your Allocations</SectionTitle>
    <HeadingContainer>
      <Heading>Collection</Heading>
      <Heading>Amount</Heading>
    </HeadingContainer>
    {allocations.map((allocation) => (
      <Allocation key={allocation.address} {...allocation} />
    ))}
  </StyledSection>
)

export { YourAllocations }
