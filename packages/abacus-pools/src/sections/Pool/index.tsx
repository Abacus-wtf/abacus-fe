import React, { useEffect } from "react"
import { Title, SmallUniversalContainer } from "@components/global.styles"
import * as queryString from "query-string"
import { ButtonsWhite } from "@components/Button"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { useGetPoolData, useSetPoolData } from "@state/singlePoolData/hooks"
import {
  SplitContainer,
  VerticalContainer,
  VerticalSmallGapContainer,
  FileContainer,
  SubText,
} from "./Pool.styles"
import CurrentState from "./CurrentState/index"

const Pool = ({ location }) => {
  const { address, tokenId } = queryString.parse(location.search)
  const setPool = useSetPoolData()
  const poolData = useGetPoolData()

  useEffect(() => {
    setPool(String(address), String(tokenId))
  }, [])
  console.log(poolData)
  if (!poolData) {
    return (
      <SmallUniversalContainer
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        Loading... {/* TODO: find a loader */}
      </SmallUniversalContainer>
    )
  }

  return (
    <SmallUniversalContainer style={{ alignItems: "center" }}>
      <SplitContainer>
        <VerticalContainer>
          <FileContainer {...poolData} />
          <div style={{ display: "flex", gridGap: 15 }}>
            <ButtonsWhite
              style={{ borderRadius: 8 }}
              target="_blank"
              href={`https://opensea.io/assets/${poolData.address}/${poolData.tokenId}`}
              as={OutboundLink}
            >
              OpenSea
            </ButtonsWhite>
          </div>
        </VerticalContainer>
        <VerticalContainer>
          <VerticalSmallGapContainer style={{ minHeight: 90 }}>
            <SubText>{poolData.collectionTitle}</SubText>
            <Title>
              {poolData.nftName} #{poolData.tokenId}
            </Title>
            <SubText>
              Owned by{" "}
              <OutboundLink
                target="_blank"
                href={`https://opensea.io/${poolData.ownerAddress}`}
              >
                {poolData.owner}
              </OutboundLink>
            </SubText>
          </VerticalSmallGapContainer>
          <CurrentState />
        </VerticalContainer>
      </SplitContainer>
    </SmallUniversalContainer>
  )
}

export default Pool
