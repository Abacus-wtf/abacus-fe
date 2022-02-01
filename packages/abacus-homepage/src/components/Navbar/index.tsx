import React from "react"
import styled from "styled-components"
import { SocialLinks, Button, H1 } from "abacus-ui"

const Container = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: transparent;
`

const StyledH1 = styled(H1)`
  font-family: "Bluu Next", sans-serif;
`

const ButtonWrapper = styled.div`
  display: flex;

  & button {
    width: max-content;
  }
`

const Navbar = () => (
  <Container>
    <SocialLinks />
    <StyledH1>Abacus</StyledH1>
    <ButtonWrapper>
      <Button type={2}>Whitepaper</Button>
      <Button type={1}>Launch App</Button>
    </ButtonWrapper>
  </Container>
)

export default Navbar
