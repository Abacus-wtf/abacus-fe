import { Section } from "@components/Section"
import { SectionTitle } from "@components/SectionTitle"
import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Emissions } from "./Emissions"
import { Utility } from "./Utility"

const Container = styled(Section)`
  padding: 0 20px;
  padding-top: 120px;
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
