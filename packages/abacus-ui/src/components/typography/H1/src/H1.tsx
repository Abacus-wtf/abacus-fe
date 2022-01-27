import { Font } from "@theme";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.h1`
  ${Font("exa")}
`;

const H1: FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
);

export default H1;
