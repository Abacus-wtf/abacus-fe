import React, { FunctionComponent, useEffect, useRef } from "react"
import styled from "styled-components"
import { Button, VisuallyHidden, ButtonType, Media } from "abacus-ui"
import { X } from "react-feather"
import Infographics from "@components/Infographics"

const Container = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "unset" : "none")};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url("/background.png");
  background-repeat: no-repeat;
  background-size: cover;
  backdrop-filter: blur(40px);
  z-index: ${({ isOpen }) => (isOpen ? "10" : "-1")};
  padding: 1rem;
  transition: opacity 0.33s ease, z-index 0.33s ease;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  overflow-y: scroll;

  ${Media.sm`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
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
  align-self: flex-end;
`

const OpenAppModal: FunctionComponent<OpenAppModalProps> = ({
  isOpen,
  toggle,
}) => {
  const closeRef = useRef<HTMLButtonElement>()

  useEffect(() => {
    if (isOpen) {
      closeRef.current.focus()
    }

    const closeOnEsc = (e) => {
      if (isOpen && (e.key === "Escape" || e.code === "Escape")) {
        toggle()
      }
    }

    document.addEventListener("keydown", closeOnEsc)

    return () => document.removeEventListener("keydown", closeOnEsc)
  }, [isOpen, toggle])

  return (
    <Container onClick={toggle} isOpen={isOpen}>
      <StyledButton
        type="button"
        buttonType={ButtonType.Clear}
        onClick={toggle}
        ref={closeRef}
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
