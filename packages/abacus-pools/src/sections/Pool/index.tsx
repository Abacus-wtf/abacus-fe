import React, { useEffect, useState } from "react"
import { Title, SmallUniversalContainer } from "@components/global.styles"
import * as queryString from "query-string"
import { ButtonsWhite } from "@components/Button"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { useGetPoolData, useSetPoolData } from "@state/singlePoolData/hooks"
import { useActiveWeb3React } from "@hooks/index"
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
  const { address, tokenId, nonce } = queryString.parse(location.search)
  const setPool = useSetPoolData()
  const poolData = useGetPoolData()
  const [page, setPage] = useState(0)
  const { account } = useActiveWeb3React()

  useEffect(() => {
    setPool(String(address), String(tokenId), Number(nonce))
  }, [address, tokenId, nonce, setPool])

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
          <FileContainer
            {...poolData}
            img={poolData.img || "s"}
            animation_url={null}
          />
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
          <ButtonContainer>
            <ButtonsWhite
              disabled={page === 0}
              onClick={() => setPage(0)}
              style={{ borderRadius: 8 }}
            >
              Main
            </ButtonsWhite>
            {account ? (
              <ButtonsWhite
                disabled={page === 1}
                onClick={() => setPage(1)}
                style={{ borderRadius: 8 }}
              >
                Current Positions
              </ButtonsWhite>
            ) : null}
            {poolData.isManager && (
              <ButtonsWhite
                disabled={page === 2}
                onClick={() => setPage(2)}
                style={{ borderRadius: 8 }}
              >
                Manage Pool
              </ButtonsWhite>
            )}
          </ButtonContainer>

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
          <CurrentState page={page} status={poolData.state} />
        </VerticalContainer>
      </SplitContainer>
    </SmallUniversalContainer>
  )
}

export default Pool
