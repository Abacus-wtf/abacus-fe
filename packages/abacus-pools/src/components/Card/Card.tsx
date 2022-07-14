import styled, { css } from "styled-components"
import { Section, Mega, Media } from "abacus-ui"

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  max-width: 50%;
`

export const CardInfoContent = styled(Mega)`
  font-size: 22px;
  display: flex;
`

export const CardInfoRow = styled.div<{ flexGrow?: boolean }>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex: ${({ flexGrow }) => (flexGrow ? "1 0 auto" : "unset")};

  & ${CardInfo}:last-of-type {
    align-items: flex-end;
  }
`

export const CardContainer = styled(Section)<{ hasLink: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
  row-gap: 24px;

  ${({ hasLink }) =>
    hasLink
      ? css`
          &:focus-within,
          &:hover {
            transform: scale(1.01);
          }
        `
      : null}
`

export const CardTitle = styled(CardInfoContent)<{ hasLink: boolean }>`
  color: ${({ theme }) => theme.colors.core.primary};
  text-decoration: none;

  ${({ hasLink }) =>
    hasLink
      ? css`
          &:hover,
          &:focus {
            color: ${({ theme }) => theme.colors.core.primary};
            &::after {
              opacity: 0.2;
              background-color: white;
            }
          }

          &::after {
            transition: all ${({ theme }) => theme.transitionTime.main},
              opacity 0;
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            border-radius: ${({ theme }) => theme.borderRadius.section};
          }
        `
      : null}
`

export const CardGrid = styled.div`
  display: grid;
  grid-row-gap: 24px;
  grid-column-gap: 32px;

  ${Media.sm`
    grid-template-columns: repeat(2, calc(50% - 16px));
  `}

  ${Media.lg`
    grid-template-columns: repeat(3, calc(calc(100% / 3) - calc(64px / 3)));
  `}
`
