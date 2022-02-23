import { Section, ExploreInfo } from "@atoms";
import { Peta } from "@typography";
import { Media } from "@theme";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

type CardBarProps = {
  title: string;
  poolAmount: number;
  poolAmountUSD: number;
  participants: number;
  owner: string;
};

// You probably want to change this to something semantic or abandon it all together
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  ${Media.lg`
    flex-direction: row;
    justify-content: flex-start;
  `}
`;

const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;

  ${Media.sm`
    grid-template-columns: repeat(3, calc(100%/3));
  `}

  ${Media.lg`
    width: 65%;
    justfy-content: space-evenly;
  `}
`;

const Title = styled(Peta)`
  display: flex;
  font-family: "Bluu Next";
  text-align: center;

  ${Media.lg`
    text-align: left;
    flex: 1 0 auto;
    padding: 0 36px;
    width: 35%;
  `}
`;

const StyledExploreInfo = styled(ExploreInfo)`
  margin-top: 16px;

  &:first-of-type {
    margin-right: 16px;
  }

  ${Media.lg`
    margin: 0;
  `}
`;

const CardBar: FunctionComponent<CardBarProps> = ({
  title,
  poolAmount,
  poolAmountUSD,
  participants,
  owner,
}) => (
  <Section>
    <Container>
      <Title>{title}</Title>
      <InfoWrapper>
        <StyledExploreInfo
          title="Pool Amount"
          text={`${poolAmount} Ξ`}
          unit={`$${poolAmountUSD}`}
          isCardBar
        />
        <StyledExploreInfo
          title="Participants"
          text={`${participants}`}
          unit="People"
          isCardBar
        />
        <StyledExploreInfo title="Owner" text={`${owner}`} isCardBar />
      </InfoWrapper>
    </Container>
  </Section>
);

export default CardBar;
