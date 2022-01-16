import { theme } from "@config/theme"
import { Button } from "shards-react"
import styled from "styled-components"

const Buttons = styled(Button)`
  background-color: ${theme.colors.accent} !important;
  border-radius: 12px;
  color: ${theme.colors.bg1};
  transition: 0.3s;
  opacity: 1;
  font-weight: 500;
  border: none;

  &:hover {
    opacity: 0.8;
    color: ${theme.colors.bg1};
    background-color: ${theme.colors.accent} !important;
    box-shadow: none;
  }
`

export const ButtonsWhite = styled(Buttons)`
  background-color: #fff !important;
  color: ${({ theme }) => theme.colors.text2};
  border: 1px solid ${({ theme }) => theme.colors.text2};
  &:hover {
    opacity: 0.8;
    background-color: #fff !important;
    color: black;
  }

  &:active {
    color: black !important;
  }
`

export default Buttons
