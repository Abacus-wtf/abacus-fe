import React, { useState, useMemo } from "react"
import styled from "styled-components"

import { Button, Media, Section, ButtonType } from "abacus-ui"
import { useActiveWeb3React } from "@hooks/index"
import { IS_PRODUCTION } from "@config/constants"
import {
  useSetIsSelectNetworkModalOpen,
  useToggleWalletModal,
} from "@state/application/hooks"
import { Container as LayoutContainer } from "@layouts/styles"
import { SelectNFT, Details, Success, NameVault } from "./Elements"
import { CreatePoolState } from "./models"

const Container = styled(LayoutContainer)`
  align-items: center;
  position: relative;
  gap: 40px;
`

const StyledSection = styled(Section)<{ complete: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;

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

export type NewAddress = {
  id: number
  value: string
  address?: string
  tokenId?: string
  img?: string
  collectionTitle?: string
}

export const CreatePool = () => {
  const [createPoolState, setCreatePoolState] = useState(
    CreatePoolState.NameVault
  )
  const [vaultAddress, setVaultAddress] = useState("")
  const [vaultName, setVaultName] = useState("")
  const [maxCollateralAmount, setMaxCollateralAmount] = useState(1)
  const [nftAddresses, setNftAddresses] = useState<NewAddress[]>([
    { id: 0, value: "" },
  ])
  const { account, chainId } = useActiveWeb3React()
  const isCorrectChain = IS_PRODUCTION ? chainId === 1 : chainId === 4
  const openWeb3Modal = useToggleWalletModal()
  const setIsSelectNetworkModalOpen = useSetIsSelectNetworkModalOpen()

  const content = useMemo(() => {
    switch (createPoolState) {
      case CreatePoolState.NameVault:
        return (
          <NameVault
            vaultName={vaultName}
            setVaultName={setVaultName}
            setCreatePoolState={setCreatePoolState}
            setVaultAddress={setVaultAddress}
          />
        )
      case CreatePoolState.SelectNFT:
        return (
          <SelectNFT
            vaultAddress={vaultAddress}
            vaultName={vaultName}
            maxCollateralAmount={maxCollateralAmount}
            setMaxCollateralAmount={setMaxCollateralAmount}
            setCreatePoolState={setCreatePoolState}
            nftAddresses={nftAddresses}
            setNftAddresses={setNftAddresses}
          />
        )
      case CreatePoolState.Details:
        return (
          <Details
            nfts={nftAddresses}
            vaultAddress={vaultAddress}
            maxCollateralAmount={maxCollateralAmount}
            setCreatePoolState={setCreatePoolState}
          />
        )
      case CreatePoolState.Complete:
        return (
          <Success
            link={`/pool/${vaultAddress}`} // TODO: Use vault ID for pool URL
            nfts={nftAddresses}
          />
        )
      default:
        return null
    }
  }, [
    createPoolState,
    maxCollateralAmount,
    nftAddresses,
    vaultAddress,
    vaultName,
  ])

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
