import { formatEther } from "ethers/lib.esm/utils"
import React, { FunctionComponent } from "react"
import { PoolCardProps } from "./models"
import {
  Container,
  Image,
  InfoContainer,
  Info,
  InfoData,
  InfoTitle,
} from "./PoolCard.styled"

const PoolCard: FunctionComponent<PoolCardProps> = ({
  imgSrc,
  alt = "",
  poolName,
  poolSize,
}) => (
  <Container>
    <Image src={imgSrc} alt={alt} />
    <InfoContainer>
      <Info>
        <InfoData>{poolName}</InfoData>
        <InfoTitle>Pool Name</InfoTitle>
      </Info>
      <Info right>
        <InfoData>{formatEther(poolSize)}</InfoData>
        <InfoTitle>Pool Size</InfoTitle>
      </Info>
    </InfoContainer>
  </Container>
)

export default PoolCard
