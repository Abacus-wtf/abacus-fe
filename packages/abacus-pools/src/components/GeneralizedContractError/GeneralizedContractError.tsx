import {
  useGeneralizedContractError,
  useSetGeneralizedContractError,
} from "@state/application/hooks"
import React, { FunctionComponent } from "react"
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
  position: relative;
  align-items: flex-start;
  justify-content: center;
  padding: 8px;
`

const CloseButton = styled(Button)`
  position: absolute;
  padding: 8px;
  right: 0;
  top: 0;
`

const StyledPersistentBanner = styled(PersistentBanner)`
  bottom: -100%;
  animation: ${SlideUpThenDisappear} 1s forwards;
`

const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding-right: 30px;

  ${Media.sm`
    flex-direction: row;
  `}
`

const GeneralizedContractError: FunctionComponent = () => {
  const txError = useGeneralizedContractError()
  const setGeneralizedContractError = useSetGeneralizedContractError()

  const dismiss = () => {
    setGeneralizedContractError(null)
  }

  if (!txError) {
    return null
  }

  return (
    <StyledPersistentBanner type="error">
      <Container>
        <CloseButton buttonType={ButtonType.Clear} onClick={dismiss}>
          <Close stroke="#FFF" />
          <VisuallyHidden>Close Error Banner</VisuallyHidden>
        </CloseButton>
        <Message>{txError}</Message>
      </Container>
    </StyledPersistentBanner>
  )
}

export default GeneralizedContractError
