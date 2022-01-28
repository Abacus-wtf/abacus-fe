import React, { FunctionComponent } from "react";
import styled from "styled-components";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  background: ${({ theme }) => theme.colors.background1};
  box-shadow: ${({ theme }) => theme.boxShadow.section};
  border-radius: ${({ theme }) => theme.borderRadius.section};
`;

const Section: FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
);

export default Section;
