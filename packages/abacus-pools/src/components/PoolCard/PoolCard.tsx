import React, { FunctionComponent } from "react"
import styled, { css } from "styled-components"
import { Section, Kilo, Mega } from "abacus-ui"
import { Link } from "gatsby"
import { useTokenLockHistory } from "@state/poolData/hooks"
import { calculateVariance } from "utils/stats"
import { TokenLockHistoryChart } from "../TokenLockHistoryChart"
import { NFTImage } from "../NFTImage"

const StyledSection = styled(Section)`
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  row-gap: 24px;

  &:focus-within,
  &:hover {
    transform: scale(1.01);
  }
`

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  max-width: 66%;
`

const CardInfoContent = styled(Mega)`
  font-size: 22px;
  display: flex;
`

const CardInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  & ${CardInfo}:last-of-type {
    align-items: flex-end;
  }
`

const CardTitle = styled(CardInfoContent)`
  color: ${({ theme }) => theme.colors.core.primary};
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
  width: 100%;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.core.primary};
    &::after {
      opacity: 0.2;
      background-color: white;
    }
  }

  &::after {
    transition: all ${({ theme }) => theme.transitionTime.main}, opacity 0;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-radius: ${({ theme }) => theme.borderRadius.section};
  }
`

const Variation = styled.div<{ variation: number }>`
  margin-right: 4px;
  ${({ variation }) =>
    variation < 0
      ? css`
          color: ${({ theme }) => theme.colors.utility.red};
        `
      : ""}
  ${({ variation }) =>
    variation > 0
      ? css`
          color: ${({ theme }) => theme.colors.utility.green};
        `
      : ""}
`

const StyledTokenLockHistoryChart = styled(TokenLockHistoryChart)`
  justify-self: flex-end;
`

type PoolCardProps = {
  title: string
  imgSrc: string
  poolSize: string
  participants: number
  link: string
  vaultId: string
}

const PoolCard: FunctionComponent<PoolCardProps> = ({
  imgSrc,
  title,
  poolSize,
  participants,
  link,
  vaultId,
}) => {
  const tokenLockHistory = useTokenLockHistory(vaultId)
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
  return (
    <StyledSection>
      <NFTImage src={imgSrc} />
      <CardInfoRow>
        <CardInfo>
          <CardTitle as={Link} to={link}>
            {title}
          </CardTitle>
          <Kilo>Pool Name</Kilo>
        </CardInfo>
        <CardInfo>
          <CardInfoContent>{poolSize}ETH</CardInfoContent>
          <Kilo>Pool Size</Kilo>
        </CardInfo>
      </CardInfoRow>
      <CardInfoRow>
        <CardInfo>
          <CardInfoContent>
            <Variation variation={variation}>
              {variation > 0 ? "+" : ""}
              {variation}
            </Variation>
            ETH
          </CardInfoContent>
          <Kilo>Pool Variation (7d)</Kilo>
        </CardInfo>
        <CardInfo>
          <CardInfoContent>{participants}</CardInfoContent>
          <Kilo>Participants</Kilo>
        </CardInfo>
      </CardInfoRow>
      <StyledTokenLockHistoryChart data={tokenLockHistory} showYAxis />
    </StyledSection>
  )
}

export default PoolCard
