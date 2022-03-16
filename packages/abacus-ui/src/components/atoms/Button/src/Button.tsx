import { Font } from "@theme";
import React from "react";
import styled, { css } from "styled-components";

export enum ButtonType {
  Standard,
  White,
  Gray,
  Clear,
}

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  buttonType?: ButtonType;
  className?: string;
};

const Button = styled.button.attrs(({ disabled, ...rest }) => ({
  "aria-disabled": disabled,
  type: "button",
  ...rest,
}))<ButtonProps>`
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
    buttonType === ButtonType.White || buttonType === ButtonType.Gray
      ? theme.colors.button.primary
      : theme.colors.core.white};
  background-color: ${({ theme, buttonType }) =>
    buttonType === ButtonType.Clear
      ? "transparent"
      : buttonType === ButtonType.White
      ? theme.colors.core.white
      : buttonType === ButtonType.Gray
      ? theme.colors.button.gray
      : theme.colors.utility.blue};
  width: max-content;
  height: min-content;

  &:hover {
    color: ${({ theme, buttonType }) =>
      buttonType === ButtonType.White ||
      buttonType === ButtonType.Gray ||
      buttonType === ButtonType.Clear
        ? theme.colors.button.primary
        : theme.colors.core.white};
    opacity: 0.6;
    box-shadow: none;
  }

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: 0.2;

          &:hover {
            cursor: not-allowed;
            opacity: 0.2;
          }
        `
      : ""}
`;

export default Button;
