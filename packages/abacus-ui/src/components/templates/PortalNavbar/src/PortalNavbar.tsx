import { Button, ButtonType, VisuallyHidden } from "@atoms";
import { Logo, ProfileInfo } from "@molecules";
import { Kilo, Tera } from "@typography";
import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { Dropdown, Extras } from "@icons";
import { Media } from "@theme";

type PortalNavbarTypes = {
  balance: number;
  profileName: string;
  profileIcon: string;
  onClick: () => void;
};

// You probably want to change this to something semantic or abandon it all together
const Container = styled.div<{ menuOpen: boolean }>`
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
    `}

  ${Media.md`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 28px;
  `}
`;

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
`;

const Divider = styled.div`
  background: rgba(0, 0, 0, 0.2);
  width: 1px;
  height: 38px;
`;

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
`;

const PortalNavbar: FunctionComponent<PortalNavbarTypes> = ({
  balance,
  profileName,
  profileIcon,
  onClick,
}) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <Container menuOpen={menuOpen}>
      <SideContainer style={{ gridGap: 8 }} menuOpen={menuOpen}>
        <Logo onClick={onClick} />
        <Divider />
        <Tera>Crowds</Tera>
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
        <Kilo>
          {balance.toLocaleString("en-us", {
            maximumSignificantDigits: 2,
            minimumSignificantDigits: 2,
          })}{" "}
          ETH
        </Kilo>
        <Button buttonType={ButtonType.White}>New Session</Button>
        <ProfileInfo profileIcon={profileIcon} profileName={profileName} />
        <Button style={{ padding: 0 }} buttonType={ButtonType.Clear}>
          <Extras />
          <VisuallyHidden>Menu Options</VisuallyHidden>
        </Button>
      </SideContainer>
    </Container>
  );
};

export default PortalNavbar;
