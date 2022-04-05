import React, { FunctionComponent, useEffect, useState } from "react"
import { PageProps, Link } from "gatsby"
import * as queryString from "query-string"
import { Media } from "abacus-ui"
import styled from "styled-components"

import { useSetPoolData } from "@state/singlePoolData/hooks"
import { Container } from "../../layouts/styles"
import InfoBar from "./InfoBar"
import { CurrentState } from "./CurrentState"

const BackLink = styled(Link)`
  display: none;

  ${Media.sm`
    display: flex;
  `}
`

type PoolProps = {
  location: PageProps["location"]
}

const Pool: FunctionComponent<PoolProps> = ({ location }) => {
  const [refresh, setRefresh] = useState({})
  const refreshPoolData = () => setRefresh({})
  const { address, tokenId, nonce } = queryString.parse(location.search)
  const setPool = useSetPoolData()

  useEffect(() => {
    setPool(String(address), String(tokenId), Number(nonce))
  }, [address, tokenId, nonce, setPool, refresh])

  return (
    <Container>
      <BackLink to="/">{"< Back to Spot"}</BackLink>
      <InfoBar />
      <CurrentState refreshPoolData={refreshPoolData} />
    </Container>
  )
}

export default Pool
