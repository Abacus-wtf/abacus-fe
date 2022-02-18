import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Font } from "@theme";
import { AbacusIcon } from "@icons";

type LogoProps = {
  isDark?: boolean;
  onClick?: () => void;
};

const PetaModified = styled.div<{ isDark: boolean }>`
  ${Font("peta", "Bluu Next")};
  margin-left: 8px;
  color: ${({ isDark, theme }) =>
    isDark ? theme.colors.core.white : theme.colors.button.primary};
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitionTime.main};

  &:hover {
    opacity: 0.8;
  }
`;

const Logo: FunctionComponent<LogoProps> = ({ onClick, isDark = false }) => (
  <Container onClick={onClick}>
    <AbacusIcon fill={isDark ? "white" : "black"} />
    <PetaModified isDark={isDark}>Abacus</PetaModified>
  </Container>
);

export default Logo;
