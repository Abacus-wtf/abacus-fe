import { defaultTheme } from "abacus-ui"
import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  html { 
    font-family: 'Inter', sans-serif;
  }
  @supports (font-variation-settings: normal) {
    html { font-family: 'Inter var', sans-serif; }
  }

  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-Regular.ttf");
  }

  @font-face {
    font-family: "Inter SemiBold";
    src: url("/fonts/Inter-SemiBold.ttf");
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
    color: ${defaultTheme.colors.core.primary};
    background: linear-gradient(179.02deg, rgba(255, 255, 255, 0) 55.82%, #FFFFFF 99.16%);
    background-image: url('/background.png');
    background-size: cover;
    backdrop-filter: blur(114px);
  }

  a {
    transition: 0.15s;
    &:hover {
      color: ${defaultTheme.colors.core.lightWhite};
      text-decoration: none;
    }
  }
`
