import React, { FunctionComponent } from "react"
import { Button, Exa, Modal } from "abacus-ui"
import styled from "styled-components"
import { useCurrentSessionData } from "@state/sessionData/hooks"
import { useOnClaimPayout } from "@hooks/claim-pool"
import { useClaimPayoutData } from "@state/miscData/hooks"
import { Vote } from "@state/sessionData/reducer"
import { round2Decimals } from "utils"
import { useEthToUSD } from "@state/application/hooks"
import {
  Container,
  LeftHalf,
  RightHalf,
  Image,
} from "../../PricingSession.styled"
import { FlexEndColumn, StyledMiniList, WinnerImage } from "./Complete.styled"
import { TitleContainer, Description } from "../CurrentState.styled"
import useEarningsAndBalance from "./useEarningsAndBalance"
import useUserRanking from "./useUserRanking"

type WinnerModalProps = {
  isOpen: boolean
  closeModal: () => void
}

const ClaimButton = styled(Button)`
  width: 100%;
`

const WinnerModal: FunctionComponent<WinnerModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const sessionData = useCurrentSessionData()
  const claimData = useClaimPayoutData()
  const { onClaim, isPending } = useOnClaimPayout()
  const claimEth = () => onClaim(true, String(claimData.ethPayout))
  const { ethEarnings } = useEarningsAndBalance()
  const userRanking = useUserRanking()
  const appraisalEth = round2Decimals(Number(userRanking?.appraisal))
  const appraisalUSD = useEthToUSD(appraisalEth)
  const stakeEth = round2Decimals(Number(userRanking?.amountStaked))
  const stakeUSD = useEthToUSD(stakeEth)

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Container>
        <LeftHalf>
          <Image src={sessionData.image_url} alt={sessionData.nftName} />
        </LeftHalf>
        <RightHalf>
          <FlexEndColumn>
            <div style={{ textAlign: "center" }}>
              <WinnerImage alt="Pepe's Winning" src="/winner.png" />
              <TitleContainer
                style={{ textAlign: "center", marginTop: "12px" }}
              >
                <Exa style={{ fontFamily: "Bluu Next" }}>You're a winner!</Exa>
              </TitleContainer>
              <Description>Claim your reward for this appraisal 🎉</Description>
            </div>
            <StyledMiniList
              info={{
                "Your appraisal": `${appraisalEth} ETH ($${appraisalUSD})`,
                Stake: `${stakeEth} ETH ($${stakeUSD})`,
              }}
              isDark
            />
            <ClaimButton claimEth={claimEth} disabled={isPending}>
              Claim {ethEarnings} ETH
            </ClaimButton>
          </FlexEndColumn>
        </RightHalf>
      </Container>
    </Modal>
  )
}

export default WinnerModal
