import { ExploreInfo, SessionCountdown } from "@atoms";
import { ProfileGroup } from "@molecules";
import { Font } from "@theme";
import { Tera } from "@typography";
import {
  Divider,
  ExploreCardProps,
  ExploreInfoContainer,
} from "components/molecules/ExploreCard/src/ExploreCard";
import React, { FunctionComponent, useContext } from "react";
import styled, { ThemeContext } from "styled-components";

export enum SessionState {
  Vote = 0,
  Weigh = 1,
  SetFinalAppraisal = 2,
  Harvest = 3,
  Claim = 4,
  Complete = 5,
}

type ExploreScrollableCardProps = {
  cardInfo: ExploreCardProps;
  currentStatus: SessionState;
};

// You probably want to change this to something semantic or abandon it all together
const Container = styled.a`
  border-radius: ${({ theme }) => theme.borderRadius.section};
  background-color: ${({ theme }) => theme.colors.core.white};
  box-shadow: ${({ theme }) => theme.boxShadow.section};

  // @TODO: Subject to change for differing screen sizes
  width: 430px;
  height: 665px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  grid-gap: 20px;
  align-items: center;
  transition: ${({ theme }) => theme.transitionTime.main};
  cursor: pointer;
  text-decoration: none;
  color: black;

  &:hover {
    opacity: 0.8;
  }
`;

const BadgeContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.core.border};
  padding: 8px 18px;
  border-radius: 70px;
  width: fit-content;
  height: fit-content;
  grid-gap: 8px;
  display: flex;
  font-weight: 600;
  ${Font("nano")};
  align-items: center;
`;

const BadgeIndicator = styled.div<{ color: string }>`
  border-radius: 50%;
  height: 8px;
  width: 8px;
  background-color: ${({ color }) => color};
`;

const NFTImage = styled.img`
  border-radius: ${({ theme }) => theme.borderRadius.section};
  max-height: 220px;
  width: fit-content;
`;

const ExploreScrollableCard: FunctionComponent<ExploreScrollableCardProps> = ({
  cardInfo,
  currentStatus,
}) => {
  const theme = useContext(ThemeContext);
  const badgeTitle =
    currentStatus === SessionState.Vote
      ? "Voting Live"
      : currentStatus === SessionState.Weigh
      ? "Weighing Votes"
      : currentStatus === SessionState.SetFinalAppraisal
      ? "Setting Final Appraisal"
      : currentStatus === SessionState.Harvest
      ? "Harvesting"
      : currentStatus === SessionState.Claim
      ? "Claiming"
      : "Session Completed";

  const badgeColor =
    currentStatus === SessionState.Vote
      ? theme.colors.utility.blue
      : currentStatus === SessionState.Weigh
      ? theme.colors.core[900]
      : currentStatus === SessionState.SetFinalAppraisal
      ? theme.colors.utility.yellow
      : currentStatus === SessionState.Harvest
      ? theme.colors.utility.purple
      : currentStatus === SessionState.Claim
      ? theme.colors.utility.brown
      : theme.colors.utility.green;
  return (
    <Container href={cardInfo.link}>
      <div style={{ width: "100%" }}>
        <BadgeContainer>
          <BadgeIndicator color={badgeColor} />
          {badgeTitle}
        </BadgeContainer>
      </div>
      <NFTImage src={cardInfo.nftSrc} alt={cardInfo.nftTitle} />
      <Tera style={{ fontFamily: "Bluu Next" }}>{cardInfo.nftTitle}</Tera>
      <ExploreInfoContainer>
        <ExploreInfo
          title="Participants"
          text={`${cardInfo.numParticipants}`}
          unit="People"
        />
        <ExploreInfo
          title="Pool Amount"
          text={`${cardInfo.poolAmount} Ξ`}
          unit={`$${cardInfo.poolAmountDollars}`}
        />
      </ExploreInfoContainer>
      <Divider />
      <div
        style={{
          gridGap: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ProfileGroup
          imgs={cardInfo.imgs}
          numParticipants={cardInfo.numParticipants}
        />
        <SessionCountdown endTime={cardInfo.endTime} />
      </div>
    </Container>
  );
};

export default ExploreScrollableCard;
