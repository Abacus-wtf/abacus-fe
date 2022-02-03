import { defaultTheme } from "abacus-ui"
import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  @import url('https://rsms.me/inter/inter.css');
  html { 
    font-family: 'Inter', sans-serif;
  }
  @supports (font-variation-settings: normal) {
    html { font-family: 'Inter var', sans-serif; }
  }

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
    color: ${defaultTheme.colors.utility.white};
    background: url("/background.png");
    background-repeat: no-repeat;
    background-position: top;
    background-color: #101010;
  }

  a {
    transition: 0.15s;
    &:hover {
      color: ${defaultTheme.colors.core.lightWhite};
      text-decoration: none;
    }
  }
`
