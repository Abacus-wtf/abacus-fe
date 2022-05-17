import React, { useState } from "react"
import { InfoBarTitle, InfoBarItem, InfoBarContent } from "@components/index"
import { Media, Section, Select } from "abacus-ui"
import styled from "styled-components"

const StyledSection = styled(Section)`
  display: flex;
  flex-direction: column;
  padding: 12px;
  row-gap: 24px;

  ${Media.md`
    padding: 24px;
    flex-direction: row;
  `}
`

export const StyledInfoBarItem = styled(InfoBarItem)`
  flex: 1 0 auto;
`

export const StyledInfoBarContent = styled(InfoBarContent)`
  font-weight: 400;

  & span {
    color: ${({ theme }) => theme.colors.core[900]};
  }
`

const options = ["#1", "#2", "#3", "#4", "#5", "#6", "#7", "#8", "#9"]

const Epoch = () => {
  const [selectedEpoch, setSelectedEpoch] = useState(options[0])
  return (
    <StyledSection>
      <StyledInfoBarItem>
        <InfoBarTitle>Epoch</InfoBarTitle>
        <StyledInfoBarContent>
          <Select
            value={selectedEpoch}
            setValue={setSelectedEpoch}
            options={options}
          />
        </StyledInfoBarContent>
      </StyledInfoBarItem>
      <StyledInfoBarItem>
        <InfoBarTitle>Epoch Ending In</InfoBarTitle>
        <StyledInfoBarContent>21 d 32 m</StyledInfoBarContent>
      </StyledInfoBarItem>
      <StyledInfoBarItem>
        <InfoBarTitle>Epoch Range</InfoBarTitle>
        <StyledInfoBarContent>
          01/05/2022&nbsp;<span>to</span>&nbsp;14/05/2022
        </StyledInfoBarContent>
      </StyledInfoBarItem>
    </StyledSection>
  )
}

export { Epoch }
