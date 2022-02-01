import React from "react"
import styled from "styled-components"
import { SocialLinks, Button, ButtonType, H1 } from "abacus-ui"

const Container = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: transparent;
`

const StyledH1 = styled(H1)`
  font-family: "Bluu Next", sans-serif;
`

const Navbar = () => (
  <Container>
    <SocialLinks />
    <StyledH1>ABACUS</StyledH1>
    <div>
      <Button>Whitepaper</Button>
      <Button>Launch App</Button>
    </div>
  </Container>
)

export default Navbar
