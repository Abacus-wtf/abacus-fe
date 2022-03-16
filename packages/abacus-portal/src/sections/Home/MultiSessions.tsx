import React, { FunctionComponent, useMemo } from "react"
import styled from "styled-components"
import { ExploreScrollableCard, ExploreCardProps, Media } from "abacus-ui"
import {
  useGetMultiSessionData,
  useMultiSessionState,
} from "@state/sessionData/hooks"
import { InfinteScroll } from "@components/index"
import { PromiseStatus } from "@models/PromiseStatus"
import { mapSessionData } from "./helpers"
import useInitializeData from "./useInitializeData"

const CardContainer = styled.div`
  max-width: 480px;
  width: 100%;
  justify-self: center;
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

const StyledInfiniteScroll = styled(InfinteScroll)`
  ${Media.sm`
    grid-column: span 2;
  `}
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

type MultiSessionsProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const MultiSessions: FunctionComponent<MultiSessionsProps> = ({ setPage }) => {
  const getMultiSessionData = useGetMultiSessionData()

  useInitializeData(() => getMultiSessionData(null))

  const {
    multiSessionData,
    fetchStatus: multiSessionFetchStatus,
    isLastPage,
  } = useMultiSessionState()
  const isMultiSessionLoading =
    multiSessionFetchStatus === PromiseStatus.Pending

  const multiSessionCards = useMemo(
    () => multiSessionData.map(mapSessionData),
    [multiSessionData]
  )

  if (multiSessionCards.length === 0 && isMultiSessionLoading) {
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
            linkComponent={card.linkComponent}
          />
        </CardContainer>
      ))}
      <StyledInfiniteScroll
        isLastPage={isLastPage}
        loading={isMultiSessionLoading}
        inViewCallback={(inView) =>
          setPage((page) => (inView ? page + 1 : page))
        }
      />
    </>
  )
}

export default ({ setPage }: MultiSessionsProps) => (
  <ExploreGrid>
    <MultiSessions setPage={setPage} />
  </ExploreGrid>
)
