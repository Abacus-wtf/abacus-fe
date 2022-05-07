import { SectionSubTitle } from "@components/SectionTitle"
import { Button, ButtonType, Media, P } from "abacus-ui"
import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Breakdown } from "./Breakdown"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 80px;
  padding: 0 20px;

  ${Media.md`
    padding: 0 40px;
  `}

  ${Media.lg`
    padding: 0;
  `}
`

const UtilityDescription = styled(P)`
  margin-top: 8px;
  font-size: 22px;
`

const StyledButton = styled(Button)`
  margin-top: 40px;
  margin-bottom: 80px;
`

const Utility: FunctionComponent = () => (
  <Container>
    <SectionSubTitle>Token Utility</SectionSubTitle>
    <UtilityDescription>
      <b>$ABC</b> can be staked in exchange for <b>voting escrowed $ABC</b>{" "}
      (veABC) which will represent governance powers over the Abacus protocol.
    </UtilityDescription>
    <Breakdown />
    <StyledButton
      as="a"
      href="/Abacus_Whitepaper.pdf"
      buttonType={ButtonType.Gray}
    >
      Read Whitepaper
    </StyledButton>
  </Container>
)

export { Utility }
