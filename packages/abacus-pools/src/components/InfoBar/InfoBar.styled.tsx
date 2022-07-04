import styled from "styled-components"
import { Section, Kilo, Mega, Media } from "abacus-ui"

export const InfoBarContainer = styled(Section)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;

  ${Media.sm`
    flex-direction: row;  
    flex-wrap: wrap;
    column-gap: 40px;
    row-gap: 16px;
  `}

  ${Media.lg`
    column-gap: 80px;
  `}
`
export const InfoBarItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  row-gap: 8px;

  ${Media.md`
    max-width: 25%;
  `}
`

export const InfoBarTitle = styled(Kilo)`
  text-align: left;
`

export const InfoBarContent = styled(Mega)`
  font-size: 22px;
  font-weight: bold;
  text-align: left;
`
