import { Font } from "@theme";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
  ${Font("nina")}
`;

const Nina: FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
);

export default Nina;
