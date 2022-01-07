import React, { useEffect, useState } from "react"
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
  ButtonContainer,
} from "./Pool.styles"
import CurrentState from "./CurrentState/index"

const Pool = ({ location }) => {
  const { address, tokenId } = queryString.parse(location.search)
  const setPool = useSetPoolData()
  const poolData = useGetPoolData()
  const [isManagerPage, setIsOnManagerPage] = useState(true)

  useEffect(() => {
    setPool(String(address), String(tokenId))
  }, [])

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
          <ButtonContainer>
            <ButtonsWhite
              style={{ borderRadius: 8 }}
              target="_blank"
              href={`https://opensea.io/assets/${poolData.address}/${poolData.tokenId}`}
              as={OutboundLink}
            >
              OpenSea
            </ButtonsWhite>
          </ButtonContainer>
        </VerticalContainer>
        <VerticalContainer>
          {poolData.isManager ? (
            <ButtonContainer>
              <ButtonsWhite
                disabled={isManagerPage}
                onClick={() => setIsOnManagerPage(true)}
                style={{ borderRadius: 8 }}
              >
                Manage
              </ButtonsWhite>
              <ButtonsWhite
                disabled={!isManagerPage}
                onClick={() => setIsOnManagerPage(false)}
                style={{ borderRadius: 8 }}
              >
                Main
              </ButtonsWhite>
            </ButtonContainer>
          ) : null}
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
          <CurrentState isOnManage={poolData.isManager && isManagerPage} />
        </VerticalContainer>
      </SplitContainer>
    </SmallUniversalContainer>
  )
}

export default Pool
