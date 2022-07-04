import { LoadingOverlay } from "@components/LoadingOverlay"
import { useOnChangeAllocation } from "@hooks/veFunc"
import { VeAllocation } from "@sections/Ve/models"
import { Modal, Media } from "abacus-ui"
import { formatEther } from "ethers/lib/utils"
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
  allocationToChange: VeAllocation
  setAllocationToChange: React.Dispatch<VeAllocation>
  refreshVeState: () => void
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
  refreshVeState,
}: AllocationModalProps) => {
  const [newAllocation, setNewAllocation] = useState("")
  const userState = allocationToChange ? UserState.WRITE : UserState.READ
  const { onChangeAllocation, isPending } = useOnChangeAllocation()

  const changeAllocationDisabled = !allocationToChange || !newAllocation

  const changeAllocation = () => {
    const amount = parseFloat(formatEther(allocationToChange.amount))
    onChangeAllocation(
      allocationToChange.address,
      newAllocation,
      amount,
      () => {
        refreshVeState()
        closeModal()
      }
    )
  }

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Container>
        <LoadingOverlay loading={isPending} />
        <EpochAllocations
          userState={userState}
          setNewAllocation={setNewAllocation}
        />
        <Divider />
        <YourAllocations
          userState={userState}
          setAllocationToChange={setAllocationToChange}
          allocationToChange={allocationToChange}
          changeAllocation={changeAllocation}
          changeAllocationDisabled={changeAllocationDisabled}
        />
      </Container>
    </Modal>
  )
}

export { AllocationModal }
