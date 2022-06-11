import React, { useState, useMemo } from "react"
import styled from "styled-components"
import { NFTBasePool } from "@state/poolData/reducer"

import { Button, Media, Section, ButtonType } from "abacus-ui"
import { useActiveWeb3React } from "@hooks/index"
import { IS_PRODUCTION } from "@config/constants"
import {
  useSetIsSelectNetworkModalOpen,
  useToggleWalletModal,
} from "@state/application/hooks"
import SelectNFT from "./Elements/SelectNFT"
import { CreatePoolState } from "./models"
import Details from "./Elements/Details"
import Success from "./Elements/Success"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`

const StyledSection = styled(Section)<{ complete: boolean }>`
  display: flex;
  flex-direction: column;

  ${({ complete }) => (complete ? "" : Media.sm`padding: 20px 76px;`)}
`

const UpperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`

const NotConnectedWarning = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.utility.yellow};
  box-shadow: ${({ theme }) => theme.boxShadow.section};
  border-radius: ${({ theme }) => theme.borderRadius.section};
  max-width: 350px;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`

export const CreatePool = () => {
  const [createPoolState, setCreatePoolState] = useState(
    CreatePoolState.SelectNFT
  )
  const [newSesh, setNewSesh] = useState<NFTBasePool | null>(null)
  const [nftAddress, setNftAddress] = useState("")
  const [currentNonce, setCurrentNonce] = useState(0)
  const { account, chainId } = useActiveWeb3React()
  const isCorrectChain = IS_PRODUCTION ? chainId === 1 : chainId === 3
  const openWeb3Modal = useToggleWalletModal()
  const setIsSelectNetworkModalOpen = useSetIsSelectNetworkModalOpen()

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
    <Container>
      <UpperContainer>
        {!account && (
          <NotConnectedWarning>
            Your wallet is currently not connected or on the incorrect network.
          </NotConnectedWarning>
        )}
        <ButtonContainer>
          {!account && (
            <Button
              buttonType={ButtonType.Gray}
              onClick={() => openWeb3Modal()}
            >
              Connect Wallet
            </Button>
          )}
          {!isCorrectChain && (
            <Button
              buttonType={ButtonType.Gray}
              onClick={() => setIsSelectNetworkModalOpen(true)}
            >
              Switch Network
            </Button>
          )}
        </ButtonContainer>
      </UpperContainer>
      <StyledSection complete={createPoolState === CreatePoolState.Complete}>
        {content}
      </StyledSection>
    </Container>
  )
}
