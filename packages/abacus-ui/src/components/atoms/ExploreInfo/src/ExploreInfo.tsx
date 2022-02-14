import { Giga, Kilo } from "@typography";
import { Font } from "components";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

type ExploreInfoProps = {
  title: string;
  text: string;
  unit?: string;
  isCardBar?: boolean;
};

// You probably want to change this to something semantic or abandon it all together
const Container = styled.div<{ isCardBar: boolean }>`
  display: flex;
  flex-direction: column;
  grid-gap: ${({ isCardBar }) => (isCardBar ? "5px" : "10px")};
  align-items: ${({ isCardBar }) => (isCardBar ? "flex-start" : "center")};
`;

const BoldenKilo = styled(Kilo)<{ isCardBar: boolean }>`
  color: ${({ theme, isCardBar }) =>
    isCardBar ? theme.colors.core[900] : "black"};
  font-weight: 600;
`;

const StyledGiga = styled(Giga)<{ isCardBar: boolean }>`
  color: ${({ theme, isCardBar }) =>
    isCardBar ? theme.colors.core[900] : "black"};
  ${({ isCardBar }) => Font(isCardBar ? "mega" : "giga")};
`;

const ColoredKilo = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core[900]};
`;

const ExploreInfo: FunctionComponent<ExploreInfoProps> = ({
  title,
  text,
  unit,
  isCardBar,
}) => (
  <Container isCardBar={isCardBar || false}>
    <BoldenKilo isCardBar={isCardBar || false}>{title}</BoldenKilo>
    <StyledGiga isCardBar={isCardBar || false}>{text}</StyledGiga>
    {unit ? <ColoredKilo>{unit}</ColoredKilo> : null}
  </Container>
);

export default ExploreInfo;
