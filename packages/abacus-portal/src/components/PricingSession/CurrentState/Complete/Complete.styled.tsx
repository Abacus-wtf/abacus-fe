import styled from "styled-components"
import { Flex, Media, MiniList } from "abacus-ui"

export const FlexEndColumn = styled(Flex)`
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  align-items: center;
  gap: 20px;
  margin-top: 20px;

  ${Media.sm`
    gap: 40px;
    margin-top: 14px;
  `}
`

export const StyledMiniList = styled(MiniList)`
  width: 100%;
`

export const WinnerImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 225px;
`
