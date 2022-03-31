import { NFTImage } from "@components/NFTImage"
import React, { FunctionComponent, useState } from "react"
import { useOnCreatePool } from "@hooks/createPool"
import FACTORY_ABI from "@config/contracts/ABC_FACTORY_ABI.json"
import { ABC_FACTORY } from "@config/constants"
import { useWeb3Contract } from "@hooks/index"
import {
  StyledButton,
  StyledInput,
  ImageContainer,
  Title,
} from "./CreatePoolModal.styled"
import { ModalState } from "./models"

type DetailsProps = {
  imgSrc: string
  address: string
  tokenId: string
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>
  setCurrentNonce: React.Dispatch<React.SetStateAction<number>>
  tokenName: string
  setTokenName: React.Dispatch<React.SetStateAction<string>>
  tokenSymbol: string
  setTokenSymbol: React.Dispatch<React.SetStateAction<string>>
}

const Details: FunctionComponent<DetailsProps> = ({
  imgSrc,
  address,
  tokenId,
  setCurrentNonce,
  tokenName,
  setTokenName,
  tokenSymbol,
  setTokenSymbol,
  setModalState,
}) => {
  const [isPending, setIsPending] = useState(false)
  const { onCreatePool } = useOnCreatePool()
  const factory = useWeb3Contract(FACTORY_ABI)

  const createPool = async () => {
    setIsPending(true)
    const nonce = await factory(ABC_FACTORY)
      .methods.nextVaultIndex(address, tokenId)
      .call()
    setCurrentNonce(nonce)
    await onCreatePool(address, tokenId, tokenName, tokenSymbol, () => {
      setIsPending(false)
      setModalState(ModalState.Complete)
    })
  }

  return (
    <>
      <Title>Start a new Pool</Title>
      <ImageContainer>
        <NFTImage src={imgSrc} alt="NFT for Spot Pool" />
      </ImageContainer>
      <StyledInput
        label="Pool Token Name"
        name="poolTokenName"
        placeholder="BAYC Vault"
        type="text"
        value={tokenName}
        onChange={setTokenName}
        exteriorLabel
      />
      <StyledInput
        label="Pool Token Symbol"
        name="poolTokenSymbol"
        placeholder="BAYC"
        type="text"
        value={tokenSymbol}
        onChange={setTokenSymbol}
        exteriorLabel
      />
      <StyledButton onClick={createPool} disabled={isPending}>
        {isPending ? "Creating Pool..." : "Create Pool"}
      </StyledButton>
    </>
  )
}

export default Details
