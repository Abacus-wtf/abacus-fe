import { H4, Media } from "abacus-ui"
import styled from "styled-components"

export const ColumnContainer = styled.div`
  width: 100%;
  align-items: center;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, calc(50% - 8px));

  ${Media.sm`
    grid-template-columns: repeat(2, 1fr) max-content;
  `}
`

type Spanable = { span: number }
export const Heading = styled(H4)<Spanable>`
  flex: 0 1 auto;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.core[900]};

  ${Media.sm`
    grid-column: span ${({ span }: Spanable) => span};
  `}
`
