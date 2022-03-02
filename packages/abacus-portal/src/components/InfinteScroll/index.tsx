import React, { FunctionComponent, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { AbacusIcon } from "abacus-ui"
import { useInView } from "react-intersection-observer"
import { usePrevious } from "@hooks/index"

const Container = styled.div`
  min-height: 24px;
  width: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1
  }
  50% {
    transform: scale(0.95);
    opacity: 0.2;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`

const StyledIconContainer = styled.div`
  opacity: 1;
  transform: scale(1);
  animation: ${Pulse} 2s infinite;
`

type InfiniteScrollProps = {
  loading: boolean
  inViewCallback: (inView: boolean) => void
  isLastPage: boolean
  className?: string
}

const InfiniteScroll: FunctionComponent<InfiniteScrollProps> = ({
  loading,
  inViewCallback,
  isLastPage,
  className,
}) => {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  })
  const prevInView = usePrevious(inView)

  useEffect(() => {
    const shouldRunCallback = !isLastPage && inView !== prevInView && inView
    if (shouldRunCallback) {
      inViewCallback(inView)
    }
  }, [inView, prevInView, inViewCallback, isLastPage])

  if (isLastPage) {
    return null
  }

  return (
    <Container ref={ref} className={className}>
      {loading && (
        <StyledIconContainer>
          <AbacusIcon fill="black" />
        </StyledIconContainer>
      )}
    </Container>
  )
}

export default InfiniteScroll
