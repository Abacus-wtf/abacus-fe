import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Font } from "@theme";

const StyledDiv = styled.div`
  ${Font()}
`;

const Kilo: FunctionComponent = ({ children }) => (
  <StyledDiv>{children}</StyledDiv>
);

export default Kilo;
