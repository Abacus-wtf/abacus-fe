import { Font } from "@theme";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.small`
  ${Font("milli")}
`;

const Small: FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
);

export default Small;
