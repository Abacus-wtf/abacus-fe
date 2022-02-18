import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Flex: FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
);

export default Flex;
