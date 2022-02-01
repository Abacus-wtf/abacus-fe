import { defaultTheme, FontImport } from "abacus-ui"
import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  ${FontImport()}

  @font-face {
    font-family: "Bluu Next";
    src: url("/fonts/BluuNext-Bold.otf") format("opentype");
    font-weight: bold;
  }

  * {
    margin: 0;
    padding: 0;
  }
  
  body {
    background-color: ${defaultTheme.colors.utility.black};
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
