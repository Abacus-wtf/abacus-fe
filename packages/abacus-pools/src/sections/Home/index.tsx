import React, { useEffect } from "react"
import {
  Title,
  Subheader,
  UniversalContainer,
  SmallUniversalContainer,
} from "@components/global.styles"
import Button from "@components/Button"
import Card from "@components/Card"
import { useSetPools, useGetPools } from "@state/poolData/hooks"
import _ from "lodash"
import { navigate } from "gatsby"
import {
  BackgroundIMG,
  HeaderBar,
  CardContainer,
  Header,
  HeaderBarContainer,
} from "./Home.styles"

const Home: React.FC = () => {
  const setPools = useSetPools()
  const pools = useGetPools()

  useEffect(() => {
    setPools()
  }, [])

  if (!pools) {
    return (
      <SmallUniversalContainer
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        Loading... {/* TODO: find a loader */}
      </SmallUniversalContainer>
    )
  }

  return (
    <UniversalContainer>
      <BackgroundIMG />
      <HeaderBar>
        <Header>
          <Title>Highlighted</Title>
          <Subheader>Browse {pools ? pools.length : "-"} Total Pools</Subheader>
        </Header>
        <HeaderBarContainer>
          <Button id="createPool" onClick={() => navigate("/create-pool")}>
            Create Pool
          </Button>
        </HeaderBarContainer>
      </HeaderBar>

      <CardContainer>
        {_.map(pools, (i) => (
          <a
            href={`/pool?address=${i.address}&tokenId=${i.tokenId}`}
            key={`${i.address}-${i.tokenId}`}
          >
            <Card {...i} />
          </a>
        ))}
      </CardContainer>
    </UniversalContainer>
  )
}

export default Home
