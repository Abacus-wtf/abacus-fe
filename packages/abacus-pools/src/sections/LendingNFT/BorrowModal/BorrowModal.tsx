import { LoadingOverlay } from "@components/LoadingOverlay"
import { useOnApproveLoan, useOnBorrow } from "@hooks/lendingFunc"

import React, { useEffect, useMemo, useState } from "react"

import { Title } from "@components/Title"
import { useCurrentLendingNFT } from "@state/lending/hooks"
import { Borrow } from "./Borrow"
import { BorrowModalSteps } from "./steps"
import { Approve } from "./Approve"
import { StyledModal } from "../Modal.styled"

type BorrowModalProps = {
  isOpen: boolean
  closeModal: () => void
  selectedVault: string
  address: string
  tokenId: string
  refresh: () => void
}

const BorrowModal = ({
  isOpen,
  closeModal,
  address,
  tokenId,
  selectedVault,
  refresh,
}: BorrowModalProps) => {
  const [step, setStep] = useState(BorrowModalSteps.Approve)
  const { lendApproved } = useCurrentLendingNFT()
  const { isPending: pendingBorrow } = useOnBorrow()
  const { isPending: pendingApproveLoad } = useOnApproveLoan()

  useEffect(() => {
    if (lendApproved) {
      setStep(BorrowModalSteps.Borrow)
    }
  }, [lendApproved])

  const ui = useMemo(() => {
    switch (step) {
      case BorrowModalSteps.Approve:
        return <Approve refresh={refresh} setStep={setStep} />
      case BorrowModalSteps.Borrow:
        return (
          <Borrow
            selectedVault={selectedVault}
            address={address}
            tokenId={tokenId}
            refresh={refresh}
            closeModal={closeModal}
          />
        )
      default:
        return null
    }
  }, [address, closeModal, refresh, selectedVault, step, tokenId])

  const isPending = pendingBorrow || pendingApproveLoad

  return (
    <StyledModal isOpen={isOpen} closeModal={closeModal}>
      <LoadingOverlay loading={isPending} />
      <Title>{step}</Title>
      {ui}
    </StyledModal>
  )
}

export { BorrowModal }
