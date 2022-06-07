import React, { FunctionComponent, useEffect, useState } from "react"
import { PageProps } from "gatsby"
import * as queryString from "query-string"
import { Media, Section } from "abacus-ui"
import styled, { createGlobalStyle } from "styled-components"
import {
  useGetPoolData,
  useGetTickets,
  useSetPoolData,
} from "@state/singlePoolData/hooks"
import { NFTImage } from "@components/NFTImage"
import { Container } from "../../layouts/styles"
import { InfoBar } from "./InfoBar"
import { AuctionInfo } from "./AuctionInfo"
import { EmptyState } from "./EmptyState"
import MakeBid from "./MakeBid"
import { BiddingHistory } from "./BiddingHistory"

const GlobalStyle = createGlobalStyle<{ url: string }>`
body {
  &::before {
    background-image: ${({ url }) =>
      url ? `url('${url}')` : `url('/background.png')`};
    filter: blur(100px);
    opacity: 1;
    height: 100%;
  }
}
`

const PageGrid = styled.div`
  display: grid;
  gap: 32px;

  ${Media.sm`
    grid-template-columns: 250px 1fr;
  `}

  ${Media.md`
    grid-template-columns: 350px 1fr;
  `}
`

const NFTImageSection = styled(Section)`
  padding: 16px;
  height: max-content;
`

const CurrentState = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`

type AuctionProps = {
  location: PageProps["location"]
}

const Auction: FunctionComponent<AuctionProps> = ({ location }) => {
  const [refresh, setRefresh] = useState({})
  const refreshPoolData = () => setRefresh({})
  const { address, tokenId, nonce } = queryString.parse(location.search)
  const { img, auction } = useGetPoolData()
  const setPool = useSetPoolData()
  const getTickets = useGetTickets()

  useEffect(() => {
    setPool(String(address), String(tokenId), Number(nonce))
  }, [address, tokenId, nonce, setPool, refresh])

  useEffect(() => {
    getTickets()
  }, [getTickets])

  return (
    <Container>
      <GlobalStyle url={img} />
      <PageGrid>
        <NFTImageSection>
          <NFTImage src={img} />
        </NFTImageSection>
        <CurrentState>
          {auction ? (
            <>
              <InfoBar />
              <AuctionInfo />
              <MakeBid refreshPoolData={refreshPoolData} />
              <BiddingHistory />
            </>
          ) : (
            <EmptyState />
          )}
        </CurrentState>
      </PageGrid>
    </Container>
  )
}

export { Auction }
