import { Font } from "@theme";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.h2`
  ${Font("peta")}
`;

const H2: FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
);

export default H2;
