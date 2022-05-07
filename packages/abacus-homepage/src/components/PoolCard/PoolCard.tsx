import { formatEther } from "ethers/lib.esm/utils"
import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { PoolCardFallback } from "."
import { PoolCardProps } from "./models"
import {
  Container,
  Image,
  InfoContainer,
  Info,
  InfoData,
  InfoTitle,
} from "./PoolCard.styled"

const InfoDataLink = styled(InfoData)`
  color: ${({ theme }) => theme.colors.core.primary};
  text-decoration: none;

  &::after {
    border-radius: ${({ theme }) => theme.borderRadius.section};
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  &:hover {
    &::after {
      background-color: ${({ theme }) => theme.colors.utility.white}25;
    }
  }
`

const PoolCard: FunctionComponent<PoolCardProps> = ({
  imgSrc,
  alt = "",
  poolName,
  poolSize,
  link,
  fetching,
}) => {
  if (fetching) {
    return <PoolCardFallback />
  }
  return (
    <Container>
      <Image src={imgSrc} alt={alt} />
      <InfoContainer>
        <Info>
          <InfoDataLink as="a" href={link}>
            {poolName}
          </InfoDataLink>
          <InfoTitle>Pool Name</InfoTitle>
        </Info>
        <Info right>
          <InfoData>{parseFloat(formatEther(poolSize)) / 1000}ETH</InfoData>
          <InfoTitle>Pool Size</InfoTitle>
        </Info>
      </InfoContainer>
    </Container>
  )
}

export default PoolCard
