import { useOnRepay } from "@hooks/lendingFunc"
import { useCurrentLendingNFT } from "@state/lending/hooks"

import { Button, Input } from "abacus-ui"
import { formatEther } from "ethers/lib/utils"
import React, { useState } from "react"
import { Container, MaxButton } from "../Modal.styled"

type RepayProps = {
  closeModal: () => void
  address: string
  tokenId: string
  refresh: () => void
}

const Repay = ({ address, tokenId, refresh, closeModal }: RepayProps) => {
  const [eth, setEth] = useState<string>()
  const { nEthBalance } = useCurrentLendingNFT()
  const { onRepay, isPending } = useOnRepay()

  const repay = () => {
    onRepay(address, Number(tokenId), eth, () => {
      refresh()
      closeModal()
    })
  }

  const formattedBalance = nEthBalance && formatEther(nEthBalance)

  return (
    <Container>
      <Input
        type="number"
        name="repay_eth"
        value={eth}
        onChange={setEth}
        hint={`Your balance: ${formattedBalance} nETH`}
        label="Amount:"
        placeholder="0.00"
        pill={
          <MaxButton
            disabled={!nEthBalance}
            onClick={() => setEth(formattedBalance)}
          >
            Max
          </MaxButton>
        }
      />
      <Button onClick={repay}>{isPending ? "Repaying..." : "Repay"}</Button>
    </Container>
  )
}

export { Repay }
