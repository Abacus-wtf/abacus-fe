import { BigNumber } from "@ethersproject/bignumber"
import { Kilo, Mega } from "abacus-ui"
import { formatEther } from "ethers/lib/utils"
import React, { FunctionComponent } from "react"
import styled from "styled-components"

export type PoolCardProps = {
  imgSrc: string
  alt?: string
  poolName: string
  poolSize: BigNumber
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.core.white};
  box-shadow: ${({ theme }) => theme.boxShadow.section};
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  padding: 16px;
`

const Image = styled.img`
  aspect-ratio: 1 / 1;
  border-radius: 24px;
  width: 100%;
`

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`

const Info = styled.div<{ right?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ right }) => (right ? "flex-end" : "flex-start")};
`

const InfoData = styled(Mega)`
  font-size: 22px;
`

const InfoTitle = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core[900]};
`

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
