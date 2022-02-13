import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Countdown from "react-countdown";
import { Mega } from "components/typography/Mega";
import { Kilo } from "@typography";

type SessionCountdownProps = {
  endTime: number;
};

const IndivContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 6px;
`;

const Subtext = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core[900]};
`;

const SessionCountdown: FunctionComponent<SessionCountdownProps> = ({
  endTime,
}) => (
  <Countdown
    date={endTime}
    renderer={({ hours, minutes, seconds, completed }) => {
      if (completed) {
        return "Session Completed";
      }
      return (
        <div style={{ display: "flex", gridGap: 30 }}>
          <IndivContainer>
            <Mega>{hours}</Mega>
            <Subtext>Hours</Subtext>
          </IndivContainer>
          <IndivContainer>
            <Mega>{minutes}</Mega>
            <Subtext>Minutes</Subtext>
          </IndivContainer>
          <IndivContainer>
            <Mega>{seconds}</Mega>
            <Subtext>Seconds</Subtext>
          </IndivContainer>
        </div>
      );
    }}
  />
);

export default SessionCountdown;
