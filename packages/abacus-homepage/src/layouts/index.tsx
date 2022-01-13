import * as React from "react"
import Helmet from "react-helmet"
import { GlobalStyles } from "./styles"
import { theme } from "@config/theme"
import Navbar from "@components/Navbar"
import styled from "styled-components"
import { Container } from "shards-react"

const StyledContainer = styled(Container)`
  width: 100%;
  max-width: 1200px;
  padding: 1rem;

  @media ${theme.media.phone} {
    padding: 4rem;
  }
`

const GlobalLayout: React.FC = (props: any) => {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Helmet title={"Abacus Protocol"} />
      <StyledContainer>
        <Navbar />
        {props.children}
      </StyledContainer>
    </React.Fragment>
  )
}

export default GlobalLayout
