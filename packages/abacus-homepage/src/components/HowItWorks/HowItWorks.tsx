import { Media, Infographic } from "abacus-ui"
import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Section } from "@components/Section"
import { SectionTitle } from "../SectionTitle"
import { Pools, Diving } from "../Icons"

const Container = styled(Section)`
  padding: 80px 0;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.utility.lightBlue};
`

const InfographicDivider = styled.hr`
  border: 0.5px solid ${({ theme }) => theme.colors.utility.blue};
  height: 0;
  width: 100%;
  margin: 4rem auto;

  ${Media.md`
    height: unset;
    width: 0;
    margin: 0;
  `};
`

const InfographicContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  margin-top: 40px;
  padding: 0 20px;

  ${Media.md`
    flex-direction: row;
    padding: 0 50px;
  `}
`

const HowItWorks: FunctionComponent = () => (
  <Container>
    <SectionTitle>How it Works</SectionTitle>
    <InfographicContainer>
      <Infographic
        icon={<Pools />}
        title="Open a Pool"
        description="Anyone can create a spot pool for any NFT in an allowed collection. However, in order to receive emissions, the owner of the NFT must sign the pool as proof of life."
        link="https://testnet.abacus.wtf"
      />
      <InfographicDivider />
      <Infographic
        icon={<Diving />}
        title="Buy into a Pool"
        description="Pools are separated into ticketed positions that have 1000 tokens which are worth 0.001 ETH each (positions are limited to 1 ETH in size)."
        link="https://testnet.abacus.wtf"
      />
    </InfographicContainer>
  </Container>
)

export { HowItWorks }
