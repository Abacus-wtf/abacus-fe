import styled from "styled-components"
import { Media, Kilo, Button } from "abacus-ui"

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 12px;
  text-align: center;

  ${Media.sm`
    text-align: left;
  `}
`

export const Description = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core[800]};
`

export const BottomButtonContainer = styled.div`
  grid-gap: 20px;
  display: flex;
  width: 100%;
  flex-direction: column;
`

export const LockOuterContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

export const LockContainer = styled.div`
  display: flex;
  grid-gap: 18px;
  padding-left: 10px;
  align-items: center;
`

export const FullWidthButton = styled(Button)`
  width: 100%;
`

export const InputError = styled.span`
  color: ${({ theme }) => theme.colors.utility.red};
`

export const VerticallyCenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`

export const LoadingIconContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 16px;

  & svg {
    height: 40px;
    width: 40px;
  }
`
