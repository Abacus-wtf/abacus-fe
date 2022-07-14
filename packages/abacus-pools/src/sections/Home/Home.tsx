import React, { useEffect } from "react"
import styled from "styled-components"
import { Loader } from "abacus-ui"
import { useSetPools, useGetPools } from "@state/poolData/hooks"
import {
  PoolCard,
  ExploreFilters,
  InfoBarContainer,
  InfoBarContent,
  InfoBarItem,
  InfoBarTitle,
  CardGrid,
} from "@components/index"
import {
  useAggregate,
  useCurrentEpoch,
  useGetAggregate,
} from "@state/application/hooks"
import { formatEther } from "ethers/lib/utils"
import { BigNumber } from "ethers"
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

const Home: React.FC = () => {
  const setPools = useSetPools()
  const pools = useGetPools()
  const aggregate = useAggregate()
  const getAggregate = useGetAggregate()
  const currentEpoch = useCurrentEpoch()

  useEffect(() => {
    getAggregate()
  }, [getAggregate])

  useEffect(() => {
    setPools()
  }, [setPools])

  if (!pools) {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    )
  }

  const TVL = aggregate
    ? formatEther(BigNumber.from(aggregate.TVL).div(BigNumber.from("1000")))
    : "-"
  return (
    <Container>
      <InfoBarContainer>
        <InfoBarItem>
          <InfoBarTitle>Active Spot Pools</InfoBarTitle>
          <InfoBarContent>{aggregate?.totalPools ?? "-"}</InfoBarContent>
        </InfoBarItem>
        <InfoBarItem>
          <InfoBarTitle>Amount in Pools</InfoBarTitle>
          <InfoBarContent>{TVL}ETH</InfoBarContent>
        </InfoBarItem>
        <InfoBarItem>
          <InfoBarTitle>Total Participants</InfoBarTitle>
          <InfoBarContent>{aggregate?.totalParticipants ?? "-"}</InfoBarContent>
        </InfoBarItem>
        <InfoBarItem>
          <InfoBarTitle>Current Epoch</InfoBarTitle>
          <InfoBarContent>{currentEpoch ?? "-"}</InfoBarContent>
        </InfoBarItem>
      </InfoBarContainer>
      <ExploreFilters page={0} />

      <CardGrid>
        {pools.map((pool) => (
          <PoolCard
            key={`${pool.vaultAddress}`}
            link={`/pool/${pool.vaultAddress}`}
            title={pool.name}
            nfts={pool.nfts}
            participants={pool.totalParticipants}
            vaultId={pool.vaultAddress}
          />
        ))}
      </CardGrid>
    </Container>
  )
}

export default Home
