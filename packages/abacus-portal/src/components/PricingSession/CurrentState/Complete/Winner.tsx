import React, { FunctionComponent, useState } from "react"
import { Exa, Button, ButtonType, MiniList } from "abacus-ui"
import styled from "styled-components"
import { useOnClaimPayout } from "@hooks/claim-pool"
import { useClaimPayoutData } from "@state/miscData/hooks"
import { FlexEndColumn, WinnerImage } from "./Complete.styled"
import { TitleContainer, Description } from "../CurrentState.styled"
import useEarningsAndBalance from "./useEarningsAndBalance"
import WinnerModal from "./WinnerModal"
import useHasSeenWinnerModal from "./useHasSeenWinnerModal"
import Claimed from "./Claimed"

export const StyledMiniList = styled(MiniList)<{ noClaim: boolean }>`
  width: 100%;
  margin-bottom: ${({ noClaim }) => (noClaim ? "16px" : "0")};
`

const ButtonContainer = styled.div<{ noClaim: boolean }>`
  display: ${({ noClaim }) => (noClaim ? "none" : "flex")};
  justify-content: center;
  gap: 16px;
  width: 100%;
`

const StyledButton = styled(Button)`
  width: calc(50% - 8px);
`

const Winner: FunctionComponent = () => {
  const claimData = useClaimPayoutData()
  const { onClaim, isPending } = useOnClaimPayout()
  const [hasClaimed, setHasClaimed] = useState("")
  const [modalOpen, setModalOpen] = useState(true)
  const { ethBalance, balanceUSD, ethEarnings, earningsUSD, abcEarnings } =
    useEarningsAndBalance()
  const { setHasSeenWinnerModal } = useHasSeenWinnerModal()

  const closeModal = () => {
    setModalOpen(false)
    setHasSeenWinnerModal()
  }

  const claimEth = () => {
    onClaim(true, String(claimData.ethPayout))
    setHasClaimed(`${String(claimData.ethPayout)} ETH`)
  }
  const claimAbc = () => {
    onClaim(false, String(claimData.abcPayout))
    setHasClaimed(`${String(claimData.abcPayout)} ABC`)
  }

  if (!isPending && hasClaimed) {
    return <Claimed claimed={hasClaimed} />
  }

  const claimZero = ethEarnings === 0

  return (
    <FlexEndColumn>
      <div style={{ textAlign: "center" }}>
        <WinnerImage alt="Pepe's Winning" src="/winner.png" />
        <TitleContainer style={{ textAlign: "center", marginTop: "12px" }}>
          <Exa style={{ fontFamily: "Bluu Next" }}>You're a winner!</Exa>
        </TitleContainer>
        <Description>
          {claimZero
            ? "Looks like you've already claimed earnings 🎉"
            : "Claim your reward for this appraisal 🎉"}
        </Description>
      </div>
      <StyledMiniList
        noClaim={claimZero}
        info={{
          Claim: `${ethEarnings} ETH or ${abcEarnings} ABC ($${earningsUSD})`,
          "Abacus Balance": `${ethBalance} ETH ($${balanceUSD})`,
        }}
        isDark
      />
      <ButtonContainer noClaim={claimZero}>
        <StyledButton
          buttonType={ButtonType.Gray}
          onClick={claimAbc}
          disabled={isPending || claimZero}
        >
          Claim {abcEarnings} ABC
        </StyledButton>
        <StyledButton onClick={claimEth} disabled={isPending || claimZero}>
          Claim {ethEarnings} ETH
        </StyledButton>
      </ButtonContainer>
      <WinnerModal
        isOpen={modalOpen}
        closeModal={closeModal}
        claimEth={claimEth}
      />
    </FlexEndColumn>
  )
}

export default Winner
