import React, { FunctionComponent } from "react";
import styled from "styled-components";
import _ from "lodash";

type AbacusBarProps = {
  currentPosition: number;
  totalNumberOfBeads: number;
  changeToPosition: (newPosition: number) => void;
  loading?: boolean;
};

// You probably want to change this to something semantic or abandon it all together
const Container = styled.div`
  border-radius: 60px;
  box-shadow: ${({ theme }) => theme.boxShadow.button};
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.core.white};
  width: fit-content;
  display: flex;
  height: 16px;
  align-items: center;
`;

const Bead = styled.button<{
  beadPosition: number;
  currentPosition: number;
  maxPosition: number;
  loading: boolean;
}>`
  background-color: ${({ currentPosition, beadPosition, theme }) =>
    currentPosition === beadPosition
      ? theme.colors.utility.gray
      : theme.colors.utility.blue};
  cursor: ${({ currentPosition, beadPosition }) =>
    currentPosition === beadPosition ? "default" : "pointer"};
  border-radius: 20px;
  height: 16px;
  width: 12px;
  border: 1px solid ${({ theme }) => theme.colors.core.white};
  position: absolute;
  z-index: 1;
  transform: translateX(
    ${({ beadPosition, currentPosition, maxPosition }) =>
      beadPosition <= currentPosition
        ? beadPosition * 13
        : 250 - (maxPosition - beadPosition) * 13}px
  );
  ${({ loading }) => (loading ? "transform: translateX(0px);" : "")}

  transition: transform ${({ theme }) => theme.transitionTime.main};
`;

const GradientLine = styled.div`
  height: 2px;
  width: 250px;
  z-index: 0;
  background: linear-gradient(90deg, #3e74ff -14.08%, rgba(0, 0, 0, 0) 127.23%);
`;

const AbacusBar: FunctionComponent<AbacusBarProps> = ({
  currentPosition,
  totalNumberOfBeads,
  changeToPosition,
  loading,
}) => (
  <Container>
    <GradientLine />
    {_.map(_.range(0, totalNumberOfBeads), (i) => (
      <Bead
        key={i}
        beadPosition={i}
        currentPosition={currentPosition}
        maxPosition={totalNumberOfBeads}
        loading={Boolean(loading)}
        onClick={() => {
          if (i !== currentPosition) {
            changeToPosition(i);
          }
        }}
      />
    ))}
  </Container>
);

export default AbacusBar;
