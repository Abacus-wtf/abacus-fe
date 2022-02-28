import React, { FunctionComponent, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import { LoadingShimmer, ExploreInfo, SessionCountdown } from "@atoms";
import { ExploreInfoContainer } from "../../ExploreCard";
import { ProfileGroup } from "../../ProfileGroup";
import {
  Container,
  BadgeContainer,
  BadgeIndicator,
  Title,
  Divider,
  BottomContainer,
} from "./ExploreScrollableCard.styled";

const ImageLoadingShimmer = styled(LoadingShimmer)`
  border-radius: ${({ theme }) => theme.borderRadius.section};
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 200px;
`;

const Fallback: FunctionComponent = () => {
  const theme = useContext(ThemeContext);
  return (
    <Container>
      <div style={{ width: "100%" }}>
        <BadgeContainer>
          <BadgeIndicator color={theme.colors.utility.gray} />
          Loading...
        </BadgeContainer>
      </div>
      <ImageLoadingShimmer />
      <Title href="">
        <LoadingShimmer>Loading</LoadingShimmer>
      </Title>
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
      <Divider />
      <BottomContainer>
        <ProfileGroup imgs={[]} numParticipants={0} loading />
        <SessionCountdown endTime={0} loading />
      </BottomContainer>
    </Container>
  );
};

export default Fallback;
