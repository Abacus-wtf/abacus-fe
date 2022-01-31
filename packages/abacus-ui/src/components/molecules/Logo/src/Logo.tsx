import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Font } from "@theme";
import AbacusLogoWhite from "../../../../static/abacus_logo_white.svg";
import AbacusLogoDark from "../../../../static/abacus_logo_dark.svg";

type LogoProps = {
  isDark?: boolean;
  onClick?: () => void;
};

const PetaModified = styled.div<{ isDark: boolean }>`
  ${Font("peta", "Bluu Next")};
  color: ${({ isDark, theme }) =>
    isDark ? theme.colors.button.primary : theme.colors.core.white};
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  grid-gap: 8px;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitionTime.main};

  &:hover {
    opacity: 0.8;
  }
`;

const Logo: FunctionComponent<LogoProps> = ({ onClick, isDark = false }) => (
  <Container onClick={onClick}>
    <img
      style={{ width: 20 }}
      src={isDark ? AbacusLogoDark : AbacusLogoWhite}
      alt="Abacus Logo"
    />
    <PetaModified isDark={isDark}>Abacus</PetaModified>
  </Container>
);

export default Logo;
