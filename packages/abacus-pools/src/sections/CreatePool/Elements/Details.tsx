import React, { FunctionComponent, useState } from "react"
import styled from "styled-components"
import { useOnCreatePool } from "@hooks/createPool"
import FACTORY_ABI from "@config/contracts/ABC_FACTORY_ABI.json"
import { NFTGrid, LoadingOverlay, NFTImage } from "@components/index"
import { ABC_FACTORY } from "@config/constants"
import { useWeb3Contract } from "@hooks/index"
import { StyledButton, Title } from "../CreatePool.styled"
import { CreatePoolState } from "../models"
import { NewAddress } from "../CreatePool"

const ModalError = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.utility.red};
  margin: 8px 0;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.utility.red}95;
  border-radius: ${({ theme }) => theme.borderRadius.section};
  color: ${({ theme }) => theme.colors.core.white};
`

type DetailsProps = {
  nfts: NewAddress[]
  vaultName: string
  maxCollateralAmount: number
  setCreatePoolState: React.Dispatch<React.SetStateAction<CreatePoolState>>
  setVaultAddress: React.Dispatch<string>
}

export const Details: FunctionComponent<DetailsProps> = ({
  nfts,
  vaultName,
  maxCollateralAmount,
  setCreatePoolState,
  setVaultAddress,
}) => {
  const [isFetchingVaultAddress, setIsFetchingVaultAddress] = useState(false)
  const { onCreatePool, txError, isPending } = useOnCreatePool()
  const factory = useWeb3Contract(FACTORY_ABI)

  const validatedVaultName =
    vaultName || `${nfts[0].collectionTitle}#${nfts[0].tokenId}`

  const createPool = async () => {
    const getVaultAddress = async () => {
      setIsFetchingVaultAddress(true)
      try {
        const vaultAddress = await factory(ABC_FACTORY)
          .methods.vaultNames(validatedVaultName)
          .call()
        setVaultAddress(vaultAddress)
      } finally {
        setIsFetchingVaultAddress(false)
      }
      setCreatePoolState(CreatePoolState.Complete)
    }
    const INITIAL: { nftAddresses: string[]; tokenIds: string[] } = {
      nftAddresses: [],
      tokenIds: [],
    }
    const { nftAddresses, tokenIds } = nfts.reduce(
      (acc, nft) => ({
        nftAddresses: [...acc.nftAddresses, nft.address],
        tokenIds: [...acc.tokenIds, nft.tokenId],
      }),
      INITIAL
    )

    await onCreatePool(
      validatedVaultName,
      nftAddresses,
      tokenIds,
      maxCollateralAmount,
      () => {
        getVaultAddress()
      }
    )
  }

  const loading = isPending || isFetchingVaultAddress

  return (
    <>
      <LoadingOverlay loading={loading} />
      <Title>Start a new Pool</Title>
      <NFTGrid size={nfts.length}>
        {nfts.map((nft) => (
          <NFTImage src={nft.img} alt={nft.collectionTitle} />
        ))}
      </NFTGrid>

      <StyledButton onClick={createPool} disabled={loading}>
        {loading ? "Creating Pool..." : "Create Pool"}
      </StyledButton>
      {txError && <ModalError>{txError}</ModalError>}
    </>
  )
}
