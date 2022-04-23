import { SectionTitle } from "@components/SectionTitle"
import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Emissions } from "./Emissions"
import { Utility } from "./Utility"

const Container = styled.section`
  padding: 0 20px;
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
    <Utility />
  </Container>
)

export { Tokenomics }
