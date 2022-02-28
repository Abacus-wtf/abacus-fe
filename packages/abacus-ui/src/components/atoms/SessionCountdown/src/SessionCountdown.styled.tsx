import styled from "styled-components";
import { Milli, Kilo } from "@typography";
import { Font, Media } from "@theme";

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
