import { Font } from "@theme";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.h4`
  ${Font("giga")}
`;

const H4: FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
);

export default H4;
