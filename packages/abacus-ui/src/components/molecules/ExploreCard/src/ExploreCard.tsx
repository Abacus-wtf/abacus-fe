import { ExploreImage, SessionCountdown } from "@atoms";
import { Yotta } from "@typography";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

type ExploreCardProps = {
  nftSrc: string;
  nftTitle: string;
  endTime: number;
  numParticipants: number;
  poolAmount: number;
  imgs: string[];
};

// You probably want to change this to something semantic or abandon it all together
const Container = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.section};
  background-color: ${({ theme }) => theme.colors.core.white};
  filter: ${({ theme }) => theme.boxShadow.section};

  // @TODO: Subject to change for differing screen sizes
  width: 480px;
  height: 900px;
  display: flex;
  flex-direction: column;
  padding: 0px;
`;

const SecondHalf = styled.div`
  grid-gap: 18px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
`;

const Divider = styled.div`
  margin: 15px 0px;
  height: 2px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.core.border};
`;

const ExploreCard: FunctionComponent<ExploreCardProps> = ({
  nftSrc,
  nftTitle,
  endTime,
  numParticipants,
  poolAmount,
  imgs,
}) => (
  <Container>
    <ExploreImage imgSrc={nftSrc} />
    <SecondHalf>
      <Yotta style={{ fontFamily: "Bluu Next" }}>{nftTitle}</Yotta>
      <SessionCountdown endTime={endTime} />
      <Divider />
    </SecondHalf>
  </Container>
);

export default ExploreCard;
