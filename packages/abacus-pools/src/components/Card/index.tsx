import React from "react"
import styled from "styled-components"
import { ImageContainer } from "@components/global.styles"
import { NFT } from "@state/poolData/reducer"
import { EmissionsIndicator } from "@components/EmissionsIndicator"

export const CardContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 350px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  grid-gap: 14px;
  transition: 0.2s;
  opacity: 1;
  overflow: hidden;

  &:hover {
    opacity: 0.75;
  }
`

interface Props extends NFT {
  emissionsStarted: boolean
}

export default ({ img, emissionsStarted }: Props) => (
  <CardContainer>
    <ImageContainer src={img} />
    <EmissionsIndicator started={emissionsStarted} disabled>
      {emissionsStarted ? "Emissions Started" : "Emissions Not Started"}
    </EmissionsIndicator>
  </CardContainer>
)
