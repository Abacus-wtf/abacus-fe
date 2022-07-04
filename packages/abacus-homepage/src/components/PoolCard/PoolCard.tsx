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
  NumNFTsPill,
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
  nfts,
  poolName,
  poolSize,
  link,
  fetching,
}) => {
  if (fetching) {
    return <PoolCardFallback />
  }
  const src = nfts?.[0].imgSrc ?? ""
  const alt = nfts?.[0].alt ?? ""
  return (
    <Container>
      <Image src={src} alt={alt} />
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
      <NumNFTsPill>
        {nfts.length} NFT{nfts.length > 1 ? "s" : ""}
      </NumNFTsPill>
    </Container>
  )
}

export default PoolCard
