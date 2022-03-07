import React, { FunctionComponent, useState } from "react"
import styled, { keyframes } from "styled-components"
import { Button, ButtonType } from "abacus-ui"
import useParticipation from "../useParticipation"

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.colors.utility.blue};
  padding: 4px;
  display: inline-block;
`

const FadeOut = keyframes`
  0% {
    opacity: 100%;
  }
  100% {
    opacity: 0%;
  }
`

const SuccessMessage = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  font-weight: bold;
  font-size: 36px;
  background: ${({ theme }) => theme.colors.core.lightWhite};
  padding: 12px;
  border-radius: 6px;

  animation: ${FadeOut} 2s ease forwards;
`

const SeedNumber: FunctionComponent = () => {
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)
  const participation = useParticipation()

  if (!participation) {
    return null
  }

  if (revealed) {
    return (
      <>
        {participation.password}{" "}
        <StyledButton
          buttonType={ButtonType.Clear}
          onClick={() => {
            navigator.clipboard.writeText(participation.password)
            setCopied(true)
            setTimeout(() => {
              setCopied(false)
            }, 5000)
          }}
        >
          Copy
        </StyledButton>
        {copied && <SuccessMessage>Copied!</SuccessMessage>}
      </>
    )
  }

  return (
    <StyledButton
      buttonType={ButtonType.Clear}
      onClick={() => setRevealed(true)}
    >
      Click to reveal
    </StyledButton>
  )
}

export default SeedNumber
