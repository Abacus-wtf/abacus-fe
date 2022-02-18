import { CardBackground, ExploreInfo } from "@atoms";
import { Peta } from "@typography";
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
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const CardBar: FunctionComponent<CardBarProps> = ({
  title,
  poolAmount,
  poolAmountUSD,
  participants,
  owner,
}) => (
  <CardBackground style={{ padding: "26px 56px" }}>
    <Container>
      <Peta style={{ fontFamily: "Bluu Next" }}>{title}</Peta>
      <ExploreInfo
        title="Pool Amount"
        text={`${poolAmount} Ξ`}
        unit={`$${poolAmountUSD}`}
        isCardBar
      />
      <ExploreInfo
        title="Participants"
        text={`${participants}`}
        unit="People"
        isCardBar
      />
      <ExploreInfo title="Owner" text={`${owner}`} isCardBar />
    </Container>
  </CardBackground>
);

export default CardBar;
