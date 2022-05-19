import { Font, H2, Media } from "abacus-ui"
import styled from "styled-components"

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`

export const SectionHeader = styled(H2)`
  ${Font("peta", "Bluu next")}
  font-weight: bold;
`

export const Table = styled.table`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`

export const TR = styled.tr`
  display: grid;
  grid-template-columns: 0.1fr 1fr 1fr 0.2fr;
  align-items: center;
  column-gap: 12px;

  ${Media.md`
    column-gap: 24px;
  `}
`
