import { useActiveWeb3React } from "@hooks/index"

import React from "react"
import styled from "styled-components"
import { Container } from "../../layouts/styles"
import { Epoch, Bond, Credits } from "./elements"
import { SectionContainer, SectionTitle } from "./Claim.styles"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  width: 100%;
`

const Claim = () => {
  const { account } = useActiveWeb3React()
  console.log("account", account)
  return (
    <Container>
      <Wrapper>
        <SectionContainer>
          <SectionTitle>Claim</SectionTitle>
          <Epoch />
          <Credits />
        </SectionContainer>
        <SectionContainer>
          <SectionTitle>Bond</SectionTitle>
          <Bond />
        </SectionContainer>
      </Wrapper>
    </Container>
  )
}

export { Claim }
