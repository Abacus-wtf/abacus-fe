import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { SocialLinks, Logo, Media } from "abacus-ui"
import { social } from "@config/index"
import ButtonLinks from "./ButtonLinks"
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
  openModal: () => void
}

const Navbar: FunctionComponent<NavbarProps> = ({
  footer = false,
  openModal,
}) => (
  <>
    <Mobile>
      <MobileNav footer={footer} openModal={openModal} />
    </Mobile>
    <Container>
      <StyledSocialLinks {...social} />
      <Logo isDark />
      <ButtonWrapper>
        <ButtonLinks openModal={openModal} />
      </ButtonWrapper>
    </Container>
  </>
)

export default Navbar
