import { ButtonsWhite } from "@components/Button"
import styled from "styled-components"

export const EmissionsIndicator = styled(ButtonsWhite)<{ start: boolean }>`
  &:disabled {
    ${({ start }) =>
      start
        ? `
  color: #00FF00 !important;
  border-color: #00FF00 !important;
`
        : `
  color: #FF0000 !important;
  border-color: #FF0000 !important;
`};
  }
`
