import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.span`
  border: 0px;
  clip: rect(0px, 0px, 0px, 0px);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0px;
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
`;

const VisuallyHidden: FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
);

export default VisuallyHidden;
