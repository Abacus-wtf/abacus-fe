import { NFTBasePool } from "@state/poolData/reducer"
import React, { FunctionComponent, useState } from "react"
import { OpenSeaAsset, openseaGet } from "@config/utils"
import { InputError } from "@components/InputError"
import { Title, StyledInput, StyledButton } from "../CreatePool.styled"
import { CreatePoolState } from "../models"

type SelectNFTProps = {
  nftAddress: string
  setNftAddress: React.Dispatch<React.SetStateAction<string>>
  setNewSesh: React.Dispatch<React.SetStateAction<NFTBasePool>>
  setCreatePoolState: React.Dispatch<React.SetStateAction<CreatePoolState>>
}

const SelectNFT: FunctionComponent<SelectNFTProps> = ({
  nftAddress,
  setNftAddress,
  setNewSesh,
  setCreatePoolState,
}) => {
  const [error, setError] = useState(null)
  const selectNft = async () => {
    setError(null)
    const url = new URL(nftAddress)
    const splitPath = url.pathname.split("/")

    const address = splitPath[splitPath.length - 2]
    const tokenId = splitPath[splitPath.length - 1]

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
      setCreatePoolState(CreatePoolState.Details)
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
      />
      <StyledButton onClick={selectNft}>Preview</StyledButton>
    </>
  )
}

export default SelectNFT
