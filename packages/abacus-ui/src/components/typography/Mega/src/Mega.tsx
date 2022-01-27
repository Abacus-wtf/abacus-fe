import { Font } from "@theme";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
  ${Font("mega")}
`;

const Mega: FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
);

export default Mega;
