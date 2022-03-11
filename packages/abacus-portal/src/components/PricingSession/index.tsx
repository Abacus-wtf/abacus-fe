import { SessionState } from "@models/SessionState"
import { useCurrentSessionStatus } from "@state/sessionData/hooks"
import { Section, SessionCountdown, Media } from "abacus-ui"
import React, { FunctionComponent } from "react"
import styled from "styled-components"
import CurrentState from "./CurrentState"

const Container = styled.div`
  display: grid;

  ${Media.sm`
    grid-template-columns: 45% 55%;
  `}
`

const LeftHalf = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-gap: 20px;

  ${Media.lg`
    padding: 28px 64px;
  `}
`

const RightHalf = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 20px;
  padding: 20px 0;

  ${Media.sm`
    padding: 8px;
    padding-top: 0px;
    padding-left: 28px;
  `}

  ${Media.lg`
    padding-top: 22px;
  `}
`

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: ${({ theme }) => theme.borderRadius.main};
`

const CountdownContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

type PricingSessionProps = {
  nftSrc: string
  endTime: number
  openDepositModal: () => void
  getCurrentSessionData: () => void
}

const PricingSession: FunctionComponent<PricingSessionProps> = ({
  nftSrc,
  endTime,
  openDepositModal,
  getCurrentSessionData,
}) => {
  const currentSessionStatus = useCurrentSessionStatus()
  return (
    <Section>
      <Container>
        <LeftHalf>
          <Image src={nftSrc} />
          {currentSessionStatus > -1 &&
            currentSessionStatus <= SessionState.Weigh && (
              <CountdownContainer>
                <SessionCountdown
                  endTime={endTime}
                  onComplete={getCurrentSessionData}
                />
              </CountdownContainer>
            )}
        </LeftHalf>
        <RightHalf>
          <CurrentState openDepositModal={openDepositModal} />
        </RightHalf>
      </Container>
    </Section>
  )
}

export default PricingSession
