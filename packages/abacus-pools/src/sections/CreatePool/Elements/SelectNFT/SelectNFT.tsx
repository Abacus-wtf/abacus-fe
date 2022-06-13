import { NFTBasePool } from "@state/poolData/reducer"
import React, { useState } from "react"

import { Button, Checkbox, P, Add, ButtonType } from "abacus-ui"
import { Link } from "gatsby"
import styled from "styled-components"
import { NewAddress } from "@sections/CreatePool/CreatePool"
import { Title, StyledButton } from "../../CreatePool.styled"
import { CreatePoolState } from "../../models"
import { NFTInput } from "./NFTInput"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const PoolTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const RadioContainer = styled.div`
  display: flex;
  gap: 8px;
`

const AddNFTButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 10px;
  align-self: center;
`

type SelectNFTProps = {
  nftAddresses: NewAddress[]
  setNftAddresses: React.Dispatch<React.SetStateAction<NewAddress[]>>
  setNewSesh: React.Dispatch<React.SetStateAction<NFTBasePool[]>>
  setCreatePoolState: React.Dispatch<React.SetStateAction<CreatePoolState>>
}

export const SelectNFT = ({
  nftAddresses,
  setNftAddresses,
  setNewSesh,
  setCreatePoolState,
}: SelectNFTProps) => {
  const [multi, setMulti] = useState(false)
  const selectNft = () => {
    setNewSesh(
      nftAddresses.map((nftAddress) => ({
        address: nftAddress.address,
        tokenId: nftAddress.tokenId,
        img: nftAddress.img,
        collectionTitle: nftAddress.collectionTitle,
      }))
    )
    setCreatePoolState(CreatePoolState.Details)
  }

  const selectDisabled = nftAddresses.some((nft) => !nft.address)

  return (
    <Container>
      <Title>Start a new Pool</Title>
      <PoolTypeContainer>
        <P>
          What type of Pool do you want to start?{" "}
          <Link to="/learn-more">Learn More {">"}</Link>
        </P>
        <RadioContainer>
          <Checkbox
            type="radio"
            name="is_multi"
            label="Single NFT"
            id="is_multi_false"
            value="Single NFT"
            checked={!multi}
            onChange={() => {
              setMulti(false)
              setNftAddresses([nftAddresses[0]])
            }}
          />
          <Checkbox
            type="radio"
            name="is_multi"
            label="Multiple NFTs"
            id="is_multi_true"
            value="Multiple NFTs"
            checked={multi}
            onChange={() => setMulti(true)}
          />
        </RadioContainer>
      </PoolTypeContainer>
      {nftAddresses.map((address, index) => (
        <NFTInput
          key={address.id}
          index={index}
          singular={!multi}
          nftAddress={address.value}
          removeNftAddress={() => {
            const newNftAddresses = nftAddresses.filter(
              (nftAddress) => address.id !== nftAddress.id
            )
            setNftAddresses(newNftAddresses)
          }}
          removeDisabled={nftAddresses.length === 1}
          setNftAddress={(newAddress: string) => {
            nftAddresses[index] = {
              id: address.id,
              value: newAddress,
            }
            setNftAddresses([...nftAddresses])
          }}
          onValidate={({ address, tokenId, img, collectionTitle }) => {
            nftAddresses[index] = {
              ...nftAddresses[index],
              address,
              tokenId,
              img,
              collectionTitle,
            }
            setNftAddresses([...nftAddresses])
          }}
        />
      ))}
      {multi && (
        <AddNFTButton
          buttonType={ButtonType.Gray}
          onClick={() => {
            const highestId = nftAddresses.reduce(
              (acc, nftAddress) => (acc < nftAddress.id ? nftAddress.id : acc),
              0
            )
            setNftAddresses([...nftAddresses, { id: highestId + 1, value: "" }])
          }}
        >
          Add NFT <Add size={16} />
        </AddNFTButton>
      )}
      <StyledButton onClick={selectNft} disabled={selectDisabled}>
        Preview
      </StyledButton>
    </Container>
  )
}
