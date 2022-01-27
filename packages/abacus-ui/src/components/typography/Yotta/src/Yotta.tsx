import { Font } from "@theme";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
  ${Font("yotta")}
`;

const Yotta: FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
);

export default Yotta;
