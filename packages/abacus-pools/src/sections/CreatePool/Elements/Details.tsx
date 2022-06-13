import { NFTImage } from "@components/NFTImage"
import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { useOnCreatePool } from "@hooks/createPool"
import FACTORY_ABI from "@config/contracts/ABC_FACTORY_ABI.json"
import { ABC_FACTORY } from "@config/constants"
import { useWeb3Contract } from "@hooks/index"
import { LoadingOverlay } from "@components/LoadingOverlay"
import { StyledButton, ImageContainer, Title } from "../CreatePool.styled"
import { CreatePoolState } from "../models"

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
  imgSrc: string
  address: string
  tokenId: string
  setCreatePoolState: React.Dispatch<React.SetStateAction<CreatePoolState>>
  setCurrentNonce: React.Dispatch<React.SetStateAction<number>>
}

const Details: FunctionComponent<DetailsProps> = ({
  imgSrc,
  address,
  tokenId,
  setCurrentNonce,
  setCreatePoolState,
}) => {
  const { onCreatePool, txError, isPending } = useOnCreatePool()
  const factory = useWeb3Contract(FACTORY_ABI)

  const createPool = async () => {
    const nonce = await factory(ABC_FACTORY)
      .methods.nextVaultIndex(address, tokenId)
      .call()
    setCurrentNonce(nonce)
    await onCreatePool(address, tokenId, () => {
      setCreatePoolState(CreatePoolState.Complete)
    })
  }

  return (
    <>
      <LoadingOverlay loading={isPending} />
      <Title>Start a new Pool</Title>
      <ImageContainer>
        <NFTImage src={imgSrc} alt="NFT for Spot Pool" />
      </ImageContainer>
      <StyledButton onClick={createPool} disabled={isPending}>
        {isPending ? "Creating Pool..." : "Create Pool"}
      </StyledButton>
      {txError && <ModalError>{txError}</ModalError>}
    </>
  )
}

export default Details