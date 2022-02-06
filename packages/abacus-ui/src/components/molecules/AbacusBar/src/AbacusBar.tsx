import React, { FunctionComponent } from "react";
import styled from "styled-components";
import _ from "lodash";

type AbacusBarProps = {
  currentPosition: number;
  totalNumberOfBeads: number;
  changeToPosition: (newPosition: number) => void;
};

// You probably want to change this to something semantic or abandon it all together
const Container = styled.div`
  border-radius: 60px;
  box-shadow: ${({ theme }) => theme.boxShadow.button};
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.core.white};
  width: fit-content;
  display: flex;
`;

const Bead = styled.div<{ isCurrent: boolean }>`
  background-color: ${({ isCurrent, theme }) =>
    isCurrent ? theme.colors.utility.gray : theme.colors.utility.blue};
  cursor: ${({ isCurrent }) => (isCurrent ? "default" : "pointer")};
  border-radius: 20px;
  height: 16px;
  width: 12px;
  border: 1px solid ${({ theme }) => theme.colors.core.white};
`;

const AbacusBar: FunctionComponent<AbacusBarProps> = ({
  currentPosition,
  totalNumberOfBeads,
  changeToPosition,
}) => (
  <Container>
    {_.map(_.range(0, totalNumberOfBeads), (i) => (
      <Bead
        isCurrent={i === currentPosition}
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
