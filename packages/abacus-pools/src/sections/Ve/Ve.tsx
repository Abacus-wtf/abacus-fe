import { Media } from "abacus-ui"
import React from "react"
import styled from "styled-components"
import { Container } from "../../layouts/styles"
import { Allocate, Epoch, Lock, YourAllocations, YourLocks } from "./elements"

const GridContainer = styled.div`
  display: grid;
  gap: 40px;
  width: 100%;

  ${Media.md`
    grid-template-columns: repeat(2, calc(50% - 20px));
  `}
`

const Ve = () => (
  <Container>
    <Epoch />
    <GridContainer>
      <YourLocks />
      <Lock />
      <YourAllocations />
      <Allocate />
    </GridContainer>
  </Container>
)

export { Ve }
