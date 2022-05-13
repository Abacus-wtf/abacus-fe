import React, { useState } from "react"
import { InfoBarTitle } from "@components/index"
import { Button, ButtonType, DownChevron, Input, Media } from "abacus-ui"
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

const MaxButton = styled(Button)`
  padding: 9px 20px;
`

const Bond = () => {
  const [eth, setEth] = useState("")
  return (
    <StyledSection>
      <StyledInfoBarItem>
        <InfoBarTitle>Epoch</InfoBarTitle>
        <Button buttonType={ButtonType.Gray}>
          #1 <DownChevron />
        </Button>
      </StyledInfoBarItem>
      <StyledInfoBarItem>
        <InfoBarTitle>ABC Bonded</InfoBarTitle>
        <StyledInfoBarContent>26,000.00</StyledInfoBarContent>
      </StyledInfoBarItem>
      <StyledInfoBarItem>
        <InfoBarTitle>ETH amount you want bond </InfoBarTitle>
        <StyledInfoBarContent>
          <Input
            type="number"
            name="bond_eth"
            value={eth}
            onChange={setEth}
            placeholder="0.00"
            pill={<MaxButton>Max</MaxButton>}
          />
        </StyledInfoBarContent>
      </StyledInfoBarItem>
      <ButtonContainer>
        <Button buttonType={ButtonType.Standard}>Bond Eth</Button>
      </ButtonContainer>
    </StyledSection>
  )
}

export { Bond }
