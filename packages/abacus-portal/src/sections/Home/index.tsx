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
import {
  ExploreCarousel,
  H2,
  P,
  AbacusBar,
  Media,
  ExploreScrollableCard,
  ExploreCardProps,
} from "abacus-ui"
import { ExploreFilters } from "@components/index"

const FeaturedHeader = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 16px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  gap: 16px;
  width: 100%;
  max-width: 1280px;
  box-sizing: border-box;

  ${Media.lg`
    gap: 0;
    text-align: left;
    flex-direction: row;
    padding: 50px 80px;
  `}
`

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  max-width: 1280px;
  margin: 100px 80px;
  margin-top: 50px;
  padding: 0 16px;

  ${Media.lg`
    margin: 100px 0;
    grid-template-columns: 260px 1fr;
    grid-column-gap: 45px;
  `}

  ${Media.xl`
    padding: 0;
  `}
`

const ExploreGrid = styled.div`
  display: grid;
  grid-row-gap: 28px;
  margin-top: 28px;

  ${Media.sm`
    grid-template-columns: repeat(2, calc(50% - 12px));
    grid-column-gap: 24px;
    grid-row-gap: 28px;
  `}

  ${Media.lg`
    margin-top: 0;
  `}
`

const CardContainer = styled.div`
  max-width: 480px;
  width: 100%;
  justify-self: center;
`

const LOADING_CARD_INFO: ExploreCardProps = {
  nftSrc: "",
  nftTitle: "",
  endTime: 0,
  numParticipants: 0,
  poolAmount: 0,
  poolAmountDollars: 0,
  imgs: [],
  link: "",
}

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

  console.log(process.env.NODE_ENV)

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
        endTime: new Date().getTime() + 100000,
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
        currentStatus: session.currentStatus,
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
          totalNumberOfBeads={cards.length || 7}
          currentPosition={cardIndex}
          changeToPosition={setCardIndex}
          loading={isLoading}
        />
      </FeaturedHeader>
      <ExploreCarousel
        loading={isLoading}
        cards={cards}
        currentMid={cardIndex}
        setCurrentMid={setCardIndex}
      />
      <GridContainer>
        <ExploreFilters />
        <ExploreGrid>
          {isLoading ? (
            <CardContainer>
              <ExploreScrollableCard
                cardInfo={LOADING_CARD_INFO}
                currentStatus={0}
                loading
              />
            </CardContainer>
          ) : (
            cards.map(({ currentStatus, ...card }) => (
              <CardContainer key={card.link}>
                <ExploreScrollableCard
                  cardInfo={card}
                  currentStatus={currentStatus}
                />
              </CardContainer>
            ))
          )}
        </ExploreGrid>
      </GridContainer>
    </>
  )
}

export default Home
