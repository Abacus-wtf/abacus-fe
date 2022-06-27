/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from "react"
import styled from "styled-components"
import { PersistentBanner, Button, ButtonType } from "abacus-ui"
import Web3 from "web3"
import { PageProps } from "gatsby"
import { useActiveWeb3React } from "@hooks/index"
import {
  useSelectNetwork,
  useToggleWalletModal,
  useGetEthToUSD,
  useGetAbcBalance,
  useFetchCurrentEpoch,
} from "@state/application/hooks"
import { NetworkSymbolEnum, NetworkSymbolAndId } from "@config/constants"
import SEO, { SEOWithQueryProps } from "@components/SEO"
import {
  Web3Modal,
  GeneralizedContractError,
  Navbar,
  NetworkSelectorModal,
} from "@components/index"
import { GlobalStyles, GlobalContainer, InnerContainer } from "./styles"

type GlobalLayoutProps = {
  location: PageProps["location"]
}

const ConnectButton = styled(Button)`
  margin-left: 16px;
`

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children, location }) => {
  const { chainId, account } = useActiveWeb3React()
  const selectNetwork = useSelectNetwork()
  const toggleWalletModal = useToggleWalletModal()
  const getEthToUSD = useGetEthToUSD()
  const getAbcBalance = useGetAbcBalance()
  const { fetchCurrentEpoch } = useFetchCurrentEpoch()

  useEffect(() => {
    fetchCurrentEpoch()
  }, [fetchCurrentEpoch])

  useEffect(() => {
    getEthToUSD()
  }, [getEthToUSD])

  useEffect(() => {
    getAbcBalance()
  }, [getAbcBalance])

  useEffect(() => {
    const checkConnection = async () => {
      // Check if browser is running Metamask
      let web3: any
      // @ts-ignore
      if (window.web3) {
        // @ts-ignore
        web3 = new Web3(window.web3.currentProvider)
        // @ts-ignore
      } else if (window.ethereum) {
        // @ts-ignore
        web3 = new Web3(window.ethereum)
      }

      // Check if User is already connected by retrieving the accounts
      try {
        await web3?.eth.getAccounts()
      } catch (e) {
        console.log(e)
      }
    }
    checkConnection()
  }, [])

  useEffect(() => {
    const network = NetworkSymbolAndId[chainId]
    if (!account) {
      selectNetwork(NetworkSymbolEnum.NONE)
    } else if (network) {
      selectNetwork(network)
    }
  }, [account, chainId, selectNetwork])

  const seoProps = React.useMemo<SEOWithQueryProps>(() => {
    switch (location.pathname) {
      case "/":
        return {
          title: "Abacus Protocol",
        }
      case "/auctions":
        return {
          title: "Abacus Protocol | Auctions",
        }
      case "/create-pool":
        return {
          title: "Abacus Protocol | Create Pool",
        }
      case "/pool":
        return {
          title: "Abacus Protocol | Current Pool",
        }
      default:
        return {
          title: "Abacus Protocol",
        }
    }
  }, [location.pathname])

  return (
    <>
      <SEO {...seoProps} />
      <GlobalStyles />
      <Navbar pathname={location.pathname} />
      <GlobalContainer>
        <InnerContainer>{children}</InnerContainer>
        {!account && (
          <PersistentBanner bottom="0">
            You are not connected.
            <ConnectButton
              onClick={toggleWalletModal}
              buttonType={ButtonType.White}
            >
              Connect
            </ConnectButton>
          </PersistentBanner>
        )}
        <Web3Modal />
        <NetworkSelectorModal />
        <GeneralizedContractError />
      </GlobalContainer>
    </>
  )
}

export default GlobalLayout
