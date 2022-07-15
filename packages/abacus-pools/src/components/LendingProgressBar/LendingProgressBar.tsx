import React from "react"
import { ProgressBar } from "abacus-ui"
import styled from "styled-components"

const StyledProgressBar = styled(ProgressBar)`
  width: 100%;
  height: 8px;
  min-height: unset;
  background-color: ${({ theme }) => theme.colors.utility.green};
`

type LendingProgressBarProps = { progress: number }

const LendingProgressBar = ({ progress }: LendingProgressBarProps) => (
  <StyledProgressBar progress={progress} label={null} />
)

export { LendingProgressBar }
