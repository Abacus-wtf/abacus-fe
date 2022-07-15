import { Title } from "@components/Title"
import { Giga, Section } from "abacus-ui"
import React, { FunctionComponent } from "react"

const EmptyState: FunctionComponent = () => (
  <Section>
    <Title>No Auction</Title>
    <Giga>No Auction has started for this pool</Giga>
  </Section>
)

export { EmptyState }
