import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Kilo from "../../../typography/Kilo/src/Kilo";

type MiniListProps = {
  info: { [key: string]: string };
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
`;

const MiniContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledKilo = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core.white};
`;

const Divider = styled.div`
  background: #ffffff;
  opacity: 0.1;
  height: 2px;
  width: 100%;
`;

const MiniList: FunctionComponent<MiniListProps> = ({ info }) => (
  <Container>
    {Object.entries(info).map(([key, value], index) => (
      <>
        <MiniContainer>
          <StyledKilo>
            <b>{key}</b>
          </StyledKilo>
          <StyledKilo>{value}</StyledKilo>
        </MiniContainer>
        {index !== Object.entries(info).length - 1 ? <Divider /> : null}
      </>
    ))}
  </Container>
);

export default MiniList;
