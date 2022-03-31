import React, { useEffect } from "react"
import styled from "styled-components"
import { Loader, Section, Kilo, Mega, Media } from "abacus-ui"
import { useSetPools, useGetPools } from "@state/poolData/hooks"
import { PoolCard } from "@components/PoolCard"
import { Container } from "../../layouts/styles"

const LoadingContainer = styled.div`
  display: flex;
  position: fixed;
  top: 10vh;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  align-items: center;
  justify-content: center;

  & > * {
    height: 200px;
  }
`

const InfoBarContainer = styled(Section)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;

  ${Media.sm`
    flex-direction: row;  
    gap: 80px;
  `}
`
const InfoBarItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const InfoBarTitle = styled(Kilo)`
  text-align: left;
`

const InfoBarContent = styled(Mega)`
  font-size: 22px;
  font-weight: bold;
  text-align: left;
`

const PoolGrid = styled.div`
  display: grid;
  grid-row-gap: 24px;
  grid-column-gap: 32px;

  ${Media.sm`
    grid-template-columns: repeat(2, 1fr);
  `}

  ${Media.md`
    grid-template-columns: repeat(3, 1fr);
  `}
`

const Home: React.FC = () => {
  const setPools = useSetPools()
  const pools = useGetPools()

  useEffect(() => {
    setPools(null)
  }, [setPools])

  if (!pools) {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    )
  }
  return (
    <Container>
      <InfoBarContainer>
        <InfoBarItem>
          <InfoBarTitle>Active Spot Pools</InfoBarTitle>
          <InfoBarContent>1234</InfoBarContent>
        </InfoBarItem>
        <InfoBarItem>
          <InfoBarTitle>Amount in Pools</InfoBarTitle>
          <InfoBarContent>121,324,343.34 ETH</InfoBarContent>
        </InfoBarItem>
        <InfoBarItem>
          <InfoBarTitle>Total Participants</InfoBarTitle>
          <InfoBarContent>121,324</InfoBarContent>
        </InfoBarItem>
      </InfoBarContainer>

      <PoolGrid>
        {pools.map((pool, index) => (
          <PoolCard
            key={`${pool.address}-${pool.tokenId}-${pool.nonce}`}
            link={`/pool?address=${pool.address}&tokenId=${pool.tokenId}&nonce=${pool.nonce}`}
            imgSrc={pool.img}
            title={pool.nftName}
            participants={45}
            poolSize={Number(pool.tokensLocked)}
            variation={3.2 * (index % 2 === 0 ? -1 : 1)}
          />
        ))}
      </PoolGrid>
    </Container>
  )
}

export default Home
