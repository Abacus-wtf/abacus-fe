import { Button, Exa, Kilo } from "abacus-ui"
import styled from "styled-components"

export const UpperContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  grid-row-gap: 16px;
`

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled(Exa)`
  justify-self: flex-start;
  width: max-content;
  font-family: "Bluu next";
  line-height: 46px;
  flex-grow: 1;
`

export const CurrentTicket = styled(Kilo)`
  display: flex;
  gap: 4px;
  width: max-content;
  justify-content: flex-end;
  color: ${({ theme }) => theme.colors.core.primary};
`

export const CurrentTicketValue = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core.primary}60;
`

export const PageContainer = styled.div`
  display: flex;
  grid-gap: 8px;
`

export const ProgressLabel = styled.span`
  display: flex;
  color: ${({ theme }) => theme.colors.core["900"]};
`

export const ProgressValue = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.core.primary};
`

export const ConfirmButton = styled(Button)`
  width: 100%;
  padding: 22px;
  border-radius: 80px;
`
