import { Exa, Giga, Section } from "abacus-ui"
import React, { FunctionComponent } from "react"
import styled from "styled-components"

const Title = styled(Exa)`
  font-family: "Bluu next";
  font-weight: bold;
`

const EmptyState: FunctionComponent = () => (
  <Section>
    <Title>No Auction</Title>
    <Giga>No Auction has started for this pool</Giga>
  </Section>
)

export { EmptyState }
