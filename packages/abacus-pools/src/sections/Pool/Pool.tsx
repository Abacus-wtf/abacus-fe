import React, { FunctionComponent, useEffect, useState } from "react"
import { PageProps, Link } from "gatsby"
import * as queryString from "query-string"
import { Media } from "abacus-ui"
import styled, { createGlobalStyle } from "styled-components"
import { useGetPoolData, useSetPoolData } from "@state/singlePoolData/hooks"
import { Container } from "../../layouts/styles"
import InfoBar from "./InfoBar"
import { CurrentState } from "./CurrentState"

const BackLink = styled(Link)`
  display: none;

  ${Media.sm`
    display: flex;
  `}
`
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

type PoolProps = {
  location: PageProps["location"]
}

const Pool: FunctionComponent<PoolProps> = ({ location }) => {
  const [refresh, setRefresh] = useState({})
  const refreshPoolData = () => setRefresh({})
  const { address, tokenId, nonce } = queryString.parse(location.search)
  const poolData = useGetPoolData()
  const setPool = useSetPoolData()

  useEffect(() => {
    setPool(String(address), String(tokenId), Number(nonce))
  }, [address, tokenId, nonce, setPool, refresh])

  return (
    <Container>
      <GlobalStyle url={poolData.img} />
      <BackLink to="/">{"< Back to Spot"}</BackLink>
      <InfoBar />
      <CurrentState refreshPoolData={refreshPoolData} />
    </Container>
  )
}

export default Pool
