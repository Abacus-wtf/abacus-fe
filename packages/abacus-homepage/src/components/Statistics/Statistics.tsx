import React, { FunctionComponent } from "react"
import styled from "styled-components"

const Container = styled.section`
  display: flex;
  width: 100%;
  background: ${({ theme }) => theme.colors.utility.white};
  padding: 16px 0;
  justify-content: center;
  align-items: center;
`

const Statistics: FunctionComponent = () => (
  <Container>
    <div>thing</div>
    <div>thing2</div>
    <div>thing3</div>
  </Container>
)

export { Statistics }
