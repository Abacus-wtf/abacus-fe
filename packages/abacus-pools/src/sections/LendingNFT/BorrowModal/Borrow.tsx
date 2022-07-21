import { LoadingOverlay } from "@components/LoadingOverlay"
import { useOnBorrow } from "@hooks/lendingFunc"
import { useCurrentLendingNFT } from "@state/lending/hooks"
import { Button, Input } from "abacus-ui"
import { formatEther } from "ethers/lib/utils"
import React, { useState } from "react"
import { Container, MaxButton } from "../Modal.styled"

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
  const { loan } = useCurrentLendingNFT()
  const [eth, setEth] = useState<string>()
  const { onBorrow, isPending } = useOnBorrow()

  const borrow = () => {
    onBorrow(selectedVault, address, tokenId, eth, () => {
      refresh()
      closeModal()
    })
  }

  const totalAvailable = formatEther(loan?.totalAvailable ?? "0X0")

  return (
    <Container>
      <LoadingOverlay loading={isPending} />
      <Input
        type="number"
        name="borrow_eth"
        value={eth}
        onChange={setEth}
        hint={`Max available: ${totalAvailable} nETH`}
        label="Amount:"
        placeholder="0.00"
        pill={
          <MaxButton
            disabled={!totalAvailable}
            onClick={() => setEth(totalAvailable)}
          >
            Max
          </MaxButton>
        }
      />
      <Button onClick={borrow} disabled={isPending}>
        {isPending ? "tx pending..." : "Borrow"}
      </Button>
    </Container>
  )
}

export { Borrow }
