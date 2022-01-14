import { theme } from "@config/theme"
import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'TerminaW05-Bold'; 
    src: url(/fonts/termina.eot); 
    src: url(/fonts/termina.eot?#iefix) format("embedded-opentype"), 
          url(/fonts/termina.woff2) format("woff2"), 
          url(/fonts/termina.woff) format("woff"), 
          url(/fonts/termina.ttf) format("truetype"), 
          url(/fonts/termina.svg#TerminaW05-Bold) format("svg"); 
  }  

  * {
    margin: 0;
    padding: 0;
  }
  
  body {
    background-color: ${theme.colors.bg1};
    height: 100vh;
  }

  h1, h2,h3, h4, p {
    color: ${theme.colors.text1} !important;
  }

  a {
    transition: 0.15s;
    &:hover {
      color: ${theme.colors.accent};
      text-decoration: none;
    }
  }
`
