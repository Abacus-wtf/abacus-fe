import React from "react"
import { InfoBarTitle } from "@components/index"
import { Button, ButtonType, Media } from "abacus-ui"
import styled from "styled-components"
import {
  StyledSection,
  StyledInfoBarContent,
  StyledInfoBarItem,
} from "../Claim.styles"

const ButtonContainer = styled(StyledInfoBarItem)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  ${Media.md`
    height: 100%;
  `}
`

const Credits = () => (
  <StyledSection>
    <StyledInfoBarItem>
      <InfoBarTitle>ABC Emissions</InfoBarTitle>
      <StyledInfoBarContent>26,900,000.00</StyledInfoBarContent>
    </StyledInfoBarItem>
    <StyledInfoBarItem>
      <InfoBarTitle>ABC Credits Stored</InfoBarTitle>
      <StyledInfoBarContent>56,400.00</StyledInfoBarContent>
    </StyledInfoBarItem>
    <StyledInfoBarItem>
      <InfoBarTitle>Claimable ABC Credits</InfoBarTitle>
      <StyledInfoBarContent>
        Credits Claimed or No Credits Earned This Epoch.
      </StyledInfoBarContent>
    </StyledInfoBarItem>
    <ButtonContainer>
      <Button buttonType={ButtonType.Standard}>Claim Credits</Button>
    </ButtonContainer>
  </StyledSection>
)

export { Credits }
