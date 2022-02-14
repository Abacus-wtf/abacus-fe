import { CardBackground } from "@atoms";
import { Kilo } from "@typography";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

type CardWithTitleProps = {
  title: string;
  children: JSX.Element;
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
  height: 300px;
`;

const CardWithTitle: FunctionComponent<CardWithTitleProps> = ({
  title,
  children,
}) => (
  <CardBackground>
    <Container>
      <KiloStyled>{title}</KiloStyled>
      <Border />
      {children}
    </Container>
  </CardBackground>
);

export default CardWithTitle;
