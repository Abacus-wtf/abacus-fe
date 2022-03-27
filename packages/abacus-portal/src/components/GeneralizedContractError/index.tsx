import { useGeneralizedContractError } from "@state/application/hooks"
import React, { FunctionComponent, useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import {
  PersistentBanner,
  Close,
  Button,
  ButtonType,
  VisuallyHidden,
  Media,
} from "abacus-ui"

const SlideUpThenDisappear = keyframes`
  0% {
    bottom: -100%
  }
  100% {
    bottom: 0%
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const CloseButton = styled(Button)`
  align-self: flex-end;
`

const StyledPersistentBanner = styled(PersistentBanner)`
  bottom: -100%;
  animation: ${SlideUpThenDisappear} 1s forwards;
`

const Message = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  ${Media.sm`
    flex-direction: row;
  `}
`

const GeneralizedContractError: FunctionComponent = () => {
  const txError = useGeneralizedContractError()
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (txError) {
      setDismissed(false)
    }
  }, [txError])

  if (!txError || dismissed) {
    return null
  }

  return (
    <StyledPersistentBanner type="error">
      <Container>
        <CloseButton
          buttonType={ButtonType.Clear}
          onClick={() => setDismissed(true)}
        >
          <Close />
          <VisuallyHidden>Close Error Banner</VisuallyHidden>
        </CloseButton>
        <Message>{txError}</Message>
      </Container>
    </StyledPersistentBanner>
  )
}

export default GeneralizedContractError
