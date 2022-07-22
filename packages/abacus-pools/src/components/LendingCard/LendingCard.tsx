import React from "react"
import { Kilo } from "abacus-ui"
import { Link } from "gatsby"
import { round2Decimals } from "@utils"
import { NFTImage } from "../NFTImage"
import {
  NumericallyConditionalText,
  CardContainer,
  CardInfo,
  CardInfoContent,
  CardInfoRow,
  CardTitle,
  LendingProgressBar,
} from ".."

type LendingCardProps = {
  title: string
  nft: {
    img: string
    alt: string
  }
  borrowed: number
  link?: string
  available: number
  healthRatio?: number
  className?: string
}

const LendingCard = ({
  title,
  nft,
  borrowed,
  link,
  available,
  healthRatio,
  className,
}: LendingCardProps) => {
  const total = available + borrowed
  const progress = borrowed / total
  return (
    <CardContainer className={className} hasLink={!!link}>
      <NFTImage src={nft.img} alt={nft.alt} />
      <CardInfoRow flexGrow>
        <CardInfo>
          <CardTitle as={link ? Link : "a"} to={link} hasLink={!!link}>
            {title ?? "Untitled"}
          </CardTitle>
          <Kilo>Collection</Kilo>
        </CardInfo>
        <CardInfo>
          <CardInfoContent>
            <NumericallyConditionalText value={healthRatio}>
              {round2Decimals(healthRatio)}
            </NumericallyConditionalText>
          </CardInfoContent>
          <Kilo>Health Ratio</Kilo>
        </CardInfo>
      </CardInfoRow>

      <CardInfoRow>
        <CardInfo>
          <CardInfoContent>
            {round2Decimals(borrowed)}
            ETH
          </CardInfoContent>
          <Kilo>Borrowed</Kilo>
        </CardInfo>
        <CardInfo>
          <CardInfoContent>~{round2Decimals(available)} ETH</CardInfoContent>
          <Kilo>Available</Kilo>
        </CardInfo>
      </CardInfoRow>
      <LendingProgressBar progress={progress} />
    </CardContainer>
  )
}

export { LendingCard }
