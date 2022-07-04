import React from "react"
import { InfoBarTitle } from "@components/index"
import { Button, ButtonType, Media } from "abacus-ui"
import styled from "styled-components"
import {
  StyledSection,
  StyledInfoBarContent,
  StyledInfoBarItem,
} from "../../Claim.styles"

const ButtonContainer = styled(StyledInfoBarItem)`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  ${Media.md`
    height: 100%;
  `}
`

type CreditsProps = {
  abcEmissions: number
  userCredits: number
  claimableAbc: number
  claimAbc: () => void
}

const Emissions = ({
  abcEmissions,
  userCredits,
  claimableAbc,
  claimAbc,
}: CreditsProps) => {
  const hasClaimableAbc = userCredits > 0
  return (
    <StyledSection>
      <StyledInfoBarItem>
        <InfoBarTitle>ABC Emissions</InfoBarTitle>
        <StyledInfoBarContent>{abcEmissions} ABC</StyledInfoBarContent>
      </StyledInfoBarItem>
      <StyledInfoBarItem>
        <InfoBarTitle>ABC Credits Stored</InfoBarTitle>
        <StyledInfoBarContent>{userCredits}</StyledInfoBarContent>
      </StyledInfoBarItem>
      <StyledInfoBarItem>
        <InfoBarTitle>Claimable ABC Credits</InfoBarTitle>
        <StyledInfoBarContent>{claimableAbc}</StyledInfoBarContent>
      </StyledInfoBarItem>
      <ButtonContainer>
        <Button
          buttonType={ButtonType.Standard}
          onClick={claimAbc}
          disabled={!hasClaimableAbc}
        >
          Claim Credits
        </Button>
      </ButtonContainer>
    </StyledSection>
  )
}

export { Emissions }
