import { Font, H2, Mega } from "abacus-ui"
import * as React from "react"
import styled from "styled-components"
import { Container } from "./styles"

const Title = styled(H2)`
  ${Font("tena")}
  font-weight: bold;
  color: ${({ theme }) => theme.colors.utility.blue};
`

const NotFound = () => (
  <Container>
    <Title>404</Title>
    <Mega>Not Found</Mega>
  </Container>
)

export default NotFound
