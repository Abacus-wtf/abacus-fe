import { H3 } from "abacus-ui"
import styled from "styled-components"

export const ColumnTitle = styled(H3)`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.colors.core[900]};
  text-align: left;
`
