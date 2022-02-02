import { Font } from "@theme";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

export enum ButtonType {
  Standard,
  White,
  Clear,
}

type ButtonProps = {
  children: any;
  onClick?: () => void;
  disabled?: boolean;
  type?: ButtonType;
  className: string;
};

const Container = styled.button<{ buttonType: ButtonType }>`
  ${Font()}
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
    buttonType === ButtonType.Standard
      ? theme.colors.utility.blue
      : buttonType === ButtonType.White
      ? theme.colors.core.white
      : "transparent"};
  width: max-content;

  &:hover {
    opacity: 0.6;
    box-shadow: none;
  }
`;

const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  disabled,
  type = ButtonType.Standard,
  className,
}: ButtonProps) => (
  <Container
    className={className}
    buttonType={type}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </Container>
);

export default Button;
