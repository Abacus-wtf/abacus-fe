import { Kilo, Mega } from "@typography";
import { CardWithTitle } from "components/molecules/CardWithTitle";
import _ from "lodash";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const ListContainer = styled.div`
  height: 100%;
  overflow: scroll;
  width: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: 15px;
`;

const RowContainer = styled.div`
  display: flex;
  width: 100%;
  grid-gap: 10px;
`;

const ProfileImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const TextContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  grid-gap: 3px;
`;

const StyledKilo = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core[900]};
`;

const EmptyContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 5px;
`;

type ActivitySectionProps = {
  activityList: {
    img: string;
    appraisalAmount: number;
    stakeAmount: number;
    appraisorAddress: string;
  }[];
};

const ActivitySection: FunctionComponent<ActivitySectionProps> = ({
  activityList,
}: ActivitySectionProps) => (
  <CardWithTitle title="Activity">
    <ListContainer>
      {activityList.length > 0 ? (
        _.map(activityList, (activity) => (
          <RowContainer>
            <ProfileImage src={activity.img} />
            <TextContainer>
              <Kilo style={{ fontWeight: 600 }}>
                {activity.appraisorAddress}
              </Kilo>
              <StyledKilo>
                {activity.appraisalAmount} ETH appraisal with a{" "}
                {activity.stakeAmount} ETH stake
              </StyledKilo>
            </TextContainer>
          </RowContainer>
        ))
      ) : (
        <EmptyContainer>
          <img src="../../../../static/white_cube.png" alt="White Cube" />
          <Mega style={{ fontWeight: 500, textAlign: "center" }}>
            Nobody has appraised yet!
          </Mega>
          <StyledKilo style={{ textAlign: "center" }}>
            This will show all the people who submitted their appraisal.
          </StyledKilo>
        </EmptyContainer>
      )}
    </ListContainer>
  </CardWithTitle>
);

export default ActivitySection;
