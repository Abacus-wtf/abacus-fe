import { useActiveWeb3React } from "@hooks/index"
import React, { FunctionComponent } from "react"
import { Exa, Kilo, Loader } from "abacus-ui"
import { useOnWeightVote } from "@hooks/current-session"
import {
  useCanUserInteract,
  useCurrentSessionData,
  useGetCurrentSessionData,
} from "@state/sessionData/hooks"
import { useEthToUSD } from "@state/application/hooks"
import {
  TitleContainer,
  Description,
  BottomButtonContainer,
  FullWidthButton,
  VerticallyCenteredContainer,
  LoadingIconContainer,
} from "../CurrentState.styled"
import useParticipation from "../useParticipation"
import useVotesWeighted from "./useVotesWeighted"
import { InfoContainer, Info, InfoTitle } from "./Weigh.styled"

const Weigh: FunctionComponent = () => {
  const { account } = useActiveWeb3React()
  const { participation, setHasWeighted } = useParticipation()
  const canUserInteract = useCanUserInteract()
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
          setHasWeighted(true)
        }
      )
    } catch (e) {
      // console.log(e)
    }
  }

  const notLoggedIn = !account
  const isParticipant = Boolean(participation)
  const votes = currentSessionData?.votes ?? null
  const { votesWeighted, hasUserWeighed } = useVotesWeighted(votes)
  const isWeighing = votesWeighted > 0
  const canInteract = useCanUserInteract()
  const finalAppraisalUSD = useEthToUSD(currentSessionData?.finalAppraisalValue)

  return (
    <VerticallyCenteredContainer>
      {isWeighing && canUserInteract && (
        <LoadingIconContainer>
          <Loader />
        </LoadingIconContainer>
      )}
      <TitleContainer style={{ textAlign: "center" }}>
        <Exa style={{ fontFamily: "Bluu Next" }}>
          {isWeighing
            ? !canUserInteract
              ? "The submitted appraisals are being weighed..."
              : "Calculating appraisal"
            : "Ready for weighing!"}
        </Exa>
        <Description>
          {isWeighing
            ? !canUserInteract
              ? "Check back in after the countdown to see the final appraisal amount."
              : `Hang tight, ${votesWeighted} of ${votes.length} submissions have been weighed`
            : "Your appraisal has reached completion. Start weighing everyones appraisal to continue."}
        </Description>
      </TitleContainer>

      {isWeighing ? (
        !canUserInteract ? null : (
          <InfoContainer>
            <Info>
              <InfoTitle>
                {currentSessionData?.finalAppraisalValue ?? 0} ETH ($
                {finalAppraisalUSD})
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
              disabled={
                notLoggedIn ||
                isPending ||
                !isParticipant ||
                hasUserWeighed ||
                !canInteract
              }
            >
              {isPending ? "Submitting" : "Start weighing"}
            </FullWidthButton>
          </TitleContainer>
        </BottomButtonContainer>
      )}
    </VerticallyCenteredContainer>
  )
}

export default Weigh
