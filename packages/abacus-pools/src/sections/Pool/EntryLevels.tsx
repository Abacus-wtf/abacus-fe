import { useEntryLevels } from "@state/singlePoolData/hooks"
import { ProgressBar, Section } from "abacus-ui"
import React, { FunctionComponent, useState } from "react"
import styled from "styled-components"
import { SectionHeader, SectionTitle } from "./Pool.styled"

const EntryLevelsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;
  row-gap: 16px;
`

const EntryLevelWrapper = styled.div`
  display: flex;
  column-gap: 8px;
`

const TicketNumber = styled.div`
  padding: 10px;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  aspect-ratio: 1 / 1;
  height: 100%;
`

const ProgressLabel = styled.div`
  padding: 10px;
  color: ${({ theme }) => theme.colors.core[900]};

  & span {
    color: ${({ theme }) => theme.colors.core.primary};
  }
`

const StyledProgressBar = styled(ProgressBar)`
  width: 100%;
`

const EntryLevels: FunctionComponent = () => {
  const [visibleLevels] = useState(3)
  const entryLevels = useEntryLevels()

  console.log("entryLevels", entryLevels)

  const visibleEntryLevels: typeof entryLevels = entryLevels.reduce(
    (acc, entryLevel, i) => (i < visibleLevels ? [...acc, entryLevel] : acc),
    []
  )

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Entry Levels</SectionTitle>
      </SectionHeader>
      <EntryLevelsWrapper>
        {visibleEntryLevels.map((entryLevel) => {
          const progress = entryLevel.amount / 1000
          return (
            <EntryLevelWrapper key={entryLevel.ticketNumber}>
              <TicketNumber>{entryLevel.ticketNumber}</TicketNumber>
              <StyledProgressBar
                progress={progress}
                label={
                  <ProgressLabel>
                    <span>{progress * 100}</span> % filled / <span>2</span> ETH
                    left
                  </ProgressLabel>
                }
              />
            </EntryLevelWrapper>
          )
        })}
      </EntryLevelsWrapper>
    </Section>
  )
}
export default EntryLevels
