import { Button, ButtonType } from "components/atoms/Button/src";
import { ProfileIcon } from "components/atoms/ProfileIcon";
import { Kilo } from "components/typography/Kilo/src";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const ButtonStyled = styled(Button)`
  grid-gap: 8px;
  display: flex;
  flex-direction: row;
  color: black;
  padding: 0px;
`;

type ProfileInfoProps = {
  profileName: string;
  profileIcon: string;
};

const ProfileInfo: FunctionComponent<ProfileInfoProps> = ({
  profileName,
  profileIcon,
}) => (
  <ButtonStyled buttonType={ButtonType.Clear}>
    <ProfileIcon src={profileIcon} />
    <Kilo>{profileName}</Kilo>
  </ButtonStyled>
);

export default ProfileInfo;
