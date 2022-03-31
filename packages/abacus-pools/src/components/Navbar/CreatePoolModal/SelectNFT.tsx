import { NFTBasePool } from "@state/poolData/reducer"
import React, { FunctionComponent, useState } from "react"
import { OpenSeaAsset, openseaGet } from "@config/utils"
import { InputError } from "@components/InputError"
import { Title, StyledInput, StyledButton } from "./CreatePoolModal.styled"
import { ModalState } from "./models"

type SelectNFTProps = {
  nftAddress: string
  setNftAddress: React.Dispatch<React.SetStateAction<string>>
  setNewSesh: React.Dispatch<React.SetStateAction<NFTBasePool>>
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>
}

const SelectNFT: FunctionComponent<SelectNFTProps> = ({
  nftAddress,
  setNftAddress,
  setNewSesh,
  setModalState,
}) => {
  const [error, setError] = useState(null)
  const selectNft = async () => {
    setError(null)
    const addressIndex = nftAddress.indexOf("assets/") + "assets/".length
    const tokenIndex = addressIndex + 43
    const address = nftAddress.slice(addressIndex, tokenIndex - 1)
    const tokenId = nftAddress.slice(tokenIndex, nftAddress.length)

    try {
      const os = (await openseaGet(
        `asset/${address}/${tokenId}`
      )) as OpenSeaAsset

      if (os.asset_contract.schema_name !== "ERC721") {
        setError("The NFT must be a link to an ERC-721 NFT!")
        return
      }
      setNewSesh({
        address,
        tokenId,
        img: os.image_url,
        collectionTitle: os.collection.name,
      })
      setModalState(ModalState.Details)
    } catch (e) {
      setError("Invalid link")
    }
  }

  return (
    <>
      <Title>Start a new Pool</Title>
      <StyledInput
        type="text"
        name="nft_address"
        value={nftAddress}
        onChange={setNftAddress}
        label="NFT Address"
        placeholder="Copy/Paste NFT Address"
        hint={error && <InputError>{error}</InputError>}
        exteriorLabel
      />
      <StyledButton onClick={selectNft}>Preview</StyledButton>
    </>
  )
}

export default SelectNFT
