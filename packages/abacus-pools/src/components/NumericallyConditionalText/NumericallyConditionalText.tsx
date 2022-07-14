import styled, { css } from "styled-components"

const NumericallyConditionalText = styled.div<{ value: number }>`
  margin-right: 4px;
  ${({ value }) =>
    value < 0
      ? css`
          color: ${({ theme }) => theme.colors.utility.red};
        `
      : ""}
  ${({ value }) =>
    value > 0
      ? css`
          color: ${({ theme }) => theme.colors.utility.green};
        `
      : ""}
`

export { NumericallyConditionalText }
