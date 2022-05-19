import { Button, Modal, Media } from "abacus-ui"
import React, { useState } from "react"
import styled from "styled-components"
import { OverallAllocations } from "./OverallAllocations/OverallAllocations"

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  column-gap: 40px;
  row-gap: 24px;

  ${Media.md`
    grid-template-columns: auto 1px auto;
  `}

  ${Media.lg`
    grid-template-columns: max-content 1px auto;
  `}
`

const Divider = styled.div`
  border: 0.5px solid ${({ theme }) => theme.colors.core[800]};
  margin: 0 80px;

  ${Media.md`
    margin: 80px 0;
    max-height: 600px;
  `}
`

type AllocationModalProps = {
  isOpen: boolean
  closeModal: () => void
}

export enum UserState {
  READ,
  WRITE,
}

const AllocationModal = ({ isOpen, closeModal }: AllocationModalProps) => {
  const [userState, setUserState] = useState(UserState.READ)
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Container>
        <OverallAllocations userState={userState} />
        <Divider />
        <OverallAllocations userState={userState} />
      </Container>
    </Modal>
  )
}

export { AllocationModal }
