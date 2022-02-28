import { Button } from "@atoms";
import { Font, Media } from "@theme";
import styled from "styled-components";

export const Container = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.section};
  background-color: ${({ theme }) => theme.colors.core.white};
  box-shadow: ${({ theme }) => theme.boxShadow.section};
  display: flex;
  flex-direction: column;
  padding: 0px;
  position: relative;
`;

export const SecondHalf = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 20px;
  box-sizing: border-box;
`;

export const Title = styled.h3`
  text-align: center;
  margin-bottom: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  ${Font("peta", "Bluu Next")}

  ${Media.md`
    ${Font("zetta", "Bluu Next")}
  `}
`;

export const Divider = styled.hr`
  margin: 18px 0px;
  width: 100%;
  border-color: ${({ theme }) => theme.colors.core.border};
`;

export const ExploreInfoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  justify-content: center;
  margin-bottom: 18px;
  text-align: center;

  ${Media.sm`
    grid-column-gap: 50px;
    width: max-content;
  `}
`;

export const ButtonStyled = styled(Button)`
  display: flex;
  text-align: center;
  justify-content: center;
  width: 100%;
`;

export const ProfileGroupContainer = styled.div`
  display: none;
  margin-top: 18px;

  ${Media.md`
    display: block;
  `}
`;
