import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Font } from "@theme";

const Container = styled.div`
  ${Font("tera")}
`;

const Tera: FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
);

export default Tera;
