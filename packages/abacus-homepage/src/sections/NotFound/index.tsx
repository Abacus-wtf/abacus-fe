import { H1, Mega } from "abacus-ui"
import * as React from "react"
import styled, { createGlobalStyle } from "styled-components"
import { Link } from "gatsby"

const Global = createGlobalStyle`
  body {
    background-size: cover;
  }
`

const StyledMega = styled(Mega)`
  margin-top: 3rem;
`

const FlexContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const NotFound = () => (
  <FlexContainer>
    <Global />
    <H1>404: Not Found</H1>
    <Link to="/">
      <StyledMega>Home</StyledMega>
    </Link>
  </FlexContainer>
)

export default NotFound
