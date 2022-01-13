import { theme } from "@config/theme"
import styled from "styled-components"

export const Container = styled.div`
  text-align: center;
  margin: auto;
  width: 50%;
  position: relative;
  top: 300px;
  padding: 0px;
  .four-title {
    font-size: 6rem !important;
    color: ${theme.colors.accent} !important;
    padding-bottom: 4rem;
    @media ${theme.media.phone} {
      font-size: 7rem !important;
    }
  }

  .four-not {
    font-size: 2rem;
    @media ${theme.media.phone} {
      font-size: unset;
    }
  }

  @media ${theme.media.tablet} {
    padding: 10px;
  }
`
