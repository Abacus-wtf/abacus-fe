import { PoolCardFallback } from "@components/PoolCard"
import { Section } from "@components/Section"
import { Button, Media } from "abacus-ui"
import React, { FunctionComponent } from "react"
import styled from "styled-components"
import loadable from "@loadable/component"
import { SectionTitle } from "../SectionTitle"
import { usePools } from "./usePools"

const PoolCard = loadable(() => import("../PoolCard/PoolCard"))

const Container = styled(Section)`
  padding-top: 120px;
  align-items: center;
  max-width: 1120px;
`

const CardContainer = styled.div`
  display: grid;
  padding: 0 20px;
  padding-top: 40px;
  row-gap: 20px;
  column-gap: 32px;
  width: 100%;

  ${Media.sm`
    grid-template-columns: repeat(2, 1fr);  
  `}

  ${Media.md`
    grid-template-columns: repeat(3, 1fr);  
  `}
`

const StyledButton = styled(Button)`
  margin-top: 40px;
  margin-bottom: 80px;
`

const DEFAULT_POOLS = Array.from(Array(3).keys())

const HotPools: FunctionComponent = () => {
  const isSSR = typeof window === "undefined"
  const { pools, fetching } = usePools()
  const isInitialFetch = pools.length === 0 && fetching

  return (
    <Container>
      <SectionTitle>Hot Pools</SectionTitle>
      <CardContainer>
        {!isSSR && isInitialFetch
          ? DEFAULT_POOLS.map((n) => <PoolCardFallback key={n} />)
          : pools.map((pool) => (
              <React.Suspense key={pool.id} fallback={PoolCardFallback}>
                <PoolCard {...pool} />
              </React.Suspense>
            ))}
      </CardContainer>
      <StyledButton as="a" href={process.env.GATSBY_APP_URL}>
        See More pools
      </StyledButton>
    </Container>
  )
}

export { HotPools }
