import React, { FunctionComponent, useEffect } from "react"
import { Link } from "gatsby"

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

type ClosePoolProps = {
  vaultAddress: string
}

const ClosePool: FunctionComponent<ClosePoolProps> = ({ vaultAddress }) => {
  const { nfts, size, totalParticipants, name } = useGetPoolData()
  const setPool = useSetPoolData()
  const getTickets = useGetTickets()

  useEffect(() => {
    setPool(vaultAddress)
  }, [setPool, vaultAddress])

  useEffect(() => {
    getTickets()
  }, [getTickets])

  const poolLink = `/pool/${vaultAddress}`

  const globalImg = nfts?.[0]?.img ?? ""

  return (
    <Container>
      <GlobalStyle url={globalImg} />
      <BackLink to={poolLink}>{"< Back to Pool"}</BackLink>
      <SplitSection>
        <StyledPoolCard
          fullDetails={false}
          nfts={nfts}
          title={name}
          participants={totalParticipants}
          poolSize={formatEther(size.div(BigNumber.from("1000")))}
          vaultId={vaultAddress}
        />
        <CurrentState vaultAddress={vaultAddress} />
      </SplitSection>
    </Container>
  )
}

export default ClosePool
