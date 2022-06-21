import React, { FunctionComponent, useEffect, useState } from "react"
import { Link } from "gatsby"
import { Media } from "abacus-ui"
import styled, { createGlobalStyle } from "styled-components"
import {
  useGetBribeData,
  useGetPoolData,
  useGetTickets,
  useSetPoolData,
} from "@state/singlePoolData/hooks"
import { Container } from "../../layouts/styles"
import InfoBar from "./InfoBar"
import { CurrentState } from "./CurrentState"
import TokenLockHistory from "./TokenLockHistory"
import EntryLevels from "./EntryLevels"
import Activity from "./Activity"

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

const SplitSection = styled.div`
  display: grid;
  gap: 32px;

  ${Media.md`
    grid-template-columns: repeat(2, calc(50% - 16px));
  `}
`

type PoolProps = {
  vaultId: string
}

const Pool: FunctionComponent<PoolProps> = ({ vaultId }) => {
  const [refresh, setRefresh] = useState({})
  const refreshPoolData = () => setRefresh({})
  const poolData = useGetPoolData()
  const setPool = useSetPoolData()
  const getTickets = useGetTickets()
  const getBribeData = useGetBribeData()

  useEffect(() => {
    setPool(vaultId)
  }, [vaultId, refresh, setPool])

  useEffect(() => {
    // getTickets()
  }, [getTickets])

  useEffect(() => {
    getBribeData()
  }, [getBribeData])

  const globalStyleImg = poolData?.nfts?.[0]?.img ?? ""

  return (
    <Container>
      <GlobalStyle url={globalStyleImg} />
      <BackLink to="/">{"< Back to Spot"}</BackLink>
      <InfoBar />
      <CurrentState refreshPoolData={refreshPoolData} />
      <SplitSection>
        <TokenLockHistory />
        <EntryLevels />
      </SplitSection>
      <Activity />
    </Container>
  )
}

export default Pool
