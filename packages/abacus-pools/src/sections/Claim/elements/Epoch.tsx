import React from "react"
import { InfoBarTitle } from "@components/index"
import { Button, ButtonType, DownChevron } from "abacus-ui"
import {
  StyledSection,
  StyledInfoBarContent,
  StyledInfoBarItem,
} from "../Claim.styles"

const Epoch = () => (
  <StyledSection>
    <StyledInfoBarItem>
      <InfoBarTitle>Epoch</InfoBarTitle>
      <StyledInfoBarContent>
        <Button buttonType={ButtonType.Gray}>
          #1 <DownChevron />
        </Button>
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

export { Epoch }
