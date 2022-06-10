import React, { useState, useMemo } from "react"
import styled from "styled-components"
import { NFTBasePool } from "@state/poolData/reducer"

import { Media, Section } from "abacus-ui"
import SelectNFT from "./Elements/SelectNFT"
import { CreatePoolState } from "./models"
import Details from "./Elements/Details"
import Success from "./Elements/Success"

const Container = styled(Section)<{ complete: boolean }>`
  display: flex;
  flex-direction: column;

  ${({ complete }) => (complete ? "" : Media.sm`padding: 20px 76px;`)}
`

export const CreatePool = () => {
  const [createPoolState, setCreatePoolState] = useState(
    CreatePoolState.SelectNFT
  )
  const [newSesh, setNewSesh] = useState<NFTBasePool | null>(null)
  const [nftAddress, setNftAddress] = useState("")
  const [currentNonce, setCurrentNonce] = useState(0)

  const content = useMemo(() => {
    switch (createPoolState) {
      case CreatePoolState.SelectNFT:
        return (
          <SelectNFT
            setNewSesh={setNewSesh}
            setCreatePoolState={setCreatePoolState}
            nftAddress={nftAddress}
            setNftAddress={setNftAddress}
          />
        )
      case CreatePoolState.Details:
        return (
          <Details
            imgSrc={newSesh.img}
            address={newSesh.address}
            tokenId={newSesh.tokenId}
            setCurrentNonce={setCurrentNonce}
            setCreatePoolState={setCreatePoolState}
          />
        )
      case CreatePoolState.Complete:
        return (
          <Success
            imgSrc={newSesh.img}
            openSeaLink={nftAddress}
            link={`/pool?address=${newSesh.address}&tokenId=${newSesh.tokenId}&nonce=${currentNonce}`}
            collection={newSesh.collectionTitle}
            tokenId={newSesh.tokenId}
            address={newSesh.address}
          />
        )
      default:
        return null
    }
  }, [createPoolState, nftAddress, newSesh, currentNonce])

  return (
    <Container complete={createPoolState === CreatePoolState.Complete}>
      {content}
    </Container>
  )
}
