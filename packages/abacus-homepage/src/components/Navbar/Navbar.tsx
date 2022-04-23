import React, { FunctionComponent, useState } from "react"
import styled, { css } from "styled-components"
import {
  // Button,
  // ButtonType,
  // VisuallyHidden,
  Logo,
  // Kilo,
  // Tera,
  // Dropdown,
  Media,
  // ProfileIcon,
} from "abacus-ui"
import { Link } from "gatsby"
// import { useActiveWeb3React } from "@hooks/index"
// import { shortenAddress } from "@config/utils"
// import { getUserIcon } from "@utils"
// import { useAbcBalance, useToggleWalletModal } from "@state/application/hooks"

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
  column-gap: 8px;

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
    flex: 0 0 auto;
    column-gap: 24px;
  `}
`

// const DropdownButton = styled(Button)<{ menuOpen: boolean }>`
//   height: 38px;
//   justify-content: center;
//   display: flex;
//   align-items: center;
//   padding: 0 10px;
//   transition: transform 0.25s linear;

//   transform: ${({ menuOpen }) =>
//     menuOpen ? "rotateZ(-180deg)" : "rotateZ(0)"};

//   ${Media.md`
//     display: none;
//   `}
// `

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  align-items: center;
  color: ${({ theme }) => theme.colors.core.primary};
  gap: 6px;

  &:hover {
    color: ${({ theme }) => theme.colors.core.primary};
    opacity: 0.6;
  }
`

const StyledLogo = styled(Logo)`
  ${Media.md`
    margin-right: 16px;
  `};
`

// const StyledTera = styled(Tera)`
//   font-size: 26px;
//   font-weight: 400;
// `

// const ProfileButton = styled(Button)`
//   grid-gap: 8px;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   color: black;
//   padding: 0px;
// `

const Navbar: FunctionComponent = () => {
  const [menuOpen] = useState(false)
  // const { account } = useActiveWeb3React()
  // const openWeb3Modal = useToggleWalletModal()
  // const abcBalance = useAbcBalance()

  // const iconSource = getUserIcon(account)

  return (
    <Container menuOpen={menuOpen}>
      <SideContainer menuOpen={menuOpen}>
        <StyledLink to="/">
          <StyledLogo />
        </StyledLink>
        {/* <StyledLink to="https://app.abacus.wtf/">
          <StyledTera>Crowds</StyledTera>
        </StyledLink>
        <StyledLink to="https://testnet.abacus.wtf/">
          <StyledTera>Spot</StyledTera>
        </StyledLink> */}
        {/* <DropdownButton
          menuOpen={menuOpen}
          buttonType={ButtonType.Clear}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Dropdown />
          <VisuallyHidden>Dropdown</VisuallyHidden>
        </DropdownButton> */}
      </SideContainer>
      <SideContainer style={{ gridGap: 32 }} isOptions menuOpen={menuOpen}>
        {/* <StyledLink to="/claim-pool">
          <Kilo>
            {abcBalance
              ? abcBalance.toLocaleString("en-us", {
                  maximumSignificantDigits: 8,
                  minimumSignificantDigits: 2,
                })
              : "..."}{" "}
            ABC
          </Kilo>
        </StyledLink> */}

        {/* <ProfileButton buttonType={ButtonType.Clear} onClick={openWeb3Modal}>
          <ProfileIcon src={iconSource} />
          <Kilo>{account ? shortenAddress(account) : "Connect"}</Kilo>
        </ProfileButton> */}
      </SideContainer>
    </Container>
  )
}

export default Navbar
