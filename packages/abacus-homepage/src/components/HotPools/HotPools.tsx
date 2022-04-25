import { PoolCardFallback } from "@components/PoolCard"
import { Section } from "@components/Section"
import { Button, Media } from "abacus-ui"
import React, { FunctionComponent, useMemo, useState } from "react"
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

const HotPools: FunctionComponent = () => {
  // in the future we will add a fetch more feature and up this number for now, just 3
  const [maxCards] = useState(3)
  const isSSR = typeof window === "undefined"
  const pools = usePools()

  const poolsForDisplay: typeof pools = useMemo(
    () =>
      pools.reduce((acc, pool, i) => (i < maxCards ? [...acc, pool] : acc), []),
    [maxCards, pools]
  )
  return (
    <Container>
      <SectionTitle>Hot Pools</SectionTitle>
      <CardContainer>
        {!isSSR &&
          poolsForDisplay.map((pool) => (
            <React.Suspense key={pool.id} fallback={PoolCardFallback}>
              <PoolCard {...pool} />
            </React.Suspense>
          ))}
      </CardContainer>
      <StyledButton>See More pools</StyledButton>
    </Container>
  )
}

export { HotPools }
