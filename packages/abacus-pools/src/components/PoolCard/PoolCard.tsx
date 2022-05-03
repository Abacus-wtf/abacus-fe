import React, { FunctionComponent } from "react"
import styled, { css } from "styled-components"
import { Section, Kilo, Mega } from "abacus-ui"
import { Link } from "gatsby"
import { useTokenLockHistory } from "@state/poolData/hooks"
import { calculateVariance } from "utils/stats"
import { TokenLockHistoryChart } from "../TokenLockHistoryChart"
import { NFTImage } from "../NFTImage"

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  max-width: 50%;
`

const CardInfoContent = styled(Mega)`
  font-size: 22px;
  display: flex;
`

const CardInfoRow = styled.div<{ flexGrow?: boolean }>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex: ${({ flexGrow }) => (flexGrow ? "1 0 auto" : "unset")};

  & ${CardInfo}:last-of-type {
    align-items: flex-end;
  }
`

const StyledSection = styled(Section)<{ hasLink: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  row-gap: 24px;

  ${({ hasLink }) =>
    hasLink
      ? css`
          &:focus-within,
          &:hover {
            transform: scale(1.01);
          }
        `
      : null}
`

const CardTitle = styled(CardInfoContent)`
  color: ${({ theme }) => theme.colors.core.primary};
  text-decoration: none;

  ${({ hasLink }) =>
    hasLink
      ? css`
          &:hover,
          &:focus {
            color: ${({ theme }) => theme.colors.core.primary};
            &::after {
              opacity: 0.2;
              background-color: white;
            }
          }

          &::after {
            transition: all ${({ theme }) => theme.transitionTime.main},
              opacity 0;
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            border-radius: ${({ theme }) => theme.borderRadius.section};
          }
        `
      : null}
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

type PoolCardProps = {
  title: string
  imgSrc: string
  poolSize: string
  participants: number
  link?: string
  vaultId: string
  fullDetails?: boolean
  className?: string
}

const PoolCard: FunctionComponent<PoolCardProps> = ({
  imgSrc,
  title,
  poolSize,
  participants,
  link,
  vaultId,
  fullDetails = true,
  className,
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
    <StyledSection className={className} hasLink={!!link}>
      <NFTImage src={imgSrc} />
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
          <TokenLockHistoryChart data={tokenLockHistory} showYAxis />
        </>
      ) : null}
    </StyledSection>
  )
}

export default PoolCard
