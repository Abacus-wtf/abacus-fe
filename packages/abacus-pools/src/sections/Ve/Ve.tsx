import { Media } from "abacus-ui"
import React, { useEffect } from "react"
import styled from "styled-components"
import { useFetchCurrentEpoch } from "@state/application/hooks"
import { Container } from "../../layouts/styles"
import { Allocate, Epoch, Lock, YourAllocations, YourLocks } from "./elements"
import { useVeData } from "./useVeData"

const GridContainer = styled.div`
  display: grid;
  gap: 40px;
  width: 100%;

  ${Media.md`
    grid-template-columns: repeat(2, calc(50% - 20px));
  `}
`

const Ve = () => {
  const { fetchCurrentEpoch } = useFetchCurrentEpoch()

  useEffect(() => {
    fetchCurrentEpoch()
  }, [fetchCurrentEpoch])

  const { veAbcBalance, refreshVeState, holderData, veABCMaxToAllocate } =
    useVeData()
  return (
    <Container>
      <Epoch />
      <GridContainer>
        <YourLocks
          refreshVeState={refreshVeState}
          veBalance={veAbcBalance}
          holder={holderData}
        />
        <Lock refreshVeState={refreshVeState} />
        <YourAllocations refreshVeState={refreshVeState} />
        <Allocate
          getVeData={refreshVeState}
          veABCMaxToAllocate={veABCMaxToAllocate}
        />
      </GridContainer>
    </Container>
  )
}

export { Ve }
