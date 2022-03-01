import React, { FunctionComponent, useMemo } from "react"
import styled from "styled-components"
import { ExploreScrollableCard, ExploreCardProps } from "abacus-ui"
import {
  useGetMultiSessionData,
  useMultiSessionState,
} from "@state/sessionData/hooks"
import { PromiseStatus } from "@models/PromiseStatus"
import { mapSessionData } from "./helpers"
import useInitializeData from "./useInitializeData"

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

const MultiSessions: FunctionComponent = () => {
  const getMultiSessionData = useGetMultiSessionData()

  useInitializeData(() => getMultiSessionData(null))

  const {
    multiSessionData,
    fetchStatus: multiSessionFetchStatus,
    // isLastPage,
  } = useMultiSessionState()
  const isMultiSessionLoading =
    multiSessionFetchStatus === PromiseStatus.Pending

  const multiSessionCards = useMemo(
    () => multiSessionData.map(mapSessionData),
    [multiSessionData]
  )

  if (isMultiSessionLoading) {
    return (
      <CardContainer>
        <ExploreScrollableCard
          cardInfo={LOADING_CARD_INFO}
          currentStatus={0}
          loading
        />
      </CardContainer>
    )
  }

  if (multiSessionCards.length === 0) {
    return <div>No sessions matched your filters</div>
  }

  return (
    <>
      {multiSessionCards.map(({ currentStatus, ...card }) => (
        <CardContainer key={card.link}>
          <ExploreScrollableCard
            cardInfo={card}
            currentStatus={currentStatus}
          />
        </CardContainer>
      ))}
    </>
  )
}

export default MultiSessions
