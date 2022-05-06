import { useEthToUSD } from "@state/application/hooks"
import React, { FunctionComponent } from "react"
import { formatEther } from "ethers/lib/utils"
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
  const { size, auction } = useGetPoolData()
  const price = Number(formatEther(size))
  const priceUSD = useEthToUSD(price)

  const end = auction.auctionEndTime

  return (
    <Container>
      <InfoWrapper>
        <InfoLabel>Reserve Price</InfoLabel>
        <InfoData>{price} ETH</InfoData>
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
