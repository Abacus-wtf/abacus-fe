import React from "react"
import styled from "styled-components"
import { SocialLinks, Button, Exa, ButtonType, AbacusIcon } from "abacus-ui"

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  padding: 15px 28px;
  position: relative;
`

const StyledExa = styled(Exa)`
  font-family: "Bluu Next", sans-serif;
  display: flex;
  align-items: center;
  margin-left: 8px;
`

const StyledFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`

const ButtonWrapper = styled.div`
  display: flex;
  z-index: 1;

  & button {
    width: max-content;
  }
`

const StyledSocialLinks = styled(SocialLinks)`
  z-index: 1;
`

const social = {
  twitter: "https://twitter.com/abacus_wtf",
  discord: "https://discord.com/channels/861936155494842368/871084437306220564",
  medium: "https://medium.com/abacus-wtf",
}

const Navbar = () => (
  <Container>
    <StyledSocialLinks {...social} />
    <StyledFlex>
      <AbacusIcon />
      <StyledExa>Abacus</StyledExa>
    </StyledFlex>
    <ButtonWrapper>
      <Button type={ButtonType.Clear}>Whitepaper</Button>
      <Button type={ButtonType.White}>Launch App</Button>
    </ButtonWrapper>
  </Container>
)

export default Navbar
