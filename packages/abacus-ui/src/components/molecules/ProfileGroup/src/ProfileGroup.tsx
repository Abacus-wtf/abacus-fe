import { ProfileIcon } from "@atoms";
import { Font } from "@theme";
import _ from "lodash";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

type ProfileGroupProps = {
  imgs: string[];
  numParticipants: number;
};

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
  color: ${({ theme }) => theme.colors.core.semiTitle};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileGroup: FunctionComponent<ProfileGroupProps> = ({
  imgs,
  numParticipants,
}) => (
  <ProfileContainer>
    {_.map(_.range(0, imgs.length > 9 ? 9 : imgs.length), (i) => {
      if (i === 8) {
        return <PlusIcon key="plus-icon">+{numParticipants - 9}</PlusIcon>;
      }
      return (
        <ProfileIcon
          key={i}
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
);

export default ProfileGroup;
