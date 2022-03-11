import React, { FunctionComponent, useRef, useState } from "react"
import { Exa, Button, ButtonType } from "abacus-ui"
import styled from "styled-components"
import { useOnClaimPayout } from "@hooks/claim-pool"
import { useClaimPayoutData } from "@state/miscData/hooks"
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
  const claimData = useClaimPayoutData()
  const { onClaim, isPending } = useOnClaimPayout()
  const [modalOpen, setModalOpen] = useState(true)
  const { ethBalance, balanceUSD, ethEarnings, earningsUSD, abcEarnings } =
    useEarningsAndBalance()

  const closeModal = () => {
    setModalOpen(false)
    shownModalRef.current = true
  }

  const claimEth = () => onClaim(true, String(claimData.ethPayout))
  const claimAbc = () => onClaim(false, String(claimData.abcPayout))

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
        <StyledButton
          buttonType={ButtonType.Gray}
          onClick={claimAbc}
          disabled={isPending}
        >
          Claim {abcEarnings} ABC
        </StyledButton>
        <StyledButton onClick={claimEth} disabled={isPending}>
          Claim {ethEarnings} ETH
        </StyledButton>
      </ButtonContainer>
      <WinnerModal
        isOpen={modalOpen && !shownModalRef.current}
        closeModal={closeModal}
      />
    </FlexEndColumn>
  )
}

export default Winner
