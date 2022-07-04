import { Giga, Kilo, Media, Section, Zetta } from "abacus-ui"
import styled from "styled-components"

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Container = styled(Section)`
  display: flex;
  flex-direction: column;
  row-gap: 24px;

  ${Media.md`
    flex-direction: row;
    justify-content: space-between;

    & ${InfoWrapper}:last-of-type {
      text-align: right;
    }
  `}
`

export const InfoLabel = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core[900]};
`

export const InfoData = styled(Zetta)`
  font-size: 44px;
  font-weight: bold;
`

export const InfoSecondaryData = styled(Giga)`
  font-weight: bold;
`
