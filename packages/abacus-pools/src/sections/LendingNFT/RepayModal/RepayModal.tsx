import React, { useMemo, useState } from "react"

import { Title } from "@components/Title"
import { Repay } from "./Repay"
import { RepayModalSteps } from "./steps"
import { Approve } from "./Approve"
import { StyledModal } from "../Modal.styled"

type RepayModalProps = {
  isOpen: boolean
  closeModal: () => void
  address: string
  tokenId: string
  refresh: () => void
}

const RepayModal = ({
  isOpen,
  closeModal,
  address,
  tokenId,
  refresh,
}: RepayModalProps) => {
  const [step, setStep] = useState(RepayModalSteps.Approve)

  const ui = useMemo(() => {
    switch (step) {
      case RepayModalSteps.Approve:
        return <Approve refresh={refresh} setStep={setStep} />
      case RepayModalSteps.Repay:
        return (
          <Repay
            address={address}
            tokenId={tokenId}
            refresh={refresh}
            closeModal={closeModal}
          />
        )
      default:
        return null
    }
  }, [address, closeModal, refresh, step, tokenId])

  return (
    <StyledModal isOpen={isOpen} closeModal={closeModal}>
      <Title>{step}</Title>
      {ui}
    </StyledModal>
  )
}

export { RepayModal }
