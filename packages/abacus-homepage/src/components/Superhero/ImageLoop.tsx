import React, { FunctionComponent, useEffect, useState, useRef } from "react"
import styled from "styled-components"

const StyledImg = styled.img<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height || "initial"};
`

let imageSources: string[] = []

let currentIndex = 0

function preloadImages(cb: () => void) {
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < 181; i++) {
    let img = new Image()
    img.src = `/3d-sequence/${i}.png`
    imageSources = [...imageSources, img.src]
  }
  cb()
}

const ImageLoop: FunctionComponent = () => {
  const [preloadComplete, setPreloadComplete] = useState(false)
  const imageRef = useRef<HTMLImageElement>()

  useEffect(() => {
    preloadImages(() => setPreloadComplete(true))
  }, [])

  useEffect(() => {
    let id
    if (preloadComplete) {
      id = setInterval(() => {
        currentIndex = currentIndex < 180 ? currentIndex + 1 : 0
        imageRef.current.src = imageSources[currentIndex]
      }, 50)
    }
    return () => clearInterval(id)
  }, [preloadComplete])

  const height = imageRef.current?.getBoundingClientRect().height ?? null

  return (
    <StyledImg alt="" src="/3d-sequence/1.png" ref={imageRef} height={height} />
  )
}

export default ImageLoop
