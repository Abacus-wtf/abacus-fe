import React, { FunctionComponent, useState } from "react"
import { useOnCreatePool } from "@hooks/createPool"
import FACTORY_ABI from "@config/contracts/ABC_FACTORY_ABI.json"
import { LoadingOverlay } from "@components/index"
import { ABC_FACTORY } from "@config/constants"
import { useWeb3Contract } from "@hooks/index"
import { P } from "abacus-ui"
import { Error, StyledButton, StyledInput, Title } from "../CreatePool.styled"
import { CreatePoolState } from "../models"

type NameVaultProps = {
  vaultName: string
  setVaultName: React.Dispatch<string>
  setCreatePoolState: React.Dispatch<React.SetStateAction<CreatePoolState>>
  setVaultAddress: React.Dispatch<string>
}

export const NameVault: FunctionComponent<NameVaultProps> = ({
  vaultName,
  setVaultName,
  setCreatePoolState,
  setVaultAddress,
}) => {
  const [isFetchingVaultAddress, setIsFetchingVaultAddress] = useState(false)
  const { onCreatePool, txError, isPending } = useOnCreatePool()
  const factory = useWeb3Contract(FACTORY_ABI)

  const createPool = async () => {
    const getVaultAddress = async () => {
      setIsFetchingVaultAddress(true)
      try {
        const vaultAddress = await factory(ABC_FACTORY)
          .methods.vaultNames(vaultName, 0)
          .call()
        setVaultAddress(vaultAddress)
      } finally {
        setIsFetchingVaultAddress(false)
      }
      setCreatePoolState(CreatePoolState.SelectNFT)
    }

    await onCreatePool(vaultName, () => {
      getVaultAddress()
    })
  }

  const loading = isPending || isFetchingVaultAddress

  return (
    <>
      <LoadingOverlay loading={loading} />
      <Title>Start a new Pool</Title>

      <StyledInput
        type="text"
        name="vault_name"
        value={vaultName}
        onChange={setVaultName}
        label="Vault Name"
        placeholder="Name of Vault (Must be unique)"
      />

      <P>After you begin the pool, you will then be able to select the NFTs</P>

      <StyledButton onClick={createPool} disabled={loading}>
        {loading ? "Starting Pool..." : "Start Pool"}
      </StyledButton>
      {txError && <Error>{txError}</Error>}
    </>
  )
}
