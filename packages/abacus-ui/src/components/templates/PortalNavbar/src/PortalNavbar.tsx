import { Button, ButtonType } from "@atoms";
import { Logo, ProfileInfo } from "@molecules";
import { Kilo, Tera } from "@typography";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Dropdown from "../../../../static/dropdown.svg";
import Extras from "../../../../static/extras.svg";

type PortalNavbarTypes = {
  balance: number;
  profileName: string;
  profileIcon: string;
};

// You probably want to change this to something semantic or abandon it all together
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 28px;
  align-items: center;
`;

const SideContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Divider = styled.div`
  background: rgba(0, 0, 0, 0.2);
  width: 1px;
  height: 38px;
`;

const ImageContainer = styled.div`
  height: 38px;
  justify-content: center;
  display: flex;
`;

const PortalNavbar: FunctionComponent<PortalNavbarTypes> = ({
  balance,
  profileName,
  profileIcon,
}) => (
  <Container>
    <SideContainer style={{ gridGap: 8, alignItems: "flex-end" }}>
      <Logo />
      <Divider />
      <Tera>Crowds</Tera>
      <ImageContainer>
        <img
          style={{ width: 18, marginLeft: 5, marginTop: 5 }}
          src={Dropdown}
          alt="Dropdown"
        />
      </ImageContainer>
    </SideContainer>
    <SideContainer style={{ gridGap: 32 }}>
      <Kilo>
        {balance.toLocaleString("en-us", {
          maximumSignificantDigits: 2,
          minimumSignificantDigits: 2,
        })}{" "}
        ETH
      </Kilo>
      <Button buttonType={ButtonType.White}>New Session</Button>
      <ProfileInfo profileIcon={profileIcon} profileName={profileName} />
      <Button style={{ padding: 0 }} buttonType={ButtonType.Clear}>
        <img src={Extras} alt="Menu Options" />
      </Button>
    </SideContainer>
  </Container>
);

export default PortalNavbar;
