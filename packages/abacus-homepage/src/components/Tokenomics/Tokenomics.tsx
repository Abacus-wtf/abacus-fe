import { SectionTitle } from "@components/SectionTitle"
import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Emissions } from "./Emissions"

const Container = styled.section`
  padding-top: 120px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 960px;
`

const Tokenomics: FunctionComponent = () => (
  <Container>
    <SectionTitle>The $ABC Token</SectionTitle>
    <Emissions />
  </Container>
)

export { Tokenomics }
