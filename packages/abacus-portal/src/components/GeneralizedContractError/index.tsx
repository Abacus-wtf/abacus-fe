import { useGeneralizedContractError } from "@state/application/hooks"
import React, { FunctionComponent } from "react"
import styled, { keyframes } from "styled-components"
import { PersistentBanner } from "abacus-ui"

const SlideUpThenDisappear = keyframes`
  0% {
    bottom: -100%
  }
  100% {
    bottom: 0%
  }
`

const StyledPersistentBanner = styled(PersistentBanner)`
  bottom: -100%;
  animation: ${SlideUpThenDisappear} 1s forwards;
`

const GeneralizedContractError: FunctionComponent = () => {
  const txError = useGeneralizedContractError()

  if (!txError) {
    return null
  }

  return <StyledPersistentBanner type="error">{txError}</StyledPersistentBanner>
}

export default GeneralizedContractError
