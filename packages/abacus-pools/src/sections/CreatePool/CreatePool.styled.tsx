import styled from "styled-components"
import { Exa, Input, Button, Media } from "abacus-ui"

export const Title = styled(Exa)`
  font-family: "Bluu next";
  margin: 0 auto;
`

export const StyledInput = styled(Input)`
  ${Media.md`
    min-width: 500px;
  `}
`

export const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 8px;
  text-align: center;
`

export const ImageContainer = styled.div`
  width: 100%;
  max-width: 250px;
  margin: 0 auto;
`

export const Error = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.utility.red};
  margin: 8px 0;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.utility.red}95;
  border-radius: ${({ theme }) => theme.borderRadius.section};
  color: ${({ theme }) => theme.colors.core.white};
`
