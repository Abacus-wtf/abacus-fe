import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Button, VisuallyHidden, ButtonType, Media } from "abacus-ui"
import { X } from "react-feather"
import Infographics from "@components/Infographics"

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url("/background.png");
  background-repeat: no-repeat;
  background-size: cover;
  backdrop-filter: blur(40px);
  z-index: 10;
  padding: 1rem;
  overflow-y: scroll;

  ${Media.sm`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `}
`

const ModalBody = styled.div`
  padding: 0;
  margin: 0;
`

type OpenAppModalProps = {
  isOpen: boolean
  toggle: () => void
}

const preventBubbling = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation()
}

const StyledButton = styled(Button)`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`

const OpenAppModal: FunctionComponent<OpenAppModalProps> = ({
  isOpen,
  toggle,
}) => {
  if (!isOpen) {
    return null
  }
  return (
    <Container onClick={toggle}>
      <StyledButton
        type="button"
        buttonType={ButtonType.Clear}
        onClick={toggle}
      >
        <>
          <X />
          <VisuallyHidden>Close Modal</VisuallyHidden>
        </>
      </StyledButton>
      <ModalBody onClick={preventBubbling}>
        <Infographics />
      </ModalBody>
    </Container>
  )
}

export default OpenAppModal
