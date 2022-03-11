import React, { FunctionComponent } from "react"
import { Button, Exa, Modal } from "abacus-ui"
import styled from "styled-components"
import { useCurrentSessionData } from "@state/sessionData/hooks"
import {
  Container,
  LeftHalf,
  RightHalf,
  Image,
} from "../../PricingSession.styled"
import { FlexEndColumn, StyledMiniList, WinnerImage } from "./Complete.styled"
import { TitleContainer, Description } from "../CurrentState.styled"

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
                "Your appraisal": `Howoooow`,
                Stake: `Blabidybloop`,
              }}
              isDark
            />
            <ClaimButton>Claim {1} ETH</ClaimButton>
          </FlexEndColumn>
        </RightHalf>
      </Container>
    </Modal>
  )
}

export default WinnerModal
