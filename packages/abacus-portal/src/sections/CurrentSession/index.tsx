import React, { useEffect, useState } from "react"
import * as queryString from "query-string"
import {
  PricingSessionMainComponent,
  CardBar,
  PriceHistory,
  AboutSection,
  PartOfCollection,
  ActivitySection,
} from "abacus-ui"
import { navigate } from "gatsby"
import {
  useCurrentSessionData,
  useCurrentSessionFetchStatus,
  useCurrentSessionStatus,
  useCurrentSessionUserStatus,
  useGetCurrentSessionData,
  useGetUserStatus,
} from "@state/sessionData/hooks"
import { PromiseStatus } from "@models/PromiseStatus"
import { useActiveWeb3React } from "@hooks/index"
import ConnectWalletAlert from "@components/ConnectWalletAlert"
import { useGetCurrentNetwork } from "@state/application/hooks"
import { useSetPayoutData, useClaimPayoutData } from "@state/miscData/hooks"
import { NetworkSymbolEnum } from "@config/constants"
import { isWithinWinRange } from "@config/utils"
import { SessionState } from "@models/SessionState"
import { Container, SplitContainer } from "@layouts/styles"

const CurrentSession = ({ location }) => {
  const status = useCurrentSessionStatus()
  const { address, tokenId, nonce } = queryString.parse(location.search)
  const getCurrentSessionData = useGetCurrentSessionData()
  const { account, chainId } = useActiveWeb3React()
  const sessionData = useCurrentSessionData()
  const fetchStatus = useCurrentSessionFetchStatus()
  const isLoading = fetchStatus === PromiseStatus.Pending
  const networkSymbol = useGetCurrentNetwork()
  const isNetworkSymbolNone = networkSymbol === NetworkSymbolEnum.NONE
  const claimData = useClaimPayoutData()
  const setPayoutData = useSetPayoutData()
  const getUserStatus = useGetUserStatus()
  const userStatus = useCurrentSessionUserStatus()
  const [isRankingsModalOpen, setIsRankingsModalOpen] = useState(false)
  const [isSubscribeModalOpen, setSubscribeModalOpen] = useState(false)
  const [isLostModalOpen, setIsLostModalOpen] = useState(false)
  const [congratsOpen, setCongratsOpen] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      if (sessionData.address === "") {
        await getCurrentSessionData(
          String(address),
          String(tokenId),
          Number(nonce)
        )
      }
      if (claimData === null) {
        await setPayoutData(account)
      }
      if (userStatus === -1) {
        await getUserStatus(String(address), String(tokenId))
      }
    }

    if (!address || !tokenId || !nonce) {
      alert("This is a broken link, we are redirecting you to the home page.")
      navigate("/")
    } else if ((account && chainId && networkSymbol) || isNetworkSymbolNone) {
      loadData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [claimData, sessionData, userStatus])

  useEffect(() => {
    if (
      (sessionData.address !== "" && sessionData.address !== address) ||
      (sessionData.tokenId !== "" && sessionData.tokenId !== tokenId) ||
      (sessionData.nonce !== 0 && sessionData.nonce !== Number(nonce))
    ) {
      getCurrentSessionData(String(address), String(tokenId), Number(nonce))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionData, address, tokenId, nonce])

  useEffect(() => {
    const localString = `${sessionData.address}${sessionData.tokenId}${sessionData.nonce}`
    const wasShown = localStorage.getItem(localString)
    if (
      wasShown === null &&
      sessionData &&
      sessionData.finalAppraisalValue &&
      sessionData.guessedAppraisal &&
      sessionData.guessedAppraisal !== -1 &&
      sessionData.winnerAmount &&
      !isWithinWinRange(
        sessionData.guessedAppraisal,
        sessionData.finalAppraisalValue,
        sessionData.winnerAmount
      )
    ) {
      console.log("guessed", sessionData.guessedAppraisal)
      setIsLostModalOpen(true)

      localStorage.setItem(localString, "true")
    }
  }, [sessionData])

  if (!account && !isNetworkSymbolNone) {
    return (
      <Container style={{ alignItems: "center", justifyContent: "center" }}>
        <ConnectWalletAlert />
      </Container>
    )
  }

  if (isLoading || sessionData === null) {
    return (
      <Container style={{ alignItems: "center", justifyContent: "center" }}>
        Loading... {/* TODO: find a loader */}
      </Container>
    )
  }

  return (
    <Container>
      <CardBar
        title={sessionData.collectionTitle}
        poolAmount={sessionData.totalStaked}
        poolAmountUSD={1}
        participants={sessionData.numPpl}
        owner={sessionData.owner}
      />
      <PricingSessionMainComponent
        cardInfo={{
          nftSrc: sessionData.image_url,
          nftTitle: "Saturiazone",
          endTime: 1647027719000,
          numParticipants: 69,
          poolAmount: 1.22,
          poolAmountDollars: 800,
          link: "http://google.com",
          imgs: [""],
        }}
        currentState={SessionState.Vote}
        currentEthBalance={1.1}
        openDepositModal={() => {}}
        onMainClick={() => {}}
        participation={{
          appraisal: 1,
          stake: 1.1,
          seedNumber: "0x1234",
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
            img: "/prof.jpeg",
            appraisalAmount: 1,
            stakeAmount: 1,
            appraisorAddress: "0x1234541234123",
          },
          {
            img: "/prof.jpeg",
            appraisalAmount: 1,
            stakeAmount: 1,
            appraisorAddress: "0x1234541234123",
          },
          {
            img: "/prof.jpeg",
            appraisalAmount: 1,
            stakeAmount: 1,
            appraisorAddress: "0x1234541234123",
          },
          {
            img: "/prof.jpeg",
            appraisalAmount: 1,
            stakeAmount: 1,
            appraisorAddress: "0x1234541234123",
          },
          {
            img: "/prof.jpeg",
            appraisalAmount: 1,
            stakeAmount: 1,
            appraisorAddress: "0x1234541234123",
          },
          {
            img: "/prof.jpeg",
            appraisalAmount: 1,
            stakeAmount: 1,
            appraisorAddress: "0x1234541234123",
          },
          {
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
            link: "google.com",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com",
          },
          {
            src: "https://pbs.twimg.com/profile_images/1484416288097116160/xLR2e4eu_400x400.png",
            link: "google.com",
          },
        ]}
      />
    </Container>
  )
}

export default CurrentSession
