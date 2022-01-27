import { Font } from "@theme";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
  ${Font("zetta")}
`;

const Zetta: FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
);

export default Zetta;
