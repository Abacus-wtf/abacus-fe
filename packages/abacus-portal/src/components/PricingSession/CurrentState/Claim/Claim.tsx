import React, { FunctionComponent, useEffect, useState } from "react"
import styled from "styled-components"
import { AbacusIcon, Exa, P } from "abacus-ui"
import {
  useCanUserInteract,
  useCurrentSessionData,
  useGetCurrentSessionData,
} from "@state/sessionData/hooks"
import { useActiveWeb3React } from "@hooks/index"
import { useOnClaim } from "@hooks/current-session"
import {
  TitleContainer,
  Description,
  BottomButtonContainer,
  FullWidthButton,
  VerticallyCenteredContainer,
  LoadingIconContainer,
} from "../CurrentState.styled"

const ErrorMessage = styled(P)`
  color: ${({ theme }) => theme.colors.utility.red};
`

const Claim: FunctionComponent = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const { account } = useActiveWeb3React()
  const canUserInteract = useCanUserInteract()
  const currentSessionData = useCurrentSessionData()
  const getCurrentSessionData = useGetCurrentSessionData()
  const { onClaim, isPending, txError } = useOnClaim()

  useEffect(() => {
    if (txError) {
      setErrorMessage(
        "It's possible that someone else already triggered this txn. Try waiting a moment and refreshing the page."
      )
    }
  }, [txError])

  const setFinalAppraisal = async () => {
    try {
      const { address, tokenId, nonce } = currentSessionData
      await onClaim(() => getCurrentSessionData(address, tokenId, nonce))
    } catch (e) {
      // console.log("oh hey", e)
    }
  }

  const notLoggedIn = !account

  return (
    <VerticallyCenteredContainer>
      {isPending && (
        <LoadingIconContainer>
          <AbacusIcon fill="black" />
        </LoadingIconContainer>
      )}
      <TitleContainer style={{ textAlign: "center" }}>
        <Exa style={{ fontFamily: "Bluu Next" }}>
          {isPending ? "Claim pending..." : "Ready to Claim!"}
        </Exa>
        <Description>
          {isPending
            ? "The page should refresh when the tx is complete. If not, try refreshing manually."
            : "All the votes have been harvested. Be the one to Claim, and get subsidized by the keepers tax!."}
        </Description>
      </TitleContainer>
      <BottomButtonContainer style={{ marginTop: "40px" }}>
        <TitleContainer style={{ flexDirection: "row" }}>
          <FullWidthButton
            onClick={setFinalAppraisal}
            disabled={
              notLoggedIn || isPending || !canUserInteract || errorMessage
            }
          >
            {isPending ? "Submitting" : "Claim"}
          </FullWidthButton>
        </TitleContainer>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </BottomButtonContainer>
    </VerticallyCenteredContainer>
  )
}

export default Claim
