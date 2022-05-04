import React, { FunctionComponent } from "react"
import styled from "styled-components"

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  display: grid;
  overflow: hidden;
  border-radius: 12px;
`

const StyledImg = styled.img`
  width: 100%;
  align-self: center;
  /* border-radius: 12px; */
`

type NFTImageProps = {
  src: string
  alt?: string
}

const NFTImage: FunctionComponent<NFTImageProps> = ({ src, alt = "" }) => (
  <ImageContainer>
    <StyledImg src={src} alt={alt} />
  </ImageContainer>
)

export default NFTImage
