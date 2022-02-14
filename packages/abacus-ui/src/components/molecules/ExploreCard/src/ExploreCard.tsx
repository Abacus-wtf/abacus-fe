import {
  Button,
  ButtonType,
  ExploreImage,
  ExploreInfo,
  ProfileIcon,
  SessionCountdown,
} from "@atoms";
import { Font } from "@theme";
import { Yotta } from "@typography";
import _ from "lodash";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

type ExploreCardProps = {
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

  // @TODO: Subject to change for differing screen sizes
  width: 480px;
  height: 935px;
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

const Divider = styled.div`
  margin: 15px 0px;
  height: 2px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.core.border};
`;

const ExploreInfoContainer = styled.div`
  display: flex;
  width: 100%;
  grid-gap: 50px;
  justify-content: center;
`;

const ButtonStyled = styled(Button)`
  width: 100%;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const PlusIcon = styled.div`
  border: 2px solid #fff;
  height: 36px;
  width: 36px;
  margin-right: -8px;
  background-color: #f6f6f6;
  ${Font("milli")};
  color: #1c2333;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
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
      <Yotta style={{ fontFamily: "Bluu Next" }}>{nftTitle}</Yotta>
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
      <ProfileContainer>
        {_.map(_.range(0, imgs.length > 9 ? 9 : imgs.length), (i) => {
          if (i === 8) {
            return <PlusIcon>+{numParticipants - 9}</PlusIcon>;
          }
          return (
            <ProfileIcon
              src={imgs[i]}
              style={{
                border: "2px solid #fff",
                height: 36,
                width: 36,
                marginRight: -8,
              }}
            />
          );
        })}
      </ProfileContainer>
    </SecondHalf>
  </Container>
);

export default ExploreCard;
