import { Modal, Media } from "abacus-ui"
import React, { useState } from "react"
import styled from "styled-components"
import { EpochAllocations } from "./EpochAllocations/EpochAllocations"
import { YourAllocations } from "./YourAllocations"

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  column-gap: 40px;
  row-gap: 24px;

  ${Media.sm`
    grid-template-columns: auto 1px auto;
  `}
`

const Divider = styled.div`
  border: 0.5px solid ${({ theme }) => theme.colors.core[800]};
  margin: 0 80px;

  ${Media.sm`
    margin: 80px 0;
    max-height: 600px;
  `}
`

type AllocationModalProps = {
  isOpen: boolean
  closeModal: () => void
  allocationToChange: string
  setAllocationToChange: React.Dispatch<string>
}

export enum UserState {
  READ,
  WRITE,
}

const AllocationModal = ({
  isOpen,
  closeModal,
  allocationToChange,
  setAllocationToChange,
}: AllocationModalProps) => {
  const [newAllocation, setNewAllocation] = useState("")
  const userState = allocationToChange ? UserState.WRITE : UserState.READ
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Container>
        <EpochAllocations
          userState={userState}
          setNewAllocation={setNewAllocation}
        />
        <Divider />
        <YourAllocations
          newAllocation={newAllocation}
          userState={userState}
          setAllocationToChange={setAllocationToChange}
          allocationToChange={allocationToChange}
        />
      </Container>
    </Modal>
  )
}

export { AllocationModal }
