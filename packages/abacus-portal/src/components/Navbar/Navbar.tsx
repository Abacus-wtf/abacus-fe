import React, { FunctionComponent } from "react"
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
import { useClaimPayoutData } from "@state/miscData/hooks"
import { useActiveWeb3React } from "@hooks/index"
import { shortenAddress } from "@config/utils"

const Container = styled.nav<{ menuOpen: boolean }>`
  display: flex;
  padding: 16px;

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

      ${Media.sm`
        flex-direction: row;
        background: none;
        position: static;
      `}
    `}

  ${Media.md`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 28px;
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

const StyledKilo = styled(Kilo)`
  cursor: pointer;
  transition: ${({ theme }) => theme.transitionTime.main};
  &:hover {
    opacity: 0.7;
  }
`

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  align-items: center;
  color: black;
  gap: 6px;
`

const ProfileContainer = styled.div`
  grid-gap: 8px;
  display: flex;
  flex-direction: row;
  color: black;
  padding: 0px;
`

const Navbar: FunctionComponent = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const claimData = useClaimPayoutData()
  const { account } = useActiveWeb3React()

  return (
    <Container menuOpen={menuOpen}>
      <SideContainer style={{ gridGap: 8 }} menuOpen={menuOpen}>
        <StyledLink to="/">
          <Logo />
          <Divider />
          <Tera>Crowds</Tera>
        </StyledLink>
        <DropdownButton
          menuOpen={menuOpen}
          buttonType={ButtonType.Clear}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Dropdown />
          <VisuallyHidden>Dropdown</VisuallyHidden>
        </DropdownButton>
      </SideContainer>
      <SideContainer style={{ gridGap: 32 }} isOptions menuOpen={menuOpen}>
        <StyledLink to="/claim-pool">
          <StyledKilo>
            {claimData?.ethCredit.toLocaleString("en-us", {
              maximumSignificantDigits: 2,
              minimumSignificantDigits: 2,
            }) ?? `...`}{" "}
            ETH
          </StyledKilo>
        </StyledLink>
        <Button buttonType={ButtonType.White}>New Session</Button>
        <ProfileContainer>
          <ProfileIcon src="/temp_icon.png" />
          <Kilo>{shortenAddress(account)}</Kilo>
        </ProfileContainer>
      </SideContainer>
    </Container>
  )
}

export default Navbar
