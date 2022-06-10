import React, { useState, useMemo, useEffect } from "react"
import styled from "styled-components"
import { NFTBasePool } from "@state/poolData/reducer"

import { Media, Modal } from "abacus-ui"
import { globalHistory } from "@reach/router"
import SelectNFT from "./SelectNFT"
import { ModalState } from "./models"
import Details from "./Details"
import Success from "./Success"

const Container = styled.div<{ complete: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${({ complete }) => (complete ? "" : Media.sm`padding: 20px 76px;`)}
`

type CreatePoolModalProps = {
  isOpen: boolean
  closeModal: () => void
}

const CreatePoolModal: React.FC<CreatePoolModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const [modalState, setModalState] = useState(ModalState.SelectNFT)
  const [newSesh, setNewSesh] = useState<NFTBasePool | null>(null)
  const [nftAddress, setNftAddress] = useState("")
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [currentNonce, setCurrentNonce] = useState(0)

  useEffect(() => {
    globalHistory.listen(({ action }) => {
      if (action === "PUSH") {
        closeModal()
      }
    })
  }, [closeModal])

  const content = useMemo(() => {
    switch (modalState) {
      case ModalState.SelectNFT:
        return (
          <SelectNFT
            setNewSesh={setNewSesh}
            setModalState={setModalState}
            nftAddress={nftAddress}
            setNftAddress={setNftAddress}
          />
        )
      case ModalState.Details:
        return (
          <Details
            imgSrc={newSesh.img}
            address={newSesh.address}
            tokenId={newSesh.tokenId}
            setCurrentNonce={setCurrentNonce}
            tokenName={tokenName}
            setTokenName={setTokenName}
            tokenSymbol={tokenSymbol}
            setTokenSymbol={setTokenSymbol}
            setModalState={setModalState}
          />
        )
      case ModalState.Complete:
        return (
          <Success
            imgSrc={newSesh.img}
            poolName={tokenName}
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
  }, [currentNonce, modalState, newSesh, nftAddress, tokenName, tokenSymbol])

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <Container complete={modalState === ModalState.Complete}>
        {content}
      </Container>
    </Modal>
  )
}

export default CreatePoolModal
