import React, { FunctionComponent, useEffect, useState } from "react"
import styled from "styled-components"
import { Loader, Exa, P } from "abacus-ui"
import {
  useCanUserInteract,
  useCurrentSessionData,
  useGetCurrentSessionData,
} from "@state/sessionData/hooks"
import { useActiveWeb3React } from "@hooks/index"
import { useOnSetFinalAppraisal } from "@hooks/current-session"
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

const SetFinalAppraisal: FunctionComponent = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const { account } = useActiveWeb3React()
  const canUserInteract = useCanUserInteract()
  const currentSessionData = useCurrentSessionData()
  const getCurrentSessionData = useGetCurrentSessionData()
  const { onSetFinalAppraisal, isPending, txError } = useOnSetFinalAppraisal()

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
      await onSetFinalAppraisal(() =>
        getCurrentSessionData(address, tokenId, nonce)
      )
    } catch (e) {
      // console.log("oh hey", e)
    }
  }

  const notLoggedIn = !account

  return (
    <VerticallyCenteredContainer>
      {isPending && (
        <LoadingIconContainer>
          <Loader />
        </LoadingIconContainer>
      )}
      <TitleContainer style={{ textAlign: "center" }}>
        <Exa style={{ fontFamily: "Bluu Next" }}>
          {isPending
            ? "Setting Final Appraisals..."
            : "Ready to Set Final Appraisals!"}
        </Exa>
        <Description>
          {isPending
            ? "The page should refresh when the tx is complete. If not, try refreshing manually."
            : "All the votes have been weighted. Be the one to Set Final Appraisals, and get subsidized by the keepers tax!."}
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
            {isPending ? "Submitting" : "Set Final Appraisal"}
          </FullWidthButton>
        </TitleContainer>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </BottomButtonContainer>
    </VerticallyCenteredContainer>
  )
}

export default SetFinalAppraisal
