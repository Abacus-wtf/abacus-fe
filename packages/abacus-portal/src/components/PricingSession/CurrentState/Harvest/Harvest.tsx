import React, { FunctionComponent, useEffect, useState } from "react"
import styled from "styled-components"
import { Loader, Exa, P } from "abacus-ui"
import {
  useCanUserInteract,
  useCurrentSessionData,
  useGetCurrentSessionData,
} from "@state/sessionData/hooks"
import { useActiveWeb3React } from "@hooks/index"
import { useOnHarvest } from "@hooks/current-session"
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

const Harvest: FunctionComponent = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const { account } = useActiveWeb3React()
  const canUserInteract = useCanUserInteract()
  const currentSessionData = useCurrentSessionData()
  const getCurrentSessionData = useGetCurrentSessionData()
  const { onHarvest, isPending, txError } = useOnHarvest()

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
      await onHarvest(() => getCurrentSessionData(address, tokenId, nonce))
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
          {isPending ? "Harvesting..." : "Ready to Harvest!"}
        </Exa>
        <Description>
          {isPending
            ? "The page should refresh when the tx is complete. If not, try refreshing manually."
            : "Final Appraisals have been set. Be the one to Harvest, and get subsidized by the keepers tax!."}
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
            {isPending ? "Submitting" : "Harvest"}
          </FullWidthButton>
        </TitleContainer>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </BottomButtonContainer>
    </VerticallyCenteredContainer>
  )
}

export default Harvest
