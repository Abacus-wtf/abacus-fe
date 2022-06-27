import styled from "styled-components"
import { Media } from "abacus-ui"

export const NFTGrid = styled.div<{ size: number }>`
  display: grid;
  gap: 8px;
  grid-template-columns: ${({ size }) => {
    if (size < 2) {
      return "1fr"
    }
    return "repeat(2, calc(50% - 4px))"
  }};

  ${Media.md`
    gap: 24px;
    grid-template-columns: ${({ size }: { size: number }) => {
      if (size < 2) {
        return "1fr"
      }
      if (size <= 4) {
        return "repeat(2, calc(50% - 12px))"
      }
      if (size <= 9) {
        return "repeat(3, calc(calc(100% / 3) - 8px))"
      }
      if (size <= 16) {
        return "repeat(4, calc(25% - 6px))"
      }
      return "repeat(5, calc(20% - calc(24px / 5)))"
    }};
  `}
`
