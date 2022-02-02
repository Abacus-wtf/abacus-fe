import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Mega, Yotta } from "abacus-ui"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 50px;
`

const StyledYotta = styled(Yotta)`
  font-family: "Bluu Next";
`

type CalloutProps = {
  copy: string
  label: string
}

const Callout: FunctionComponent<CalloutProps> = ({ copy, label }) => (
  <Container>
    <StyledYotta>{copy}</StyledYotta>
    <Mega>{label}</Mega>
  </Container>
)

export default Callout
