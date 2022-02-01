import * as React from "react"
import Helmet from "react-helmet"
import styled from "styled-components"
import { Container } from "shards-react"
import Navbar from "@components/Navbar"
import { GlobalStyles } from "./styles"

const StyledContainer = styled(Container)`
  width: 100%;
  margin: 0;
  padding: 0;
`

const GlobalLayout: React.FC = ({ children }: any) => (
  <>
    <GlobalStyles />
    <Helmet title="Abacus Protocol" />
    <StyledContainer>
      <Navbar />
      {children}
    </StyledContainer>
  </>
)

export default GlobalLayout
