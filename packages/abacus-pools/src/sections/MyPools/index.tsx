import React, { useEffect } from "react"
import {
  Title,
  UniversalContainer,
  SmallUniversalContainer,
} from "@components/global.styles"
import Card from "@components/Card"
import { useSetMyPools, useGetMyPools } from "@state/poolData/hooks"
import _ from "lodash"
import {
  BackgroundIMG,
  HeaderBar,
  CardContainer,
  Header,
} from "../Home/Home.styles"

const Home: React.FC = () => {
  const setMyPools = useSetMyPools()
  const myPools = useGetMyPools()

  useEffect(() => {
    setMyPools()
  }, [])

  if (!myPools) {
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
          <Title>My Pools</Title>
        </Header>
      </HeaderBar>

      <CardContainer>
        {_.map(myPools, (i) => (
          <a
            href={`/manage-pool?address=${i.address}&tokenId=${i.tokenId}`}
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
