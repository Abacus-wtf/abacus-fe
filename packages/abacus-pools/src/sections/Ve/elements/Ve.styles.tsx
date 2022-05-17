import { InfoBarContent, InfoBarItem } from "@components/InfoBar"
import { Font, H2, Media, Section } from "abacus-ui"
import styled from "styled-components"

export const SectionTitle = styled(H2)`
  ${Font("exa")};
  font-weight: bold;
  font-family: "Bluu next";
`

export const StyledSection = styled(Section)<{ order: number }>`
  row-gap: 24px;
  ${Media.md`
    order: ${({ order }: { order: number }) => order};
  `}
`

export const StyledInfoBarItem = styled(InfoBarItem)`
  flex: 1 0 auto;
`

export const StyledInfoBarContent = styled(InfoBarContent)`
  font-weight: 400;

  & span {
    color: ${({ theme }) => theme.colors.core[900]};
  }
`
