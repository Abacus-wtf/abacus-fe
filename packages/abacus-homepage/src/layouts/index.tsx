import * as React from 'react'
import Helmet from 'react-helmet'
import { GlobalStyles } from './styles'
import Navbar from '@components/Navbar'
import styled from 'styled-components'
import { Container, Row, Col } from "shards-react";

const StyledContainer = styled(Container)`
  width: 100%;
  max-width: 1200px;
  padding: 4rem;
`

const GlobalLayout: React.FC = (props: any) => {
    return (
        <React.Fragment>
            <GlobalStyles />
            <Helmet title={"Abacus Protocol"} />
            <StyledContainer>
              <Navbar />
              <Row style={{flexWrap: 'inherit'}}>
                {props.children}
              </Row>
            </StyledContainer>
        </React.Fragment>
    )
}

export default GlobalLayout;