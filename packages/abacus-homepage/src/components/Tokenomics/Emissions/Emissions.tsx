import { SectionSubTitle } from "@components/SectionTitle"
import { Media } from "abacus-ui"
import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { EmissionsCard, EmissionsCardProps } from "./EmissionsCard"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 40px;
`

const EmissionCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 32px;
  position: relative;
  margin-top: 24px;
  width: max-content;

  ${Media.sm`
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  `}

  ${Media.md`
    flex-wrap: nowrap;
  `}
`

const EmissionsCardContainerLine = styled.span`
  width: 1px;
  position: absolute;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.utility.blue};
  z-index: -1;

  ${Media.sm`
    height: 1px;
    width: 80%;
    top: 22%;
  `}

  ${Media.md`
    height: 1px;
    width: 100%;
    top: unset;
  `}
`

const emissions: EmissionsCardProps[] = [
  { emission: "800M", timeframe: "Pre-Sale" },
  { emission: "700M", timeframe: "Year 1" },
  { emission: "350M", timeframe: "Year 2" },
  { emission: "150M", timeframe: "Year 3" },
  { emission: "2B", timeframe: "Total" },
]

const Emissions: FunctionComponent = () => (
  <Container>
    <SectionSubTitle>Token Emission Schedule</SectionSubTitle>
    <EmissionCardContainer>
      <EmissionsCardContainerLine />
      {emissions.map((emission) => (
        <EmissionsCard key={emission.timeframe} {...emission} />
      ))}
    </EmissionCardContainer>
  </Container>
)

export { Emissions }
