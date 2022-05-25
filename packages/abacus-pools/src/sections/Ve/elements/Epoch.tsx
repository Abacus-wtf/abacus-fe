import React, { useState } from "react"
import { InfoBarTitle } from "@components/index"
import { Media, Section, Select } from "abacus-ui"
import styled from "styled-components"
import { StyledInfoBarContent, StyledInfoBarItem } from "./Ve.styles"

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
          01/05/2022 <span>to</span> 14/05/2022
        </StyledInfoBarContent>
      </StyledInfoBarItem>
    </StyledSection>
  )
}

export { Epoch }
