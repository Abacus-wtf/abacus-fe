import { LoadingOverlay } from "@components/LoadingOverlay"
import { useOnApproveLoan, useOnBorrow } from "@hooks/lendingFunc"
import { useCurrentLendingNFT } from "@state/lending/hooks"
import { Modal } from "abacus-ui"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Borrow } from "./Borrow"
import { BorrowModalSteps } from "./steps"

const StyledModal = styled(Modal)`
  position: relative;
`

type BorrowModalProps = {
  isOpen: boolean
  closeModal: () => void
  address: string
  tokenId: string
  refresh: () => void
}

const BorrowModal = ({
  isOpen,
  closeModal,
  address,
  tokenId,
  refresh,
}: BorrowModalProps) => {
  const [] = useState(BorrowModalSteps.Reserve)
  const [selectedPool, setSelectedPool] = useState("")
  const { vaults } = useCurrentLendingNFT()
  const { isPending: pendingBorrow } = useOnBorrow()
  const { isPending: pendingApproveLoad } = useOnApproveLoan()

  const isPending = pendingBorrow || pendingApproveLoad
  useEffect(() => {
    if (vaults && vaults.length) {
      setSelectedPool(vaults[0].id)
    }
  }, [vaults])

  return (
    <StyledModal isOpen={isOpen} closeModal={closeModal}>
      <LoadingOverlay loading={isPending} />
      <Borrow
        selectedPool={selectedPool}
        address={address}
        tokenId={tokenId}
        vaults={vaults}
        setSelectedPool={setSelectedPool}
        refresh={refresh}
      />
    </StyledModal>
  )
}

export { BorrowModal }
