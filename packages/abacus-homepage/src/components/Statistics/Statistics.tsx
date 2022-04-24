import { Section } from "@components/Section"
import { Media, StatInfo } from "abacus-ui"
import React, { FunctionComponent } from "react"
import styled from "styled-components"

const Container = styled(Section)`
  background: ${({ theme }) => theme.colors.utility.white};
  padding: 16px 0;
  justify-content: center;
  align-items: center;

  ${Media.sm`
    column-gap: 100px;
    flex-direction: row;
  `}
`

const StyledStatInfo = styled(StatInfo)`
  margin-top: 1rem;
  color: black;

  &:first-of-type {
    margin-top: 0;
  }

  ${Media.sm`
    margin: 0;
  `}
`

const Statistics: FunctionComponent = () => (
  <Container>
    <StyledStatInfo showEthIcon stat="1200" title="EVL" />
    <StyledStatInfo stat="400" title="NFT Pools" />
    <StyledStatInfo showEthIcon stat="2.5" title="Rewards" />
  </Container>
)

export { Statistics }
