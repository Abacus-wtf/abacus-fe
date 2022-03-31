import styled from "styled-components"
import { Exa, Input, Button, Media } from "abacus-ui"

export const Title = styled(Exa)`
  font-family: "Bluu next";
  margin: 0 auto;
`

export const StyledInput = styled(Input)`
  margin-top: 24px;
  ${Media.md`
    min-width: 500px;
  `}
`

export const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 32px;
  text-align: center;
`

export const ImageContainer = styled.div`
  width: 100%;
  max-width: 250px;
  margin: 0 auto;
`
