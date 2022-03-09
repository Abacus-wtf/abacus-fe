import styled from "styled-components"
import { Mega, Media } from "abacus-ui"

export const InfoContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.core.label};
  align-self: center;
  border-radius: ${({ theme }) => theme.borderRadius.section};
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 18px;
  flex: 1 1 0px;
  text-align: center;

  ${Media.sm`
    padding: 18px 40px;
  `}
`

export const InfoTitle = styled(Mega)`
  font-size: 22px;
  font-weight: bold;
`
