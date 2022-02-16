import React, { FunctionComponent, useState } from "react"
import styled from "styled-components"
import {
  Button,
  ButtonType,
  Logo,
  Media,
  VisuallyHidden,
  SocialLinks,
} from "abacus-ui"
import { X, Menu } from "react-feather"
import { social } from "@config/index"
import ButtonLinks from "./ButtonLinks"

type Openable = { open: boolean }

const Container = styled.nav<Openable>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  height: 72px;
  background: ${({ open }) => (open ? "#101010" : "transparent")};
`

const LinksContainer = styled.div<Openable>`
  display: ${({ open }) => (open ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  width: 100%;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 72px;
  z-index: 1;
  background: #101010;
  ${Media.sm`
    display: none;
  `}
`

const HorizontalRule = styled.hr`
  margin: 24px 0;
  width: 50%;
  background: linear-gradient(to right, #3e74ff 0%, rgba(147, 62, 255, 0) 100%);
  border: none;
  height: 2px;
`

type MobileNavProps = {
  footer: boolean
  openModal: () => void
}

const MobileNav: FunctionComponent<MobileNavProps> = ({
  footer,
  openModal,
}) => {
  const [menuOpen, setMenuOpen] = useState(false)
  if (footer) {
    return null
  }
  return (
    <Container open={menuOpen}>
      <Logo isDark />
      <Button
        type="button"
        buttonType={ButtonType.Clear}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? (
          <>
            <X />
            <VisuallyHidden>Close Menu</VisuallyHidden>
          </>
        ) : (
          <>
            <Menu />
            <VisuallyHidden>Open Menu</VisuallyHidden>
          </>
        )}
      </Button>
      <LinksContainer open={menuOpen}>
        <SocialLinks {...social} />
        <HorizontalRule />
        <ButtonLinks openModal={openModal} />
      </LinksContainer>
    </Container>
  )
}

export default MobileNav
