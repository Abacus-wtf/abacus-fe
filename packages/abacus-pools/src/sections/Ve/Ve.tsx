import { Media } from "abacus-ui"
import React from "react"
import styled from "styled-components"
import { Epoch } from "@components/Epoch"
import { Container } from "../../layouts/styles"
import { Allocate, Deposit, YourAllocations, YourLocks } from "./elements"
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
  const { refreshVeState, holderData, epoch, setEpoch, epochEndTime, epochs } =
    useVeData()
  return (
    <Container>
      <Epoch
        epochs={epochs}
        epoch={epoch}
        setEpoch={setEpoch}
        endTime={epochEndTime}
      />
      <GridContainer>
        <YourLocks
          refreshVeState={refreshVeState}
          veBalance="veAbcBalance" // TODO: Remove
          holder={holderData}
        />
        <Deposit refreshVeState={refreshVeState} />
        <YourAllocations refreshVeState={refreshVeState} />
        <Allocate
          getVeData={refreshVeState}
          veABCMaxToAllocate="veABCMaxToAllocate" // TODO: Remove
        />
      </GridContainer>
    </Container>
  )
}

export { Ve }
