import { PoolCardProps } from "@components/PoolCard"
import PoolCard from "@components/PoolCard/PoolCard"
import { Button, Font, H2, Media } from "abacus-ui"
import React, { FunctionComponent, useMemo, useState } from "react"
import styled from "styled-components"

type HotPoolsProps = {
  pools: PoolCardProps[]
}

const Container = styled.section`
  padding-top: 120px;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1120px;
`

const StyledH2 = styled(H2)`
  ${Font("yotta", "Bluu next")};
`

const CardContainer = styled.div`
  display: grid;
  padding: 0 20px;
  padding-top: 40px;
  row-gap: 20px;
  column-gap: 32px;

  ${Media.md`
    grid-template-columns: repeat(3, 1fr);  
  `}
`

const StyledButton = styled(Button)`
  margin-top: 40px;
  margin-bottom: 80px;
`

const HotPools: FunctionComponent<HotPoolsProps> = ({ pools }) => {
  // in the future we will add a fetch more feature and up this number for now, just 3
  const [maxCards] = useState(3)

  const poolsForDisplay: typeof pools = useMemo(
    () =>
      pools.reduce((acc, pool, i) => (i < maxCards ? [...acc, pool] : acc), []),
    [maxCards, pools]
  )
  return (
    <Container>
      <StyledH2>Hot Pools</StyledH2>
      <CardContainer>
        {poolsForDisplay.map((pool) => (
          <PoolCard {...pool} />
        ))}
      </CardContainer>
      <StyledButton>See More pools</StyledButton>
    </Container>
  )
}

export { HotPools }
