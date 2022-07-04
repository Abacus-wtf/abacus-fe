import { useEthToUSD } from "@state/application/hooks"
import React, { FunctionComponent } from "react"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { Countdown } from "@components/index"
import styled from "styled-components"
import {
  Container,
  InfoWrapper,
  InfoLabel,
  InfoData,
  InfoSecondaryData,
} from "./AuctionInfo.styled"

const StyledInfoData = styled(InfoData)`
  font-family: monospace;
`

const AuctionInfo: FunctionComponent = () => {
  const { auction } = useGetPoolData()
  const priceUSD = useEthToUSD(auction.highestBid)

  const end = auction.auctionEndTime * 1000

  return (
    <Container>
      <InfoWrapper>
        <InfoLabel>Highest Bid</InfoLabel>
        <InfoData>{auction.highestBid} ETH</InfoData>
        <InfoSecondaryData>${priceUSD}</InfoSecondaryData>
      </InfoWrapper>
      <InfoWrapper>
        <InfoLabel>Auction Ending in</InfoLabel>
        <StyledInfoData>
          <Countdown endTime={end} />
        </StyledInfoData>
      </InfoWrapper>
    </Container>
  )
}

export { AuctionInfo }
