import { Font } from "@theme";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.h5`
  ${Font("mega")}
`;

const H5: FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
);

export default H5;
