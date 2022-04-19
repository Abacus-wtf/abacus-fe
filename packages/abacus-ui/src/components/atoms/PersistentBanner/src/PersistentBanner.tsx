import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";

type PersistentBannerProps = {
  top?: string;
  bottom?: string;
  type?: "primary" | "warn" | "error" | "success";
};

// You probably want to change this to something semantic or abandon it all together
const Container = styled.div<PersistentBannerProps>`
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: ${({ type, theme }) => {
    switch (type) {
      case "warn":
        return theme.colors.utility.yellow;
      case "error":
        return theme.colors.utility.red;
      case "success":
        return theme.colors.utility.green;
      default:
        return theme.colors.utility.blue;
    }
  }};
  color: ${({ theme }) => theme.colors.core.white};
  ${({ bottom }) =>
    bottom
      ? css`
          bottom: ${bottom};
        `
      : ""}
  ${({ top }) =>
    top
      ? css`
          top: ${top};
        `
      : ""};
`;

const PersistentBanner: FunctionComponent<PersistentBannerProps> = ({
  children,
  ...rest
}) => <Container {...rest}>{children}</Container>;

export default PersistentBanner;
