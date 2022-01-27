import { Font } from "@theme";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.h3`
  ${Font("tera")}
`;

const H3: FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
);

export default H3;
