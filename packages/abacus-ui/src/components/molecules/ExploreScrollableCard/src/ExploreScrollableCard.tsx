import { ExploreInfo, SessionCountdown } from "@atoms";
import React, { FunctionComponent, useContext } from "react";
import { ThemeContext } from "styled-components";
import { ExploreCardProps, ExploreInfoContainer } from "../../ExploreCard";
import { ProfileGroup } from "../../ProfileGroup";
import Fallback from "./Fallback";
import {
  NFTImage,
  Container,
  BadgeContainer,
  BadgeIndicator,
  Title,
  Divider,
  BottomContainer,
} from "./ExploreScrollableCard.styled";

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
  loading?: boolean;
};

const ExploreScrollableCard: FunctionComponent<ExploreScrollableCardProps> = ({
  cardInfo,
  currentStatus,
  loading,
}) => {
  const theme = useContext(ThemeContext);

  if (loading) {
    return <Fallback />;
  }

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
    <Container>
      <div style={{ width: "100%" }}>
        <BadgeContainer>
          <BadgeIndicator color={badgeColor} />
          {badgeTitle}
        </BadgeContainer>
      </div>
      <NFTImage src={cardInfo.nftSrc} alt={cardInfo.nftTitle} />
      <Title href={cardInfo.link}>{cardInfo.nftTitle}</Title>
      <ExploreInfoContainer>
        <ExploreInfo
          title="Participants"
          text={`${cardInfo.numParticipants}`}
          unit="People"
        />
        <ExploreInfo
          title="Pool Amount"
          text={`${cardInfo.poolAmount.toFixed(2)} Ξ`}
          unit={`$${cardInfo.poolAmountDollars}`}
        />
      </ExploreInfoContainer>
      <Divider />
      <BottomContainer>
        <ProfileGroup
          imgs={cardInfo.imgs}
          numParticipants={cardInfo.numParticipants}
        />
        <SessionCountdown endTime={cardInfo.endTime} />
      </BottomContainer>
    </Container>
  );
};

export default ExploreScrollableCard;
