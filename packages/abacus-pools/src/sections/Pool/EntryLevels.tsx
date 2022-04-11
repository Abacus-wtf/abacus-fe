import { Section } from "abacus-ui"
import React, { FunctionComponent } from "react"
import { SectionHeader, SectionTitle } from "./Pool.styled"

const EntryLevels: FunctionComponent = () => (
  <Section>
    <SectionHeader>
      <SectionTitle>Entry Levels</SectionTitle>
    </SectionHeader>
    <div style={{ height: "130px" }} />
  </Section>
)

export default EntryLevels
