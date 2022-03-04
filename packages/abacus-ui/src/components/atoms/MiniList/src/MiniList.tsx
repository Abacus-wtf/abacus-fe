import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import Kilo from "../../../typography/Kilo/src/Kilo";

type MiniListProps = {
  info: { [key: string]: string | React.ReactNode };
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

const StyledKilo = styled(Kilo)<{ isDark: boolean; isValue: boolean }>`
  ${({ isValue }) =>
    isValue
      ? css`
          word-break: break-word;
        `
      : css`
          flex: 1 0 auto;
          margin-right: 16px;
        `};

  color: ${({ theme, isDark, isValue }) =>
    isDark && isValue
      ? theme.colors.core.primary
      : isDark
      ? theme.colors.core[800]
      : theme.colors.core.white};
`;

const Divider = styled.div<{ isDark: boolean }>`
  background: ${({ theme, isDark }) =>
    isDark ? theme.colors.core[800] : theme.colors.core.white};
  opacity: 0.1;
  height: 2px;
  width: 100%;
`;

const MiniList: FunctionComponent<MiniListProps> = ({ info, isDark }) => (
  <Container>
    {Object.entries(info).map(([key, value], index) => (
      <React.Fragment key={key}>
        <MiniContainer>
          <StyledKilo isValue={false} isDark={isDark || false}>
            <b>{key}</b>
          </StyledKilo>
          <StyledKilo isValue isDark={isDark || false}>
            {value}
          </StyledKilo>
        </MiniContainer>
        {index !== Object.entries(info).length - 1 ? (
          <Divider isDark={isDark || false} />
        ) : null}
      </React.Fragment>
    ))}
  </Container>
);

export default MiniList;
