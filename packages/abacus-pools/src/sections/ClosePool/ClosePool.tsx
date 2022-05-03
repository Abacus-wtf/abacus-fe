import React, { FunctionComponent, useEffect, useState } from "react"
import { PageProps, Link } from "gatsby"
import * as queryString from "query-string"
import { Media } from "abacus-ui"
import styled, { createGlobalStyle } from "styled-components"
import {
  useGetPoolData,
  useGetTickets,
  useSetPoolData,
} from "@state/singlePoolData/hooks"
import { PoolCard } from "@components/PoolCard"
import { formatEther } from "ethers/lib/utils"
import { BigNumber } from "ethers"
import { Container } from "../../layouts/styles"
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

const SplitSection = styled.div`
  display: grid;
  gap: 32px;

  ${Media.sm`
    grid-template-columns: 250px 1fr;
  `}

  ${Media.md`
    grid-template-columns: 350px 1fr;
  `}
`

const StyledPoolCard = styled(PoolCard)`
  height: min-content;
`

type PoolProps = {
  location: PageProps["location"]
}

const Pool: FunctionComponent<PoolProps> = ({ location }) => {
  const [refresh, setRefresh] = useState({})
  const refreshPoolData = () => setRefresh({})
  const { address, tokenId, nonce } = queryString.parse(location.search)
  const { img, nftName, size, totalParticipants, vaultAddress } =
    useGetPoolData()
  const setPool = useSetPoolData()
  const getTickets = useGetTickets()

  useEffect(() => {
    setPool(String(address), String(tokenId), Number(nonce))
  }, [address, tokenId, nonce, setPool, refresh])

  useEffect(() => {
    getTickets()
  }, [getTickets])

  const poolLink = `/pool?address=${address}&tokenId=${tokenId}&nonce=${nonce}`

  return (
    <Container>
      <GlobalStyle url={img} />
      <BackLink to={poolLink}>{"< Back to Pool"}</BackLink>
      <SplitSection>
        <StyledPoolCard
          fullDetails={false}
          imgSrc={img}
          title={nftName}
          participants={totalParticipants}
          poolSize={formatEther(size.div(BigNumber.from("1000")))}
          vaultId={vaultAddress}
        />
        <CurrentState
          refreshPoolData={refreshPoolData}
          address={String(address)}
          tokenId={String(tokenId)}
          nonce={String(nonce)}
        />
      </SplitSection>
    </Container>
  )
}

export default Pool
