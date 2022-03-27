import React, { FunctionComponent, useState, useMemo } from "react"
import styled from "styled-components"
import { H2, P, AbacusBar, Media } from "abacus-ui"
import {
  useFeaturedSessionState,
  useGetFeaturedSessionData,
} from "@state/sessionData/hooks"
import { PromiseStatus } from "@models/PromiseStatus"
import { ExploreCarousel } from "@components/index"
import { mapSessionData } from "./helpers"
import useInitializeData from "./useInitializeData"

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

const FeaturedSessions: FunctionComponent = () => {
  const getFeaturedSessionData = useGetFeaturedSessionData()

  useInitializeData(() => getFeaturedSessionData())

  const { featuredSessionData, fetchStatus: featuredSessionFetchStatus } =
    useFeaturedSessionState()
  const isFeaturedSessionLoading =
    featuredSessionFetchStatus === PromiseStatus.Pending

  const featuredSessionCards = useMemo(
    () => featuredSessionData.map(mapSessionData),
    [featuredSessionData]
  )

  const [cardIndex, setCardIndex] = useState(0)

  if (!isFeaturedSessionLoading && featuredSessionData.length === 0) {
    return null
  }

  return (
    <>
      <FeaturedHeader>
        <div>
          <H2>Featured today</H2>
          <P>Being appraised on Abacus right now!</P>
        </div>
        <AbacusBar
          totalNumberOfBeads={
            isFeaturedSessionLoading ? 7 : featuredSessionData.length
          }
          currentPosition={cardIndex}
          changeToPosition={setCardIndex}
          loading={isFeaturedSessionLoading}
        />
      </FeaturedHeader>
      <ExploreCarousel
        loading={isFeaturedSessionLoading}
        cards={featuredSessionCards}
        currentMid={cardIndex}
        setCurrentMid={setCardIndex}
      />
    </>
  )
}

export default FeaturedSessions
