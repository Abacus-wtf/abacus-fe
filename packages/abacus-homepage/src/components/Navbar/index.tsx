import React from "react"
import styled from "styled-components"
import { SocialLinks, Button, H1, ButtonType } from "abacus-ui"

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

const social = {
  twitter: "https://twitter.com/abacus_wtf",
  discord: "https://discord.com/channels/861936155494842368/871084437306220564",
  medium: "https://medium.com/abacus-wtf",
}

const Navbar = () => (
  <Container>
    <SocialLinks {...social} />
    <StyledH1>Abacus</StyledH1>
    <ButtonWrapper>
      <Button type={ButtonType.Clear}>Whitepaper</Button>
      <Button type={ButtonType.White}>Launch App</Button>
    </ButtonWrapper>
  </Container>
)

export default Navbar
