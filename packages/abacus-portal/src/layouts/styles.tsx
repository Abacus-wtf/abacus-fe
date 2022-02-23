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
  max-width: 1040px;
  grid-gap: 50px;
  width: 100%;
  padding-top: 50px;
  padding: 0px 16px;
  padding-bottom: 100px;
  box-sizing: border-box;

  ${Media.md`
    padding: 0px 100px;
  `}

  ${Media.xl`
    padding: 0px;
    padding-top: 50px;
    padding-bottom: 100px;
  `}
`

export const InnerContainer = styled.div`
  max-width: 1440px;
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
      left: 0;
      top: 0;
      right: 0;
      height: 100vh;
      opacity: 0.25;
      z-index: -1;
      background-image: ${({ backgroundURL }) =>
        backgroundURL ? `url('${backgroundURL}')` : `url('/background.png')`};
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
      color: ${defaultTheme.colors.core.lightWhite};
      text-decoration: none;
    }
  }
`
