import { PromiseStatus } from "@models/PromiseStatus"
import { SessionState } from "@models/SessionState"
import {
  useCurrentSessionFetchStatus,
  useCurrentSessionStatus,
} from "@state/sessionData/hooks"
import { Section, SessionCountdown, LoadingShimmer } from "abacus-ui"
import React, { FunctionComponent } from "react"
import styled from "styled-components"
import CurrentState from "./CurrentState"
import {
  Container,
  LeftHalf,
  ImagePlaceholder,
  Image,
  RightHalf,
} from "./PricingSession.styled"

const CountdownContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`

type PricingSessionProps = {
  nftSrc: string
  nftName: string
  endTime: number
  openDepositModal: () => void
  getCurrentSessionData: () => void
}

const PricingSession: FunctionComponent<PricingSessionProps> = ({
  nftSrc,
  nftName,
  endTime,
  openDepositModal,
  getCurrentSessionData,
}) => {
  const currentSessionStatus = useCurrentSessionStatus()
  const currentSessionFetchStatus = useCurrentSessionFetchStatus()

  const isLoading = currentSessionFetchStatus === PromiseStatus.Pending
  return (
    <Section>
      <Container>
        <LeftHalf>
          {isLoading ? (
            <LoadingShimmer>
              <ImagePlaceholder />
            </LoadingShimmer>
          ) : (
            <Image src={nftSrc} alt={nftName} />
          )}
          {currentSessionStatus > -1 &&
            currentSessionStatus <= SessionState.Weigh && (
              <CountdownContainer>
                <SessionCountdown
                  loading={isLoading}
                  endTime={endTime}
                  onComplete={getCurrentSessionData}
                />
              </CountdownContainer>
            )}
        </LeftHalf>
        <RightHalf>
          <CurrentState
            openDepositModal={openDepositModal}
            isLoading={isLoading}
          />
        </RightHalf>
      </Container>
    </Section>
  )
}

export default PricingSession
