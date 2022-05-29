import React, { useState } from "react"
import styled, { css } from "styled-components"
import {
  Button,
  ButtonType,
  VisuallyHidden,
  Logo,
  Kilo,
  Tera,
  Dropdown,
  Media,
  ProfileIcon,
} from "abacus-ui"
import { Link } from "gatsby"
import { useActiveWeb3React } from "@hooks/index"
import { shortenAddress } from "@config/utils"
import { getUserIcon } from "@utils"
import { useAbcBalance, useToggleWalletModal } from "@state/application/hooks"
import { CreatePoolModal } from "./CreatePoolModal"

const Container = styled.nav<{ menuOpen: boolean }>`
  display: flex;
  padding: 16px;
  width: 100%;
  margin: 0 auto;
  max-width: 1120px;

  ${Media.md`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 28px 100px;
  `}

  ${Media.lg`
    padding: 28px 0px;
  `}

  ${({ menuOpen, theme }) =>
    menuOpen &&
    css`
      flex-direction: column;
      background: ${theme.colors.core.background};
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 100;

      ${Media.md`
        flex-direction: row;
        background: none;
        position: static;
      `}
    `}
`

const SideContainer = styled.div<{ isOptions?: boolean; menuOpen?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ isOptions, menuOpen }) =>
    isOptions &&
    css`
      display: ${menuOpen ? "flex" : "none"};
      flex-direction: column;
      justify-content: center;
      flex: 1 0 auto;
    `}

  ${Media.md`
    display: flex;
    position: inherit;
    flex-direction: row;
    flex: 0 0 auto;
  `}
`

const Divider = styled.div`
  background: rgba(0, 0, 0, 0.2);
  width: 1px;
  height: 38px;
`

const DropdownButton = styled(Button)<{ menuOpen: boolean }>`
  height: 38px;
  justify-content: center;
  display: flex;
  align-items: center;
  padding: 0 10px;
  transition: transform 0.25s linear;

  transform: ${({ menuOpen }) =>
    menuOpen ? "rotateZ(-180deg)" : "rotateZ(0)"};

  ${Media.md`
    display: none;
  `}
`

const StyledLink = styled(Link)<{ highlight?: boolean }>`
  display: flex;
  text-decoration: ${({ highlight }) => (highlight ? "underline" : "none")};
  text-decoration-color: #8673ff;
  text-decoration-thickness: 1px;
  text-underline-offset: 8px;
  line-height: 1.3;
  align-items: center;
  color: ${({ theme }) => theme.colors.core.primary};
  gap: 6px;

  &:hover {
    color: ${({ theme }) => theme.colors.core.primary};
    opacity: 0.6;
  }
`

const ProfileButton = styled(Button)`
  grid-gap: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: black;
  padding: 0px;
`

interface NavbarProps {
  pathname: string
}

const Navbar = ({ pathname }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { account } = useActiveWeb3React()
  const openWeb3Modal = useToggleWalletModal()
  const abcBalance = useAbcBalance()
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const iconSource = getUserIcon(account)

  return (
    <Container menuOpen={menuOpen}>
      <SideContainer style={{ gridGap: 24 }} menuOpen={menuOpen}>
        <StyledLink to="/">
          <Logo />
          <Divider />
          <Tera>Spot</Tera>
        </StyledLink>
        <DropdownButton
          menuOpen={menuOpen}
          buttonType={ButtonType.Clear}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Dropdown />
          <VisuallyHidden>Dropdown</VisuallyHidden>
        </DropdownButton>
        <StyledLink highlight={pathname === "/ve"} to="/ve">
          <Tera style={{ fontWeight: 300 }}>Ve</Tera>
        </StyledLink>
      </SideContainer>
      <SideContainer style={{ gridGap: 32 }} isOptions menuOpen={menuOpen}>
        <StyledLink to="/claim">
          <Kilo>
            {abcBalance
              ? abcBalance.toLocaleString("en-us", {
                  maximumSignificantDigits: 8,
                  minimumSignificantDigits: 2,
                })
              : "..."}{" "}
            ABC
          </Kilo>
        </StyledLink>

        <ProfileButton buttonType={ButtonType.Clear} onClick={openWeb3Modal}>
          <ProfileIcon src={iconSource} />
          <Kilo>{account ? shortenAddress(account) : "Connect"}</Kilo>
        </ProfileButton>
        <Button
          buttonType={ButtonType.Gray}
          onClick={() => setCreateModalOpen(true)}
        >
          New Pool
        </Button>
      </SideContainer>
      <CreatePoolModal
        isOpen={createModalOpen}
        closeModal={() => setCreateModalOpen(false)}
      />
    </Container>
  )
}

export default Navbar
