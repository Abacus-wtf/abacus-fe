import { ExploreInfo, SessionCountdown } from "@atoms";
import { Font, Media } from "@theme";
import {
  ExploreCardProps,
  ExploreInfoContainer,
} from "components/molecules/ExploreCard/src/ExploreCard";
import React, { FunctionComponent, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { ProfileGroup } from "../../ProfileGroup";

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
const Container = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.section};
  background-color: ${({ theme }) => theme.colors.core.white};
  box-shadow: ${({ theme }) => theme.boxShadow.section};
  display: flex;
  flex-direction: column;
  padding: 12px;
  grid-gap: 20px;
  align-items: center;
  color: black;

  ${Media.lg`
    grid-gap: 28px;
  `}
`;

const BadgeContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.core.border};
  padding: 8px 18px;
  border-radius: 70px;
  width: fit-content;
  height: fit-content;
  grid-gap: 8px;
  display: flex;
  font-weight: 500;
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
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 200px;
`;

export const Divider = styled.hr`
  width: 100%;
  border-color: ${({ theme }) => theme.colors.core.border};
`;

const Title = styled.a`
  ${Font("peta")}
  text-align: center;
  font-family: "Bluu Next";
  overflow: "hidden";
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited {
    color: black;
  }

  &::after {
    transition: ${({ theme }) => theme.transitionTime.main};
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  &:hover {
    &::after {
      opacity: 0.2;
      background-color: white;
    }
  }
`;

const BottomContainer = styled.div`
  grid-gap: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  ${Media.lg`
    margin-bottom: 28px;
  `}
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
