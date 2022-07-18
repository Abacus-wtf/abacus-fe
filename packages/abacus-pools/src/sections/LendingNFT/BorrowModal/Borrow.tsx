import { Title } from "@components/Title"
import { useOnBorrow } from "@hooks/lendingFunc"
import { Button, Input, Select } from "abacus-ui"
import React, { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
`

type BorrowProps = {
  selectedPool: string
  address: string
  tokenId: string
  vaults: {
    id: string
    name: string
  }[]
  setSelectedPool: React.Dispatch<string>
  refresh: () => void
}

const Borrow = ({
  selectedPool,
  address,
  tokenId,
  vaults,
  setSelectedPool,
  refresh,
}: BorrowProps) => {
  const [eth, setEth] = useState<string>()
  const { onBorrow, isPending } = useOnBorrow()

  const borrow = () => {
    onBorrow(selectedPool, address, Number(tokenId), eth, () => {
      refresh()
    })
  }

  const vaultNames = vaults.map((vault) => vault.name || "Untitled Vault")
  return (
    <>
      <Title>Borrow</Title>
      <Container>
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
        <Select
          value={selectedPool}
          setValue={(name) => {
            const newVault = vaults.find(
              (vault) => vault.name.toLowerCase() === name.toLowerCase()
            )
            if (newVault) {
              setSelectedPool(newVault.id)
            }
          }}
          options={vaultNames}
        />
        <Button onClick={borrow} disabled={isPending}>
          {isPending ? "tx pending..." : "Borrow"}
        </Button>
      </Container>
    </>
  )
}

export { Borrow }
