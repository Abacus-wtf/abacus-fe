import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Font } from "@theme";

const StyledH6 = styled.h6`
  ${Font()}
`;

const H6: FunctionComponent = ({ children }) => <StyledH6>{children}</StyledH6>;

export default H6;
