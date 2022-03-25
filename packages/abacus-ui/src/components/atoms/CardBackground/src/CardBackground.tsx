import React, { FunctionComponent } from "react";
import styled from "styled-components";

type CardBackgroundProps = {
  children: JSX.Element;
  isHalfScreen?: boolean;
  style?: React.CSSProperties;
};

// You probably want to change this to something semantic or abandon it all together
const Container = styled.div<{ isHalfScreen: boolean }>`
  border-radius: ${({ theme }) => theme.borderRadius.section};
  background-color: ${({ theme }) => theme.colors.core.white};
  box-shadow: ${({ theme }) => theme.boxShadow.section};
  width: auto;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: row;
`;

const CardBackground: FunctionComponent<CardBackgroundProps> = ({
  children,
  isHalfScreen,
  style,
}) => (
  <Container style={{ ...style }} isHalfScreen={isHalfScreen || false}>
    {children}
  </Container>
);

export default CardBackground;
