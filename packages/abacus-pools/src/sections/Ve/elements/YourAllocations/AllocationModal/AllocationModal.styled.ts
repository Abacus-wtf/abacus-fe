import { Font, H2, H3 } from "abacus-ui"
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

export const ColumnTitle = styled(H3)`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.core[900]};
  text-align: left;
`
