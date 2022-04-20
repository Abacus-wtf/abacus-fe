/* eslint-disable import/no-webpack-loader-syntax */
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { VisuallyHidden } from "../../../atoms";
import { Twitter, Discord, Medium } from "./icons";

type SocialLinksProps = {
  twitter: string;
  discord: string;
  medium: string;
  className?: string;
  size?: string;
};

// You probably want to change this to something semantic or abandon it all together
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled.a`
  display: flex;
  margin: 0 12px;
  cursor: pointer;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }

  & path {
    fill: ${({ theme }) => theme.colors.utility.white};
  }

  &:hover,
  &:focus {
    & path {
      fill: ${({ theme }) => theme.colors.core.lightWhite};
    }
  }
`;

const SocialLinks: FunctionComponent<SocialLinksProps> = ({
  twitter,
  discord,
  medium,
  className,
  size = "20",
}) => (
  <Container className={className}>
    <StyledLink href={twitter}>
      <Twitter size={size} />
      <VisuallyHidden>Twitter Profile</VisuallyHidden>
    </StyledLink>
    <StyledLink href={discord}>
      <Discord size={size} />
      <VisuallyHidden>Discord Channel</VisuallyHidden>
    </StyledLink>
    <StyledLink href={medium}>
      <Medium size={size} />
      <VisuallyHidden>Medium Account</VisuallyHidden>
    </StyledLink>
  </Container>
);

export default SocialLinks;
