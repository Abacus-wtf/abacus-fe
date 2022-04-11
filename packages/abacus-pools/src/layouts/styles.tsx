import { defaultTheme, Media } from "abacus-ui"
import styled, { createGlobalStyle } from "styled-components"

export const GlobalContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1120px;
  grid-gap: 32px;
  width: 100%;
  padding-top: 50px;
  padding: 0px 16px;
  padding-bottom: 100px;
  box-sizing: border-box;

  ${Media.md`
    padding: 0px 100px;
    padding-bottom: 100px;
  `}

  ${Media.lg`
    padding: 0px;
    padding-bottom: 100px;
  `}

  ${Media.xl`
    padding: 0px;
    padding-top: 50px;
    padding-bottom: 100px;
  `}
`

export const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const SplitContainer = styled.div`
  display: grid;
  grid-gap: 50px;
  grid-template-columns: 1fr;

  ${Media.md`
    grid-template-columns: 1fr 1fr;
  `}
`

type GlobalStylesProps = {
  backgroundURL?: string
}

export const GlobalStyles = createGlobalStyle<GlobalStylesProps>`
  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-Regular.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-SemiBold.ttf") format("truetype");
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: "Inter";
    src: url("/fonts/Inter-Bold.ttf") format("truetype");
    font-weight: 900;
    font-style: normal;
    }

  @font-face {
    font-family: "Bluu Next";
    src: url("/fonts/BluuNext-Bold.otf") format("opentype");
    font-weight: bold;
  }

  
  html { 
    font-family: 'Inter', sans-serif;
  }

  * {
    margin: 0; 
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    width: 100%;
    min-height: 100vh;
    position: relative;
    color: ${defaultTheme.colors.core.primary};
    background: ${defaultTheme.colors.core.white};


    &::before {
      content: "";
      display: block;
      position: absolute;
      height: 100vh;
      left: 0;
      top: 0;
      right: 0;
      opacity: 0.25;
      z-index: -1;
      background-image: url('/background.png');
      background-repeat: no-repeat;
      background-position: 50% 0;
      background-size: cover;
      background-color: ${defaultTheme.colors.core.background};
      mask-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 1),
        rgba(0, 0, 0, 0)
      );
    }
  }

  a {
    transition: 0.15s;
    &:hover {
      text-decoration: none;
    }
  }
`
