import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { ButtonType, Exa, Kilo, Button, LoadingShimmer } from "abacus-ui"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  height: 100%;
`

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 16px;

  & * {
    flex: 1 0 auto;
    width: 100%;
  }
`

const Fallback: FunctionComponent = () => (
  <Container>
    <LoadingShimmer>
      <Exa>Loading</Exa>
    </LoadingShimmer>
    <LoadingShimmer>
      <Kilo>Loading</Kilo>
    </LoadingShimmer>
    <LoadingShimmer>
      <Kilo>Loading</Kilo>
    </LoadingShimmer>
    <ButtonContainer>
      <LoadingShimmer>
        <Button as="div" buttonType={ButtonType.Clear}>
          Loading
        </Button>
      </LoadingShimmer>
      <LoadingShimmer>
        <Button as="div" buttonType={ButtonType.Clear}>
          Loading
        </Button>
      </LoadingShimmer>
    </ButtonContainer>
  </Container>
)

export default Fallback
