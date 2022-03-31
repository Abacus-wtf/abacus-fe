import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Section, Kilo, Mega } from "abacus-ui"
import { Link } from "gatsby"

const StyledSection = styled(Section)`
  position: relative;
  display: flex;
  flex-direction: column;
`

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  display: grid;
`

const StyledImg = styled.img`
  width: 100%;
  align-self: center;
`

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`

const CardInfoContent = styled(Mega)`
  font-size: 22px;
`

const CardInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 24px;

  & ${CardInfo}:last-of-type {
    text-align: right;
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
  }
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
    <ImageContainer>
      <StyledImg src={imgSrc} alt="" />
    </ImageContainer>
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
        <CardInfoContent>{variation}</CardInfoContent>
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
