import React, { useCallback, useEffect, useRef, useState } from "react"
import * as queryString from "query-string"
import { createGlobalStyle } from "styled-components"
import {
  CardBar,
  PriceHistory,
  AboutSection,
  PartOfCollection,
  ActivitySection,
} from "abacus-ui"
import { navigate } from "gatsby"
import {
  useCurrentSessionData,
  useGetCurrentSessionData,
  useGetUserStatus,
} from "@state/sessionData/hooks"
import { useActiveWeb3React, usePrevious } from "@hooks/index"
import ConnectWalletAlert from "@components/ConnectWalletAlert"
import { useEthToUSD, useGetCurrentNetwork } from "@state/application/hooks"
import { useSetPayoutData } from "@state/miscData/hooks"
import { NetworkSymbolEnum } from "@config/constants"
import { Container, SplitContainer } from "@layouts/styles"
import PricingSession from "@components/PricingSession"
import DepositModal from "./DepositModal"

const GlobalStyle = createGlobalStyle<{ url: string }>`
body {
  &::before {
    background-image: ${({ url }) =>
      url ? `url('${url}')` : `url('/background.png')`};
    filter: blur(100px);
    opacity: 1;
    height: 100%;
  }
}
`

const CurrentSession = ({ location }) => {
  const isInitialized = useRef(false)
  const { address, tokenId, nonce } = queryString.parse(location.search)
  const getCurrentSessionData = useGetCurrentSessionData()
  const { account, chainId } = useActiveWeb3React()
  const prevAccount = usePrevious(account)
  const sessionData = useCurrentSessionData()
  const networkSymbol = useGetCurrentNetwork()
  const prevNetworkSymbol = usePrevious(networkSymbol)
  const isNetworkSymbolNone = networkSymbol === NetworkSymbolEnum.NONE
  const isNewNetworkSymbol =
    networkSymbol !== prevNetworkSymbol
      ? !(
          (networkSymbol === NetworkSymbolEnum.ARBITRUM &&
            prevNetworkSymbol === NetworkSymbolEnum.NONE) ||
          (networkSymbol === NetworkSymbolEnum.NONE &&
            prevNetworkSymbol === NetworkSymbolEnum.ARBITRUM)
        )
      : false
  const setPayoutData = useSetPayoutData()
  const getUserStatus = useGetUserStatus()
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false)
  const totalStakedUSD = useEthToUSD(sessionData.totalStaked)

  useEffect(() => {
    if (!address || !tokenId || !nonce) {
      alert("This is a broken link, we are redirecting you to the home page.")
      navigate("/")
    }
  }, [address, nonce, tokenId])

  useEffect(() => {
    const validSession = address && tokenId
    const newAccount = account && account !== prevAccount
    if (validSession && newAccount) {
      getUserStatus(String(address), String(tokenId))
      setPayoutData(account)
    }
  }, [account, address, getUserStatus, prevAccount, setPayoutData, tokenId])

  const loadSessionData = useCallback(async () => {
    await getCurrentSessionData(String(address), String(tokenId), Number(nonce))
  }, [address, getCurrentSessionData, nonce, tokenId])

  useEffect(() => {
    if ((chainId && isNewNetworkSymbol) || !isInitialized.current) {
      isInitialized.current = true
      loadSessionData()
    }
  }, [chainId, isNewNetworkSymbol, loadSessionData])

  if (!account && !isNetworkSymbolNone) {
    return (
      <Container style={{ alignItems: "center", justifyContent: "center" }}>
        <ConnectWalletAlert />
      </Container>
    )
  }

  if (sessionData === null) {
    return (
      <Container style={{ alignItems: "center", justifyContent: "center" }}>
        Loading... {/* TODO: find a loader */}
      </Container>
    )
  }

  return (
    <Container>
      <DepositModal
        isOpen={isDepositModalOpen}
        closeModal={() => setIsDepositModalOpen(false)}
      />
      <GlobalStyle url={sessionData.image_url} />
      <CardBar
        title={sessionData.collectionTitle}
        poolAmount={sessionData.totalStaked}
        poolAmountUSD={totalStakedUSD}
        participants={sessionData.numPpl}
        owner={sessionData.owner}
      />
      <PricingSession
        nftSrc={sessionData.image_url}
        endTime={sessionData.endTime}
        openDepositModal={() => setIsDepositModalOpen(true)}
        getCurrentSessionData={() => {
          getCurrentSessionData(String(address), String(tokenId), Number(nonce))
        }}
      />
      <SplitContainer>
        <PriceHistory
          openseaLink={`https://opensea.io/${sessionData.ownerAddress}`}
          etherscanLink={`https://etherscan.io/${sessionData.address}/${sessionData.tokenId}`}
        />
        <AboutSection description="This is a description" />
      </SplitContainer>
      <ActivitySection
        activityList={[
          {
            id: "1",
            img: "/prof.jpeg",
            appraisalAmount: 1,
            stakeAmount: 1,
            appraisorAddress: "0x1234541234123",
          },
          {
            id: "2",
            img: "/prof.jpeg",
            appraisalAmount: 1,
            stakeAmount: 1,
            appraisorAddress: "0x1234541234123",
          },
          {
            id: "3",
            img: "/prof.jpeg",
            appraisalAmount: 1,
            stakeAmount: 1,
            appraisorAddress: "0x1234541234123",
          },
          {
            id: "4",
            img: "/prof.jpeg",
            appraisalAmount: 1,
            stakeAmount: 1,
            appraisorAddress: "0x1234541234123",
          },
          {
            id: "5",
            img: "/prof.jpeg",
            appraisalAmount: 1,
            stakeAmount: 1,
            appraisorAddress: "0x1234541234123",
          },
          {
            id: "6",
            img: "/prof.jpeg",
            appraisalAmount: 1,
            stakeAmount: 1,
            appraisorAddress: "0x1234541234123",
          },
          {
            id: "7",
            img: "/prof.jpeg",
            appraisalAmount: 1,
            stakeAmount: 1,
            appraisorAddress: "0x1234541234123",
          },
        ]}
      />
      <PartOfCollection
        openseaObjects={[
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com/1",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com/2",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com/3",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com/4",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com/5",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com/6",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com/7",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com/8",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com/9",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com/10",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com/11",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com/12",
          },
        ]}
      />
    </Container>
  )
}

export default CurrentSession
