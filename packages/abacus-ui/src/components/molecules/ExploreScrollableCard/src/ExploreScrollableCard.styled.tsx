import { Font, Media } from "@theme";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius.section};
  background-color: ${({ theme }) => theme.colors.core.white};
  box-shadow: ${({ theme }) => theme.boxShadow.section};
  display: flex;
  flex-direction: column;
  padding: 12px;
  grid-gap: 20px;
  align-items: center;
  color: black;

  ${Media.lg`
    grid-gap: 28px;
  `}
`;

export const BadgeContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.core.border};
  padding: 8px 18px;
  border-radius: 70px;
  width: fit-content;
  height: fit-content;
  grid-gap: 8px;
  display: flex;
  font-weight: 500;
  ${Font("nano")};
  align-items: center;
`;

export const BadgeIndicator = styled.div<{ color: string }>`
  border-radius: 50%;
  height: 8px;
  width: 8px;
  background-color: ${({ color }) => color};
`;

export const NFTImage = styled.img`
  border-radius: ${({ theme }) => theme.borderRadius.section};
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 200px;
`;

export const Divider = styled.hr`
  width: 100%;
  border-color: ${({ theme }) => theme.colors.core.border};
`;

export const Title = styled.a`
  ${Font("peta")}
  text-align: center;
  font-family: "Bluu Next";
  overflow: "hidden";
  text-decoration: none;
  color: black;

  &:focus,
  &:hover,
  &:visited {
    color: black;
  }

  &::after {
    transition: ${({ theme }) => theme.transitionTime.main};
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  &:hover {
    &::after {
      opacity: 0.2;
      background-color: white;
    }
  }
`;

export const BottomContainer = styled.div`
  grid-gap: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  ${Media.lg`
    margin-bottom: 28px;
  `}
`;
