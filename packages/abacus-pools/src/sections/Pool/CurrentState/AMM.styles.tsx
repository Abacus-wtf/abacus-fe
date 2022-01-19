import styled from "styled-components"
import { ButtonsWhite } from "@components/Button"
import { Text } from "@components/global.styles"

export const BORDER = "0.5px solid #C4C4C4"

export const CardContainer = styled.div`
  width: 100%;
  height: 100%;
`

export const InfoSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  grid-gap: 15px;
  margin-bottom: 15px;
`

export const LabelRow = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.text1};
  font-size: 0.75rem;
  line-height: 1rem;
  span:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

export const BalanceContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: 500;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 25px;
  border: ${BORDER};
  padding: 16px;
`

export const MaxButton = styled(ButtonsWhite)`
  border: 1px solid #000000;
  border-radius: 16px;
  padding: 8px 16px;

  &:disabled {
    opacity: 0.7 !important;
    color: #000 !important;
    border: 1px solid #000000;
  }
`

export const TinyTitles = styled(Text)`
  color: #808191;
  font-size: 0.9rem;
  cursor: default !important;
  &:hover {
    opacity: 1 !important;
  }
`
