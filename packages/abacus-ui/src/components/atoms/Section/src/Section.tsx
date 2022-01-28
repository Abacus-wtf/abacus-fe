import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Media } from "@theme";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  background: ${({ theme }) => theme.colors.background1};
  box-shadow: ${({ theme }) => theme.boxShadow.section};
  border-radius: ${({ theme }) => theme.borderRadius.section};

  ${Media.sm`
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  `}
`;

const Section: FunctionComponent = ({ children }) => (
  <Container>{children}</Container>
);

export default Section;
