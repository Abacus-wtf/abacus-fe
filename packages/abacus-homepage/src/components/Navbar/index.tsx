import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { SocialLinks, Button, ButtonType, Logo, Media } from "abacus-ui"
import { social } from "@config/index"
import MobileNav from "./MobileNav"

const Mobile = styled.div`
  ${Media.sm`
    display: none;
  `}
`

const Container = styled.nav`
  display: none;

  ${Media.sm`
    display: flex;
    justify-content: space-between;
    background-color: transparent;
    padding: 15px 28px;
  `};
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  ${Media.md`
    width: 33%;
  `}

  & button {
    width: max-content;
    white-space: nowrap;
  }
`

const StyledSocialLinks = styled(SocialLinks)`
  justify-content: flex-start;
  ${Media.md`
    width: 33%;
  `}
`

type NavbarProps = {
  footer?: boolean
}

const Navbar: FunctionComponent<NavbarProps> = ({ footer = false }) => (
  <>
    <Mobile>
      <MobileNav footer={footer} />
    </Mobile>
    <Container>
      <StyledSocialLinks {...social} />
      <Logo isDark />
      <ButtonWrapper>
        <Button buttonType={ButtonType.Clear}>Whitepaper</Button>
        <Button buttonType={ButtonType.White}>Launch App</Button>
      </ButtonWrapper>
    </Container>
  </>
)

export default Navbar
