import React, { useState } from "react"
import styled, { css } from "styled-components"
import {
  Button,
  ButtonType,
  VisuallyHidden,
  Logo,
  Kilo,
  Tera,
  Hamburger,
  Media,
  ProfileIcon,
  Close,
} from "abacus-ui"
import { Link } from "gatsby"
import { useActiveWeb3React } from "@hooks/index"
import { shortenAddress } from "@config/utils"
import { getUserIcon } from "@utils"
import { useAbcBalance, useToggleWalletModal } from "@state/application/hooks"

const PurpleBox = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.utility.lightPurple};

  ${Media.md`
    display: none;
  `}
`

const Container = styled.nav<{ menuOpen: boolean }>`
  display: flex;
  padding: 8px 16px;
  max-width: 1120px;
  background-color: ${({ theme }) => theme.colors.utility.white};

  ${Media.md`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 28px 100px;
    background-color: transparent;
    margin: 0 auto;
    gap: 40px;
  `}

  ${Media.lg`
    padding: 28px 0px;
  `}

  ${({ menuOpen, theme }) =>
    menuOpen &&
    css`
      flex-direction: column;
      background: ${theme.colors.utility.white};
      position: fixed;
      top: 64px;
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

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  ${Media.md`
    width: max-content;
  `}
`

const MenuContainer = styled.div<{ menuOpen?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1 0 auto;
  justify-content: space-between;
  gap: 24px;

  ${({ menuOpen }) =>
    css`
      height: 100%;
      display: ${menuOpen ? "flex" : "none"};
      flex-direction: column;
      justify-content: center;
      flex: 1 0 auto;
    `}

  ${Media.md`
    display: flex;
    position: inherit;
    flex-direction: row;
    flex: 1 0 auto;
    justify-content: space-between;
  `}
`

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 24px;

  ${Media.md`
    width: max-content;
    flex-direction: row;
  `}

  &:last-of-type {
    gap: 32px;
  }
`

const DropdownButton = styled(Button)<{ menuOpen: boolean }>`
  height: 38px;
  justify-content: center;
  display: flex;
  align-items: center;
  padding: 0 10px;

  ${Media.md`
    display: none;
  `}
`

const StyledLink = styled(Link)<{ highlight?: boolean }>`
  display: flex;
  text-decoration: ${({ highlight }) => (highlight ? "underline" : "none")};
  text-decoration-color: ${({ theme }) => theme.colors.utility.lightPurple};
  text-decoration-thickness: 1px;
  text-underline-offset: 8px;

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

const CreatePoolButton = styled(Button)<{ highlight: boolean }>`
  color: ${({ highlight, theme }) =>
    highlight ? theme.colors.utility.lightPurple : theme.colors.core.primary};
`

const Navbar = ({ pathname }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { account } = useActiveWeb3React()
  const openWeb3Modal = useToggleWalletModal()
  const abcBalance = useAbcBalance()

  const iconSource = getUserIcon(account)

  return (
    <>
      <PurpleBox />
      <Container menuOpen={menuOpen}>
        <TitleContainer>
          <StyledLink to="/">
            <Logo />
          </StyledLink>
          <DropdownButton
            menuOpen={menuOpen}
            buttonType={ButtonType.Clear}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <Close /> : <Hamburger />}
            <VisuallyHidden>
              {menuOpen ? "Close Menu" : "Open Menu"}
            </VisuallyHidden>
          </DropdownButton>
        </TitleContainer>
        <MenuContainer menuOpen={menuOpen}>
          <MenuSection>
            <StyledLink highlight={pathname === "/"} to="/">
              <Tera style={{ fontWeight: 300 }}>Pools</Tera>
            </StyledLink>
            <StyledLink
              highlight={pathname === "/allocations/"}
              to="/allocations"
            >
              <Tera style={{ fontWeight: 300 }}>Allocations</Tera>
            </StyledLink>
          </MenuSection>

          <MenuSection>
            <StyledLink highlight={pathname === "/claim"} to="/claim">
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

            <ProfileButton
              buttonType={ButtonType.Clear}
              onClick={() => {
                setMenuOpen(false)
                openWeb3Modal()
              }}
            >
              <ProfileIcon src={iconSource} />
              <Kilo>{account ? shortenAddress(account) : "Connect"}</Kilo>
            </ProfileButton>
            <CreatePoolButton
              highlight={pathname === "/create-pool"}
              to="/create-pool"
              buttonType={ButtonType.Gray}
              as={Link}
            >
              New Pool
            </CreatePoolButton>
          </MenuSection>
        </MenuContainer>
      </Container>
    </>
  )
}

export default Navbar
