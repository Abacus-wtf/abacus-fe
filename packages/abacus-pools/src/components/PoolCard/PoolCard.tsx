import React, { FunctionComponent } from "react"
import { Kilo } from "abacus-ui"
import { Link } from "gatsby"
import { usePoolSize, useTokenLockHistory } from "@state/poolData/hooks"
import { calculateVariance } from "utils/stats"
import { TokenLockHistoryChart } from "../TokenLockHistoryChart"
import { NFTImage } from "../NFTImage"
import {
  NumericallyConditionalText,
  CardContainer,
  CardInfo,
  CardInfoContent,
  CardInfoRow,
  CardTitle,
} from ".."

type PoolCardProps = {
  title: string
  nfts: {
    img: string
    alt: string
  }[]
  participants: number
  link?: string
  vaultId: string
  fullDetails?: boolean
  className?: string
}

const PoolCard: FunctionComponent<PoolCardProps> = ({
  nfts,
  title,
  participants,
  link,
  vaultId,
  fullDetails = true,
  className,
}) => {
  const tokenLockHistory = useTokenLockHistory(vaultId)
  const poolSize = usePoolSize(vaultId).toLocaleString("en-US", {
    maximumSignificantDigits: 4,
    minimumSignificantDigits: 2,
  })
  const lockHistoryValues: number[] =
    tokenLockHistory
      ?.map((lockedValues) => lockedValues.uv)
      .slice(tokenLockHistory.length - 7) ?? []
  const variation = parseFloat(
    calculateVariance(lockHistoryValues).toLocaleString("en-US", {
      maximumSignificantDigits: 2,
      minimumSignificantDigits: 2,
    })
  )
  const src = nfts?.[0]?.img ?? ""
  const alt = nfts?.[0]?.alt ?? ""
  return (
    <CardContainer className={className} hasLink={!!link}>
      <NFTImage src={src} alt={alt} numNfts={nfts?.length} />
      <CardInfoRow flexGrow>
        <CardInfo>
          <CardTitle as={link ? Link : "a"} to={link} hasLink={!!link}>
            {title}
          </CardTitle>
          <Kilo>Pool Name</Kilo>
        </CardInfo>
        <CardInfo>
          <CardInfoContent>{poolSize}ETH</CardInfoContent>
          <Kilo>Pool Size</Kilo>
        </CardInfo>
      </CardInfoRow>
      {fullDetails ? (
        <>
          <CardInfoRow>
            <CardInfo>
              <CardInfoContent>
                <NumericallyConditionalText value={variation}>
                  {variation > 0 ? "+" : ""}
                  {variation}
                </NumericallyConditionalText>
                ETH
              </CardInfoContent>
              <Kilo>Pool Variation (7d)</Kilo>
            </CardInfo>
            <CardInfo>
              <CardInfoContent>{participants}</CardInfoContent>
              <Kilo>Participants</Kilo>
            </CardInfo>
          </CardInfoRow>
          <TokenLockHistoryChart data={tokenLockHistory} showYAxis />
        </>
      ) : null}
    </CardContainer>
  )
}

export default PoolCard
