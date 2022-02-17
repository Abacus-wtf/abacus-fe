import React, { useState, useEffect, useRef, useMemo } from "react"
import {
  useGetMultiSessionData,
  useMultiSessionState,
} from "@state/sessionData/hooks"
import { PromiseStatus } from "@models/PromiseStatus"
import { useGetCurrentNetwork } from "@state/application/hooks"
import { usePrevious } from "@hooks/index"
import { NetworkSymbolEnum } from "@config/constants"
import styled from "styled-components"
import { ExploreCarousel, H2, P, AbacusBar, Media } from "abacus-ui"

const FeaturedHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 16px;
  justify-content: space-between;
  text-align: center;
  gap: 16px;

  ${Media.sm`
    gap: 0;
    text-align: left;
    flex-direction: row;
    padding: 50px 80px;
  `}
`

const Home: React.FC = () => {
  const isInitializedRef = useRef(false)
  const getMultiSessionData = useGetMultiSessionData()
  const { multiSessionData, fetchStatus, isLastPage } = useMultiSessionState()
  const [filterOpen, setFilterOpen] = useState(false)
  const [filters, setFilters] = useState<string | null>(null)
  const [isToolTipOpen, setIsToolTipOpen] = useState(false)
  const isLoading = fetchStatus === PromiseStatus.Pending
  const networkSymbol = useGetCurrentNetwork()
  const prevNetworkSymbol = usePrevious(networkSymbol)
  const isNewNetwork = networkSymbol !== prevNetworkSymbol
  const isNetworkSymbolNone = networkSymbol === NetworkSymbolEnum.NONE

  useEffect(() => {
    if (isNewNetwork) {
      isInitializedRef.current = false
    }

    if (!isInitializedRef.current) {
      isInitializedRef.current = true
      getMultiSessionData(null)
    }
  }, [getMultiSessionData, isNewNetwork])

  const cards = useMemo(
    () =>
      multiSessionData.map((session) => ({
        nftSrc: session.image_url,
        nftTitle: session.nftName,
        endTime: session.endTime,
        numParticipants: session.numPpl,
        poolAmount: session.totalStaked,
        poolAmountDollars: session.totalStakedInUSD,
        imgs: [
          "/temp_icon.png",
          "/temp_icon.png",
          "/temp_icon.png",
          "/temp_icon.png",
          "/temp_icon.png",
        ],
        link: `/current-session/?address=${session.address}&tokenId=${session.tokenId}&nonce=${session.nonce}`,
      })),
    [multiSessionData]
  )

  const [cardIndex, setCardIndex] = useState(0)

  return (
    <>
      <FeaturedHeader>
        <div>
          <H2>Featured today</H2>
          <P>Being appraised on Abacus right now!</P>
        </div>
        <AbacusBar
          totalNumberOfBeads={cards.length}
          currentPosition={cardIndex}
          changeToPosition={setCardIndex}
        />
      </FeaturedHeader>
      <ExploreCarousel
        cards={cards}
        currentMid={cardIndex}
        setCurrentMid={setCardIndex}
      />
    </>
  )
}

export default Home
