import React, { useEffect, useState } from "react"
import { Title, SmallUniversalContainer } from "@components/global.styles"
import * as queryString from "query-string"
import { ButtonsWhite } from "@components/Button"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { useGetPoolData, useSetPoolData } from "@state/singlePoolData/hooks"
import { useActiveWeb3React } from "@hooks/index"
import { PoolStatus } from "@state/poolData/reducer"
import {
  SplitContainer,
  VerticalContainer,
  VerticalSmallGapContainer,
  FileContainer,
  SubText,
  ButtonContainer,
  Tab,
} from "./Pool.styles"
import CurrentState from "./CurrentState/index"

export enum Page {
  Main,
  CurrentPositions,
  ManagePool,
  Tickets,
  Bribes,
}

const Pool = ({ location }) => {
  const { address, tokenId, nonce } = queryString.parse(location.search)
  const setPool = useSetPoolData()
  const poolData = useGetPoolData()
  const [page, setPage] = useState(Page.Main)
  const { account } = useActiveWeb3React()

  useEffect(() => {
    setPool(String(address), String(tokenId), Number(nonce))
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
          {!poolData.auction ? (
            <>
              <ButtonContainer>
                <Tab
                  disabled={page === Page.Main}
                  onClick={() => setPage(Page.Main)}
                >
                  {poolData.state === PoolStatus.Auction ? "Auction" : "Main"}
                </Tab>
                {account ? (
                  <Tab
                    disabled={page === Page.CurrentPositions}
                    onClick={() => setPage(Page.CurrentPositions)}
                  >
                    Current Positions
                  </Tab>
                ) : null}
                <Tab
                  disabled={page === Page.Tickets}
                  onClick={() => setPage(Page.Tickets)}
                >
                  Tickets
                </Tab>
              </ButtonContainer>
              <ButtonContainer>
                {poolData.isManager && (
                  <Tab
                    disabled={page === Page.ManagePool}
                    onClick={() => setPage(Page.ManagePool)}
                  >
                    Manage Pool
                  </Tab>
                )}
                <Tab
                  disabled={page === Page.Bribes}
                  onClick={() => setPage(Page.Bribes)}
                >
                  Bribes
                </Tab>
              </ButtonContainer>
            </>
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
          <CurrentState
            page={page}
            status={poolData.state}
            refresh={() =>
              setPool(String(address), String(tokenId), Number(nonce))
            }
          />
        </VerticalContainer>
      </SplitContainer>
    </SmallUniversalContainer>
  )
}

export default Pool
