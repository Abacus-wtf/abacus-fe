/* eslint-disable import/no-webpack-loader-syntax */
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Twitter, Discord, Medium } from "./icons";

type SocialLinksProps = {
  twitter: string;
  discord: string;
  medium: string;
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
`;

const SocialLinks: FunctionComponent<SocialLinksProps> = ({
  twitter,
  discord,
  medium,
}) => (
  <Container>
    <StyledLink href={twitter}>
      <Twitter />
    </StyledLink>
    <StyledLink href={discord}>
      <Discord />
    </StyledLink>
    <StyledLink href={medium}>
      <Medium />
    </StyledLink>
  </Container>
);

export default SocialLinks;
