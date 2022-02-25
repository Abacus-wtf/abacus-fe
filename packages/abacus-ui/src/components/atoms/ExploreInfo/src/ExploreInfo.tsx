import { Giga, Kilo } from "@typography";
import { Font, Media } from "@theme";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

type ExploreInfoProps = {
  title: string;
  text: string;
  unit?: string;
  isCardBar?: boolean;
  className?: string;
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
  ${Font("micro")}

  ${Media.md`
    ${Font("kilo")}
  `}
`;

const StyledGiga = styled(Giga)<{ isCardBar: boolean }>`
  color: ${({ theme, isCardBar }) =>
    isCardBar ? theme.colors.core[900] : "black"};
  ${({ isCardBar }) => Font(isCardBar ? "mega" : "giga")};
  width: 100%;
  text-align: inherit;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${Font("mega")}

  ${Media.md`
    ${Font("giga")}
  `}
`;

const ColoredKilo = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core[900]};

  ${Font("micro")}

  ${Media.md`
    ${Font("kilo")}
  `}
`;

const ExploreInfo: FunctionComponent<ExploreInfoProps> = ({
  title,
  text,
  unit,
  isCardBar,
  className,
}) => (
  <Container isCardBar={isCardBar || false} className={className}>
    <BoldenKilo isCardBar={isCardBar || false}>{title}</BoldenKilo>
    <StyledGiga isCardBar={isCardBar || false}>{text}</StyledGiga>
    {unit ? <ColoredKilo>{unit}</ColoredKilo> : null}
  </Container>
);

export default ExploreInfo;
