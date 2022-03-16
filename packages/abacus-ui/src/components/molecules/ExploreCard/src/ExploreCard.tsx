import {
  ButtonType,
  ExploreImage,
  ExploreInfo,
  SessionCountdown,
} from "@atoms";
import React, { FunctionComponent } from "react";
import {
  Container,
  SecondHalf,
  Title,
  Divider,
  ExploreInfoContainer,
  ButtonStyled,
  ProfileGroupContainer,
} from "./ExploreCard.styled";
import { ProfileGroup } from "../../ProfileGroup";
import Fallback from "./Fallback";

export type ExploreCardProps = {
  nftSrc: string;
  nftTitle: string;
  endTime: number;
  numParticipants: number;
  poolAmount: number;
  poolAmountDollars: number;
  imgs: string[];
  link: string;
  loading?: boolean;
  linkComponent?: string | React.ComponentType<any>;
};

const ExploreCard: FunctionComponent<ExploreCardProps> = ({
  nftSrc,
  nftTitle,
  endTime,
  numParticipants,
  poolAmount,
  poolAmountDollars,
  imgs,
  link,
  loading,
  linkComponent,
}) => {
  if (loading) {
    return <Fallback />;
  }
  return (
    <Container>
      <ExploreImage imgSrc={nftSrc} />
      <SecondHalf>
        <Title>{nftTitle}</Title>
        <SessionCountdown endTime={endTime} key={link} />
        <Divider />
        <ExploreInfoContainer>
          <ExploreInfo
            title="Participants"
            text={`${numParticipants}`}
            unit="People"
          />
          <ExploreInfo
            title="Pool Amount"
            text={`${poolAmount.toFixed(2)} Ξ`}
            unit={`$${poolAmountDollars ?? "-"}`}
          />
        </ExploreInfoContainer>
        <ButtonStyled
          buttonType={ButtonType.Standard}
          as={linkComponent || "a"}
          href={link}
          to={link}
        >
          Participate
        </ButtonStyled>
        <ProfileGroupContainer>
          <ProfileGroup imgs={imgs} numParticipants={numParticipants} />
        </ProfileGroupContainer>
      </SecondHalf>
    </Container>
  );
};

export default ExploreCard;
