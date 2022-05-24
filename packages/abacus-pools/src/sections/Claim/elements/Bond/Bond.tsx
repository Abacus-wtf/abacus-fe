import React, { useState } from "react"
import { InfoBarTitle } from "@components/index"
import { Button, ButtonType, Input, Media } from "abacus-ui"
import styled from "styled-components"
import {
  StyledSection,
  StyledInfoBarContent,
  StyledInfoBarItem,
} from "../../Claim.styles"
import { useBondData } from "./useBondData"

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
  const [bondAmount, setBondAmount] = useState("")
  const {
    ethBalance,
    getBondedAmount,
    onBond,
    isPendingBond,
    abcBonded,
    currentEpoch,
  } = useBondData()
  const handleBond = () => onBond(bondAmount, () => getBondedAmount())

  const setMax = () => setBondAmount(ethBalance)

  return (
    <StyledSection>
      <StyledInfoBarItem>
        <InfoBarTitle>Epoch</InfoBarTitle>
        <StyledInfoBarContent>#{currentEpoch}</StyledInfoBarContent>
      </StyledInfoBarItem>
      <StyledInfoBarItem>
        <InfoBarTitle>ETH Bonded</InfoBarTitle>
        <StyledInfoBarContent>{abcBonded ?? "-"} ETH</StyledInfoBarContent>
        <InfoBarTitle>For Epoch #{currentEpoch + 1}</InfoBarTitle>
      </StyledInfoBarItem>
      <StyledInfoBarItem>
        <InfoBarTitle>ETH amount you want bond </InfoBarTitle>
        <StyledInfoBarContent>
          <Input
            type="number"
            name="bond_eth"
            value={bondAmount}
            onChange={setBondAmount}
            placeholder="0.00"
            pill={<MaxButton onClick={setMax}>Max</MaxButton>}
          />
        </StyledInfoBarContent>
      </StyledInfoBarItem>
      <ButtonContainer>
        <Button
          buttonType={ButtonType.Standard}
          onClick={handleBond}
          disabled={isPendingBond}
        >
          {isPendingBond ? "tx Pending" : "Bond Eth"}
        </Button>
      </ButtonContainer>
    </StyledSection>
  )
}

export { Bond }
