import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Pill } from "abacus-ui"

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  display: grid;
  overflow: hidden;
  border-radius: 12px;
  position: relative;
`

const StyledImg = styled.img`
  width: 100%;
  align-self: center;
  /* border-radius: 12px; */
`

const StyledPill = styled(Pill)`
  position: absolute;
  top: 8px;
  right: 8px;
`

type NFTImageProps = {
  src: string
  alt?: string
  numNfts?: number
}

const NFTImage: FunctionComponent<NFTImageProps> = ({
  src,
  alt = "",
  numNfts,
}) => (
  <ImageContainer>
    <StyledImg src={src} alt={alt} />
    {numNfts && (
      <StyledPill>
        {numNfts} NFT{numNfts > 1 ? "s" : ""}
      </StyledPill>
    )}
  </ImageContainer>
)

export default NFTImage
