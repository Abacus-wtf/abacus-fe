import { LoadingShimmer } from "abacus-ui"
import React, { FunctionComponent } from "react"

import {
  Container,
  Image,
  InfoContainer,
  Info,
  InfoData,
  InfoTitle,
} from "./PoolCard.styled"

const Fallback: FunctionComponent = () => (
  <Container>
    <Image as="div">
      <LoadingShimmer />
    </Image>
    <InfoContainer>
      <Info>
        <InfoData>
          <LoadingShimmer>Loading</LoadingShimmer>
        </InfoData>
        <InfoTitle>Pool Name</InfoTitle>
      </Info>
      <Info right>
        <InfoData>
          <LoadingShimmer>Loading</LoadingShimmer>
        </InfoData>
        <InfoTitle>Pool Size</InfoTitle>
      </Info>
    </InfoContainer>
  </Container>
)

export { Fallback }
