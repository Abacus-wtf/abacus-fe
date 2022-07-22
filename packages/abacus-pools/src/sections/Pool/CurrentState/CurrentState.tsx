import { NFTImage } from "@components/index"
import { useGetPoolData, useCurrentPoolSize } from "@state/singlePoolData/hooks"
import { Section, Media, Pill, ProgressBar, Checkbox } from "abacus-ui"
import React, { FunctionComponent, useMemo, useState } from "react"
import styled from "styled-components"
import PurchaseTokens from "./PurchaseTokens"
import OwnerSection from "../OwnerSection"
import {
  CurrentTicket,
  CurrentTicketValue,
  PageContainer,
  ProgressLabel,
  ProgressValue,
  Title,
  TitleContainer,
  UpperContainer,
} from "./CurrentState.styled"
import { Bribes } from "./Bribes"
import { SellTokens } from "./SellTokens"
import { useSellTokensData } from "./SellTokens/useSellTokensData"
import { Reserve } from "./Reserve"

enum Page {
  PurchaseTokens = "Purchase Tokens",
  Bribes = "Bribes",
  SellTokens = "Sell Tokens",
  Reserve = "Reserve",
}

const Container = styled(Section)`
  display: grid;
  grid-template-columns: 100%;
  grid-column-gap: 55px;
  grid-row-gap: 12px;
  position: relative;

  ${Media.sm`
    grid-template-columns: repeat(2, calc(50% - 27.5px));
  `}

  ${Media.lg`
    grid-template-columns: 445px 1fr;
  `}
`

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 24px;
  align-self: flex-start;
  border-radius: ${({ theme }) => theme.borderRadius.main};
  overflow: hidden;
  position: relative;
`

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  grid-row-gap: 24px;
`

const StyledPill = styled(Pill)`
  position: absolute;
  top: 8px;
  right: 8px;
`

type CurrentStateProps = {
  refreshPoolData: () => void
}

const CurrentState: FunctionComponent<CurrentStateProps> = ({
  refreshPoolData,
}) => {
  const [page, setPage] = useState<Page>(Page.PurchaseTokens)
  const { nfts, isManager } = useGetPoolData()
  const size = useCurrentPoolSize()
  const { sellablePositions } = useSellTokensData()
  const hasSellablePositions = sellablePositions?.length > 0

  const pageUi = useMemo(() => {
    switch (page) {
      case Page.PurchaseTokens:
        return <PurchaseTokens refreshPoolData={refreshPoolData} />
      case Page.Bribes:
        return <Bribes refreshPoolData={refreshPoolData} />
      case Page.SellTokens:
        return <SellTokens refreshPoolData={refreshPoolData} />
      case Page.Reserve:
        return <Reserve refreshPoolData={refreshPoolData} />
      default:
        return null
    }
  }, [page, refreshPoolData])

  const src = nfts?.[0]?.img ?? ""

  const numTokensLocked = Number(size)
  const currentTicketTokensLocked = Math.floor(numTokensLocked * 1000) % 1000
  const currentTicket = Math.floor(numTokensLocked) + 1
  const percentTicketsSold = currentTicketTokensLocked / 1000
  const progressLabel = useMemo(() => {
    const percentForDislplay = Number(
      (percentTicketsSold * 100).toLocaleString("en-US", {
        minimumSignificantDigits: 2,
        maximumSignificantDigits: 2,
      })
    )
    const numLeft = 1000 - currentTicketTokensLocked
    return (
      <ProgressLabel>
        <ProgressValue>{percentForDislplay}</ProgressValue>% filled /&nbsp;
        <ProgressValue>{numLeft}</ProgressValue>&nbsp;tokens left
      </ProgressLabel>
    )
  }, [currentTicketTokensLocked, percentTicketsSold])

  return (
    <Container>
      <LeftSection>
        <StyledPill>
          {nfts?.length ?? "-"} NFT{nfts?.length ?? 0 > 1 ? "s" : ""}
        </StyledPill>
        <NFTImage src={src} />
        {isManager && <OwnerSection refreshPoolData={refreshPoolData} />}
      </LeftSection>
      <RightSection>
        <UpperContainer>
          <TitleContainer>
            <CurrentTicket>
              Current Ticket:
              <CurrentTicketValue>#{currentTicket}</CurrentTicketValue>
            </CurrentTicket>
            <Title>{page}</Title>
          </TitleContainer>
          <ProgressBar progress={percentTicketsSold} label={progressLabel} />
          <PageContainer>
            <Checkbox
              key={Page.PurchaseTokens}
              type="radio"
              name="page_selector"
              label={Page.PurchaseTokens}
              id={Page.PurchaseTokens}
              value={Page.PurchaseTokens}
              checked={page === Page.PurchaseTokens}
              onChange={() => setPage(Page.PurchaseTokens)}
            />
            {hasSellablePositions && (
              <Checkbox
                key={Page.SellTokens}
                type="radio"
                name="page_selector"
                label={Page.SellTokens}
                id={Page.SellTokens}
                value={Page.SellTokens}
                checked={page === Page.SellTokens}
                onChange={() => setPage(Page.SellTokens)}
              />
            )}
            <Checkbox
              key={Page.Bribes}
              type="radio"
              name="page_selector"
              label={Page.Bribes}
              id={Page.Bribes}
              value={Page.Bribes}
              checked={page === Page.Bribes}
              onChange={() => setPage(Page.Bribes)}
            />
            {isManager && (
              <Checkbox
                key={Page.Reserve}
                type="radio"
                name="page_selector"
                label={Page.Reserve}
                id={Page.Reserve}
                value={Page.Reserve}
                checked={page === Page.Reserve}
                onChange={() => setPage(Page.Reserve)}
              />
            )}
          </PageContainer>
        </UpperContainer>
        {pageUi}
      </RightSection>
    </Container>
  )
}

export default CurrentState
