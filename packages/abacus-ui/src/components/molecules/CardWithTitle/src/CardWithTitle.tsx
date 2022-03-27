import { CardBackground } from "@atoms";
import { Kilo } from "@typography";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

type CardWithTitleProps = {
  title: string;
  children: JSX.Element;
  style?: React.CSSProperties;
  noBorder?: boolean;
};

const KiloStyled = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core.semiTitle};
  font-weight: 600;
`;

const Border = styled.div`
  background-color: ${({ theme }) => theme.colors.core.border};
  height: 2px;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 15px;
  width: 100%;
  height: 100%;
`;

const CardWithTitle: FunctionComponent<CardWithTitleProps> = ({
  title,
  children,
  style,
  noBorder,
}) => (
  <CardBackground>
    <Container style={{ ...style }}>
      <KiloStyled>{title}</KiloStyled>
      {noBorder ? null : <Border />}
      {children}
    </Container>
  </CardBackground>
);

export default CardWithTitle;
