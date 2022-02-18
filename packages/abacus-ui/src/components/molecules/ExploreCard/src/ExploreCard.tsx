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
  display: flex;
  flex-direction: column;
  padding: 0px;
`;

const SecondHalf = styled.div`
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
  margin-bottom: 18px;
  ${Font("peta", "Bluu Next")}

  ${Media.md`
    ${Font("zetta", "Bluu Next")}
  `}
`;

export const Divider = styled.hr`
  margin: 18px 0px;
  width: 100%;
  border-color: ${({ theme }) => theme.colors.core.border};
`;

export const ExploreInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  justify-content: center;
  margin-bottom: 18px;

  ${Media.sm`
    grid-column-gap: 50px;
    width: max-content;
  `}
`;

const ButtonStyled = styled(Button)`
  width: 100%;
`;

const ProfileGroupContainer = styled.div`
  display: none;
  margin-top: 18px;

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
