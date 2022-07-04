import { Font, H2, Media, Section } from "abacus-ui"

import styled from "styled-components"
import { InfoBarContent, InfoBarItem } from "@components/index"

export const SectionTitle = styled(H2)`
  ${Font("exa")}
  font-family: "Bluu next";
`

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  width: 100%;
`

export const StyledSection = styled(Section)`
  display: flex;
  flex-direction: column;
  padding: 12px;
  row-gap: 24px;

  ${Media.md`
    padding: 24px;
    flex-direction: row;
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
