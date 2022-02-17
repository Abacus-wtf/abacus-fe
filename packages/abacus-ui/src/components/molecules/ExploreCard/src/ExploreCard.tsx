import {
  Button,
  ButtonType,
  ExploreImage,
  ExploreInfo,
  SessionCountdown,
} from "@atoms";
import { Font, Media } from "@theme";
import { ProfileGroup } from "components/molecules/ProfileGroup";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

export type ExploreCardProps = {
  nftSrc: string;
  nftTitle: string;
  endTime: number;
  numParticipants: number;
  poolAmount: number;
  poolAmountDollars: number;
  imgs: string[];
  link: string;
};

// You probably want to change this to something semantic or abandon it all together
const Container = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.section};
  background-color: ${({ theme }) => theme.colors.core.white};
  box-shadow: ${({ theme }) => theme.boxShadow.section};
  max-width: 80%;
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
  padding: 15px 20px;
  box-sizing: border-box;
`;

const Title = styled.h3`
  text-align: center;
  ${Font("peta", "Bluu Next")}

  ${Media.md`
    ${Font("zetta", "Bluu Next")}
  `}
`;

export const Divider = styled.div`
  margin: 15px 0px;
  height: 2px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.core.border};
`;

export const ExploreInfoContainer = styled.div`
  display: flex;
  width: 100%;
  grid-gap: 50px;
  justify-content: center;
`;

const ButtonStyled = styled(Button)`
  width: 100%;
`;

const ProfileGroupContainer = styled.div`
  display: none;

  ${Media.md`
    display: block;
  `}
`;

const ExploreCard: FunctionComponent<ExploreCardProps> = ({
  nftSrc,
  nftTitle,
  endTime,
  numParticipants,
  poolAmount,
  poolAmountDollars,
  imgs,
  link,
}) => (
  <Container>
    <ExploreImage imgSrc={nftSrc} />
    <SecondHalf>
      <Title>{nftTitle}</Title>
      <SessionCountdown endTime={endTime} />
      <Divider />
      <ExploreInfoContainer>
        <ExploreInfo
          title="Participants"
          text={`${numParticipants}`}
          unit="People"
        />
        <ExploreInfo
          title="Pool Amount"
          text={`${poolAmount} Ξ`}
          unit={`$${poolAmountDollars}`}
        />
      </ExploreInfoContainer>
      <a href={link} style={{ width: "100%" }}>
        <ButtonStyled buttonType={ButtonType.Standard}>
          Participate
        </ButtonStyled>
      </a>
      <ProfileGroupContainer>
        <ProfileGroup imgs={imgs} numParticipants={numParticipants} />
      </ProfileGroupContainer>
    </SecondHalf>
  </Container>
);

export default ExploreCard;
