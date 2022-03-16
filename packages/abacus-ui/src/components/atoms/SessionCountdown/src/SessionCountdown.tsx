import React, { FunctionComponent } from "react";
import Countdown from "react-countdown";
import { Text, IndivContainer, Subtext } from "./SessionCountdown.styled";
import Fallback from "./Fallback";

type SessionCountdownProps = {
  endTime: number;
  loading?: boolean;
  key?: string;
  onComplete?: () => void;
  completedText?: string;
};

const SessionCountdown: FunctionComponent<SessionCountdownProps> = ({
  endTime,
  loading,
  key,
  onComplete,
  completedText,
}) => {
  if (loading) {
    return <Fallback />;
  }
  return (
    <Countdown
      date={endTime}
      key={key}
      onComplete={onComplete}
      renderer={({ hours, minutes, seconds, completed }) => {
        if (completed) {
          return <Text>{completedText || "Session Completed"}</Text>;
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
