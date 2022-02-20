import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Kilo from "../../../typography/Kilo/src/Kilo";

type MiniListProps = {
  info: { [key: string]: string };
  isDark?: boolean;
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

const StyledKilo = styled(Kilo)<{ isdark: boolean; isvalue: boolean }>`
  color: ${({ theme, isdark, isvalue }) =>
    isdark && isvalue
      ? theme.colors.core.primary
      : isdark
      ? theme.colors.core[800]
      : theme.colors.core.white};
`;

const Divider = styled.div<{ isdark: boolean }>`
  background: ${({ theme, isdark }) =>
    isdark ? theme.colors.core[800] : theme.colors.core.white};
  opacity: 0.1;
  height: 2px;
  width: 100%;
`;

const MiniList: FunctionComponent<MiniListProps> = ({ info, isDark }) => (
  <Container>
    {Object.entries(info).map(([key, value], index) => (
      <React.Fragment key={key}>
        <MiniContainer>
          <StyledKilo isvalue={false} isdark={isDark || false}>
            <b>{key}</b>
          </StyledKilo>
          <StyledKilo isvalue isdark={isDark || false}>
            {value}
          </StyledKilo>
        </MiniContainer>
        {index !== Object.entries(info).length - 1 ? (
          <Divider isdark={isDark || false} />
        ) : null}
      </React.Fragment>
    ))}
  </Container>
);

export default MiniList;
