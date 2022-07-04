import { Loader } from "abacus-ui"
import React, { FunctionComponent } from "react"
import styled from "styled-components"

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #00000055;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  border-radius: ${({ theme }) => theme.borderRadius.section};

  & svg {
    height: 33%;
  }
`

type LoadingProps = {
  loading: boolean
}

const Loading: FunctionComponent<LoadingProps> = ({ loading }) => {
  if (!loading) {
    return null
  }
  return (
    <LoadingContainer>
      <Loader />
    </LoadingContainer>
  )
}

export default React.memo(Loading)
