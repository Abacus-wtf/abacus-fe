import React, { FunctionComponent } from "react"
import styled, { css } from "styled-components"
import { Section, Kilo, Mega } from "abacus-ui"
import { Link } from "gatsby"
import { NFTImage } from "../NFTImage"

const StyledSection = styled(Section)`
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;

  &:focus-within,
  &:hover {
    transform: scale(1.01);
  }
`

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`

const CardInfoContent = styled(Mega)`
  font-size: 22px;
  display: flex;
`

const CardInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 24px;

  & ${CardInfo}:last-of-type {
    align-items: flex-end;
  }
`

const CardTitle = styled(CardInfoContent)`
  color: ${({ theme }) => theme.colors.core.primary};
  text-decoration: none;

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

type PoolCardProps = {
  title: string
  imgSrc: string
  poolSize: number
  variation: number
  participants: number
  link: string
}

const PoolCard: FunctionComponent<PoolCardProps> = ({
  imgSrc,
  title,
  poolSize,
  variation,
  participants,
  link,
}) => (
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
        <CardInfoContent>{poolSize}</CardInfoContent>
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
  </StyledSection>
)

export default PoolCard
