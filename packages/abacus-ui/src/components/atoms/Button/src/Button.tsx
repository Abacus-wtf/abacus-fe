import { Font } from "@theme";
import React from "react";
import styled from "styled-components";

export enum ButtonType {
  Standard,
  White,
  Clear,
}

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  buttonType?: ButtonType;
  className?: string;
};

const Button = styled.button<ButtonProps>`
  ${Font()}
  text-decoration: none;
  border-radius: ${({ theme }) => theme.borderRadius.section};
  padding: ${({ theme }) => theme.padding.main};
  box-shadow: ${({ theme, buttonType }) =>
    buttonType === ButtonType.Clear ? "none" : theme.boxShadow.button};
  border: none;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitionTime.main};
  color: ${({ theme, buttonType }) =>
    buttonType === ButtonType.White
      ? theme.colors.button.primary
      : theme.colors.core.white};
  background-color: ${({ theme, buttonType }) =>
    buttonType === ButtonType.Clear
      ? "transparent"
      : buttonType === ButtonType.White
      ? theme.colors.core.white
      : theme.colors.utility.blue};
  width: max-content;
  height: min-content;

  &:hover {
    opacity: 0.6;
    box-shadow: none;
  }
`;

export default Button;
