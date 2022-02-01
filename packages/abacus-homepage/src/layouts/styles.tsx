import { defaultTheme } from "abacus-ui"
import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  
  body {
    background-color: ${defaultTheme.colors.utility.black};
  }

  h1, h2,h3, h4, h5, h6, p {
    color: ${defaultTheme.colors.utility.white};
  }

  a {
    transition: 0.15s;
    &:hover {
      color: ${defaultTheme.colors.core.lightWhite};
      text-decoration: none;
    }
  }
`
