import { LoadingOverlay } from "@components/LoadingOverlay"
import { useOnApproveNETH, useOnRepay } from "@hooks/lendingFunc"
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
  const { isPending: pendingRepay } = useOnRepay()
  const { isPending: pendingApprove } = useOnApproveNETH()

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

  const isPending = pendingRepay || pendingApprove

  return (
    <StyledModal isOpen={isOpen} closeModal={closeModal}>
      <LoadingOverlay loading={isPending} />
      <Title>{step}</Title>
      {ui}
    </StyledModal>
  )
}

export { RepayModal }
