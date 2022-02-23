/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from "react"
import { PortalNavbar } from "abacus-ui"
import Web3 from "web3"
import { useActiveWeb3React } from "@hooks/index"
import {
  useSelectNetwork,
  useGetCurrentNetwork,
} from "@state/application/hooks"
import { NetworkSymbolEnum, NetworkSymbolAndId } from "@config/constants"
import SEO, { SEOWithQueryProps } from "@components/SEO"
import { navigate, PageProps } from "gatsby"
import { GlobalStyles, GlobalContainer, InnerContainer } from "./styles"

type GlobalLayoutProps = {
  location: PageProps["location"]
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children, location }) => {
  const { chainId, account } = useActiveWeb3React()
  const selectNetwork = useSelectNetwork()
  const networkSymbol = useGetCurrentNetwork()
  const isArbitrumNetwork = networkSymbol === NetworkSymbolEnum.ARBITRUM
  const isNetworkSymbolNone = networkSymbol === NetworkSymbolEnum.NONE

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
      case "/auction/":
        return {
          title: "Abacus Protocol | Auction",
        }
      case "/claim-pool/":
        return {
          title: "Abacus Protocol | Claim Pool",
        }
      case "/create-session/":
        return {
          title: "Abacus Protocol | Create New Session",
        }

      case "/current-session/":
        return {
          title: "Abacus Protocol | Current Session",
        }
      case "/my-sessions/":
        return {
          title: "Abacus Protocol | My Sessions",
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
      <PortalNavbar
        balance={0}
        profileName="@bigint"
        profileIcon="/temp_icon.png"
        onClick={() => navigate("/")}
        onBalanceClick={() => navigate("/claim-pool")}
      />
      <GlobalContainer>
        <InnerContainer>
          {!isArbitrumNetwork && !isNetworkSymbolNone ? (
            <div
              style={{
                textAlign: "center",
                maxWidth: "600px",
                lineHeight: 1.8,
              }}
            >
              We currently only support Arbitrum. Please change to the Arbitrum
              network by clicking on the ETH label in your Navigation Bar to
              access Abacus features. We will be porting to your favorite chain
              shortly!
            </div>
          ) : (
            children
          )}
        </InnerContainer>
      </GlobalContainer>
    </>
  )
}

export default GlobalLayout
