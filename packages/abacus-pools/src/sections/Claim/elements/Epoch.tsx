import React, { useState } from "react"
import { InfoBarTitle } from "@components/index"
import { Select } from "abacus-ui"
import {
  StyledSection,
  StyledInfoBarContent,
  StyledInfoBarItem,
} from "../Claim.styles"

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
