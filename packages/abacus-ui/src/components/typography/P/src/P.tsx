import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Font } from "@theme";

const StyledP = styled.p`
  ${Font()}
`;

const P: FunctionComponent = ({ children }) => <StyledP>{children}</StyledP>;

export default P;
