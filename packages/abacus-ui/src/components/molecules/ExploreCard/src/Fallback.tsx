import React, { FunctionComponent } from "react";
import {
  LoadingShimmer,
  ExploreImage,
  ButtonType,
  ExploreInfo,
  SessionCountdown,
} from "@atoms";
import { ProfileGroup } from "../../ProfileGroup";
import {
  Container,
  SecondHalf,
  Title,
  Divider,
  ExploreInfoContainer,
  ButtonStyled,
  ProfileGroupContainer,
} from "./ExploreCard.styled";

const Fallback: FunctionComponent = () => (
  <Container>
    <ExploreImage imgSrc="" loading />
    <SecondHalf>
      <Title>
        <LoadingShimmer>loading</LoadingShimmer>
      </Title>
      <SessionCountdown endTime={0} loading />
      <Divider />
      <ExploreInfoContainer>
        <ExploreInfo
          title="Participants"
          text={<LoadingShimmer>loading</LoadingShimmer>}
          unit="People"
        />
        <ExploreInfo
          title="Pool Amount"
          text={<LoadingShimmer>loading</LoadingShimmer>}
          unit={<LoadingShimmer>loading</LoadingShimmer>}
        />
      </ExploreInfoContainer>
      <ButtonStyled buttonType={ButtonType.Standard}>Participate</ButtonStyled>
      <ProfileGroupContainer>
        <ProfileGroup imgs={[]} numParticipants={0} loading />
      </ProfileGroupContainer>
    </SecondHalf>
  </Container>
);

export default Fallback;
