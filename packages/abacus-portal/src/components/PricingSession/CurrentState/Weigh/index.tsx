import { useActiveWeb3React } from "@hooks/index"
import React, { FunctionComponent } from "react"
import { Exa, Kilo, AbacusIcon } from "abacus-ui"
import styled from "styled-components"
import { useOnWeightVote } from "@hooks/current-session"
import {
  useCurrentSessionData,
  useGetCurrentSessionData,
} from "@state/sessionData/hooks"
import {
  TitleContainer,
  Description,
  BottomButtonContainer,
  FullWidthButton,
} from "../CurrentState.styled"
import useParticipation from "../useParticipation"
import useVotesWeighted from "./useVotesWeighted"
import { InfoContainer, Info, InfoTitle } from "./Weigh.styled"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  gap: 40px;
`

const LoadingIconContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 16px;

  & svg {
    height: 40px;
    width: 40px;
  }
`

const Weigh: FunctionComponent = () => {
  const { account } = useActiveWeb3React()
  const { participation, setHasWeighed } = useParticipation()
  const currentSessionData = useCurrentSessionData()
  const getCurrentSessionData = useGetCurrentSessionData()

  const { onWeightVote, isPending } = useOnWeightVote()

  const weighVote = async () => {
    try {
      await onWeightVote(
        String(participation.appraisal),
        participation.password,
        () => {
          const { address, tokenId, nonce } = currentSessionData
          getCurrentSessionData(address, tokenId, nonce)
          setHasWeighed(true)
        }
      )
    } catch (e) {
      console.log(e)
    }
  }

  const notLoggedIn = !account
  const isParticipant = Boolean(participation)
  const votes = currentSessionData?.votes ?? null
  const votesWeighted = useVotesWeighted(votes)
  const isWeighing = votesWeighted > 0 || participation?.hasWeighed
  const notParticipant = !participation

  return (
    <Container>
      {isWeighing && !notParticipant && (
        <LoadingIconContainer>
          <AbacusIcon fill="black" />
        </LoadingIconContainer>
      )}
      <TitleContainer style={{ textAlign: "center" }}>
        <Exa style={{ fontFamily: "Bluu Next" }}>
          {isWeighing
            ? notParticipant
              ? "The submitted appraisals are being weighed..."
              : "Calculating appraisal"
            : "Ready for weighing!"}
        </Exa>
        <Description>
          {isWeighing
            ? notParticipant
              ? "Check back in after the countdown to see the final appraisal amount."
              : `Hang tight, ${votesWeighted} of ${votes.length} submissions have been weighed`
            : "Your appraisal has reached completion. Start weighing everyones appraisal to continue."}
        </Description>
      </TitleContainer>

      {isWeighing ? (
        notParticipant ? null : (
          <InfoContainer>
            <Info>
              <InfoTitle>
                {currentSessionData?.finalAppraisalValue ?? 0} ETH
              </InfoTitle>
              <Kilo>Appraisal</Kilo>
            </Info>
            <Info>
              <InfoTitle>{votesWeighted}</InfoTitle>
              <Kilo>Votes</Kilo>
            </Info>
          </InfoContainer>
        )
      ) : (
        <BottomButtonContainer>
          <TitleContainer style={{ flexDirection: "row" }}>
            <FullWidthButton
              onClick={weighVote}
              disabled={notLoggedIn || isPending || !isParticipant}
            >
              {isPending ? "Submitting" : "Start weighing"}
            </FullWidthButton>
          </TitleContainer>
        </BottomButtonContainer>
      )}
    </Container>
  )
}

export default Weigh
