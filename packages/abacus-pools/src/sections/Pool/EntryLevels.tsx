import { useEntryLevels } from "@state/singlePoolData/hooks"
import { ProgressBar, Section } from "abacus-ui"
import React, { FunctionComponent } from "react"
import { SectionHeader, SectionTitle } from "./Pool.styled"

const EntryLevels: FunctionComponent = () => {
  const entryLevels = useEntryLevels()

  console.log("entryLevels", entryLevels)

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Entry Levels</SectionTitle>
      </SectionHeader>
      {entryLevels.map((entryLevel) => {
        const progress = entryLevel.amount / 1000
        return (
          <ProgressBar
            key={entryLevel.ticketNumber}
            progress={progress}
            label={`%${progress * 100} Full / 2ETH Left`}
          />
        )
      })}
    </Section>
  )
}
export default EntryLevels
