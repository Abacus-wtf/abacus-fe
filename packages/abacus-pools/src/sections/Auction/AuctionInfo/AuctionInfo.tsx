import { useEthToUSD } from "@state/application/hooks"
import React, { FunctionComponent } from "react"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import Countdown from "./Countdown"
import {
  Container,
  InfoWrapper,
  InfoLabel,
  InfoData,
  InfoSecondaryData,
} from "./AuctionInfo.styled"

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
        <Countdown endTime={end} />
      </InfoWrapper>
    </Container>
  )
}

export { AuctionInfo }
