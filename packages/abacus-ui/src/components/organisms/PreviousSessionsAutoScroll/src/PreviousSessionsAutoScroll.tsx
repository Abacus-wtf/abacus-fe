import SessionCard, {
  SessionCardProps,
} from "components/molecules/SessionCard/src/SessionCard";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

type PreviousSessionsAutoScrollProps = {
  sessions: SessionCardProps[];
};

const Container = styled.div`
  max-width: 100%;
  height: fit-content;
`;

const SessionContainer = styled.div<{ sessionLength: number }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  grid-gap: 40px;
`;

const PreviousSessionsAutoScroll: FunctionComponent<PreviousSessionsAutoScrollProps> =
  ({ sessions }) => (
    <Container>
      <SessionContainer sessionLength={sessions.length}>
        {sessions.map((session) => (
          <SessionCard {...session} />
        ))}
      </SessionContainer>
    </Container>
  );

export default PreviousSessionsAutoScroll;
