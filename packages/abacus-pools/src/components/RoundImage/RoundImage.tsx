import React from "react"
import styled from "styled-components"

type RoundImageProps = {
  src: string
  alt?: string
  size: number
}

const Image = styled.img<{ size: number }>`
  overflow: hidden;
  border-radius: 50%;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
`

const RoundImage = ({ src, alt = "", size }: RoundImageProps) => (
  <Image src={src} alt={alt} size={size} />
)

export { RoundImage }
