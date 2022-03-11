import React, { FunctionComponent, useRef, useState } from "react"
import { Exa, Button, ButtonType } from "abacus-ui"
import styled from "styled-components"
import { FlexEndColumn, StyledMiniList, WinnerImage } from "./Complete.styled"
import { TitleContainer, Description } from "../CurrentState.styled"
import useEarningsAndBalance from "./useEarningsAndBalance"
import WinnerModal from "./WinnerModal"

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
`

const StyledButton = styled(Button)`
  width: calc(50% - 8px);
`

const Winner: FunctionComponent = () => {
  const shownModalRef = useRef(false)
  const [modalOpen, setModalOpen] = useState(true)
  const { ethBalance, balanceUSD, ethEarnings, earningsUSD, abcEarnings } =
    useEarningsAndBalance()

  const closeModal = () => {
    setModalOpen(false)
    shownModalRef.current = true
  }

  return (
    <FlexEndColumn>
      <div style={{ textAlign: "center" }}>
        <WinnerImage alt="Pepe's Winning" src="/winner.png" />
        <TitleContainer style={{ textAlign: "center", marginTop: "12px" }}>
          <Exa style={{ fontFamily: "Bluu Next" }}>You're a winner!</Exa>
        </TitleContainer>
        <Description>Claim your reward for this appraisal 🎉</Description>
      </div>
      <StyledMiniList
        info={{
          Earnings: `${ethEarnings} ETH or ${abcEarnings} ABC ($${earningsUSD})`,
          "Abacus Balance": `${ethBalance} ETH ($${balanceUSD})`,
        }}
        isDark
      />
      <ButtonContainer>
        <StyledButton buttonType={ButtonType.Gray}>
          Claim {abcEarnings} ABC
        </StyledButton>
        <StyledButton>Claim {ethEarnings} ETH</StyledButton>
      </ButtonContainer>
      <WinnerModal
        isOpen={modalOpen && !shownModalRef.current}
        closeModal={closeModal}
      />
    </FlexEndColumn>
  )
}

export default Winner
