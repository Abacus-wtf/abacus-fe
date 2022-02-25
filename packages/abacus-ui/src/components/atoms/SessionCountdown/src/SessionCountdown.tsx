import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Countdown from "react-countdown";
import { Milli, Kilo } from "@typography";
import { Font, Media } from "@theme";
import Fallback from "./Fallback";

type SessionCountdownProps = {
  endTime: number;
  loading?: boolean;
};

export const IndivContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;

  &:last-of-type {
    margin-right: 0;
  }
`;

export const Text = styled(Kilo)`
  ${Media.md`
    font-size: 18px;
  `}
  margin-bottom: 6px;
`;

export const Subtext = styled(Milli)`
  ${Font("nano")}
  color: ${({ theme }) => theme.colors.core[900]};

  ${Media.md`
  ${Font("milli")}
  `}
`;

const SessionCountdown: FunctionComponent<SessionCountdownProps> = ({
  endTime,
  loading,
}) => {
  if (loading) {
    return <Fallback />;
  }
  return (
    <Countdown
      date={endTime}
      renderer={({ hours, minutes, seconds, completed }) => {
        if (completed) {
          return <Text>Session Completed</Text>;
        }
        return (
          <div style={{ display: "flex" }}>
            <IndivContainer>
              <Text>{hours}</Text>
              <Subtext>Hours</Subtext>
            </IndivContainer>
            <IndivContainer>
              <Text>{minutes}</Text>
              <Subtext>Minutes</Subtext>
            </IndivContainer>
            <IndivContainer>
              <Text>{seconds}</Text>
              <Subtext>Seconds</Subtext>
            </IndivContainer>
          </div>
        );
      }}
    />
  );
};

export default SessionCountdown;
