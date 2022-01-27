import { Font } from "@theme";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
  ${Font("giga")}
`;

const Giga: FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
);

export default Giga;
