import { LoadingOverlay } from "@components/LoadingOverlay"
import { Title } from "@components/Title"
import { useOnRepay } from "@hooks/lendingFunc"
import { useCurrentLendingNFT } from "@state/lending/hooks"
import { Button, Input, Modal, Select } from "abacus-ui"
import React, { useEffect, useState } from "react"
import styled from "styled-components"

const StyledModal = styled(Modal)`
  position: relative;
`

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
`

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
  const [eth, setEth] = useState<string>()
  const [selectedPool, setSelectedPool] = useState("")
  const { vaults } = useCurrentLendingNFT()
  const { onRepay, isPending } = useOnRepay()

  useEffect(() => {
    setSelectedPool(vaults[0].id)
  }, [vaults])

  const repay = () => {
    onRepay(address, Number(tokenId), eth, () => {
      refresh()
    })
  }

  const vaultNames = vaults.map((vault) => vault.name || "Untitled Vault")

  return (
    <StyledModal isOpen={isOpen} closeModal={closeModal}>
      <LoadingOverlay loading={isPending} />
      <Title>Pay Back</Title>
      <Container>
        <Input
          type="number"
          name="repay_eth"
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
        <Button onClick={repay}>{isPending ? "Repaying..." : "Repay"}</Button>
      </Container>
    </StyledModal>
  )
}

export { RepayModal }
