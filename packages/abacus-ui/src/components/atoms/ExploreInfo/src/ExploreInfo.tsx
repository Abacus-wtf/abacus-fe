import { Giga, Kilo } from "@typography";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

type ExploreInfoProps = {
  title: string;
  text: string;
  unit: string;
};

// You probably want to change this to something semantic or abandon it all together
const Container = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  align-items: center;
`;

const BoldenKilo = styled(Kilo)`
  font-weight: 600;
`;

const ColoredKilo = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core[900]};
`;

const ExploreInfo: FunctionComponent<ExploreInfoProps> = ({
  title,
  text,
  unit,
}) => (
  <Container>
    <BoldenKilo>{title}</BoldenKilo>
    <Giga>{text}</Giga>
    <ColoredKilo>{unit}</ColoredKilo>
  </Container>
);

export default ExploreInfo;
