import React from "react"
import styled from "styled-components"
import { Credits, Bond } from "./elements"
import { SectionContainer, SectionTitle } from "./Claim.styles"
import { Container } from "../../layouts/styles"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  width: 100%;
`

const Claim = () => (
  <Container>
    <Wrapper>
      <SectionContainer>
        <SectionTitle>Claim</SectionTitle>
        <Credits />
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>Bond</SectionTitle>
        <Bond />
      </SectionContainer>
    </Wrapper>
  </Container>
)

export { Claim }
