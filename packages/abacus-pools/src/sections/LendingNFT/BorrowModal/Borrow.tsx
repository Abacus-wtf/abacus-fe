import { LoadingOverlay } from "@components/LoadingOverlay"
import { useOnBorrow } from "@hooks/lendingFunc"
import { Button, Input } from "abacus-ui"
import React, { useState } from "react"
import { Container } from "../Modal.styled"

type BorrowProps = {
  selectedVault: string
  address: string
  tokenId: string
  refresh: () => void
  closeModal: () => void
}

const Borrow = ({
  selectedVault,
  address,
  tokenId,
  refresh,
  closeModal,
}: BorrowProps) => {
  const [eth, setEth] = useState<string>()
  const { onBorrow, isPending } = useOnBorrow()

  const borrow = () => {
    onBorrow(selectedVault, address, tokenId, eth, () => {
      refresh()
      closeModal()
    })
  }

  return (
    <Container>
      <LoadingOverlay loading={isPending} />
      <Input
        type="number"
        name="borrow_eth"
        value={eth}
        onChange={setEth}
        hint="Max available"
        label="Amount:"
        placeholder="0.00"
        pill="ETH"
      />
      <Button onClick={borrow} disabled={isPending}>
        {isPending ? "tx pending..." : "Borrow"}
      </Button>
    </Container>
  )
}

export { Borrow }
