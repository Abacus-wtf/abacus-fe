import { H2 } from "abacus-ui"
import styled from "styled-components"

export const SectionHeader = styled.header`
  width: 100%;
  padding: 0;
  padding-bottom: 8px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid ${({ theme }) => theme.colors.core.border};
  justify-self: flex-start;
`

export const SectionTitle = styled(H2)`
  font-size: 16px;
  font-weight: bold;
`
