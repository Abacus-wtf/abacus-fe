import { css, CSSObject, SimpleInterpolation } from "styled-components";

const defaultTheme = {
  colors: {
    core: {
      primary: "#1C233399",
      900: "rgba(28, 35, 51, 0.72)",
      800: "rgba(28, 35, 51, 0.6)",
      700: "rgba(28, 35, 51, 0.4)",
      border: "rgba(28, 35, 51, 0.04)",
      lightWhite: "rgba(255, 255, 255, 0.8)",
      white: "white",
    },
    button: {
      secondary: "rgba(28, 35, 51, 0.04)",
      primary: "#1A1A1A",
    },
    utility: {
      green: "#23CE7C",
      purple: "#8673FF",
      blue: "#3E74FF",
      red: "#F33636",
      yellow: "#FFC93E",
      white: "#FFFFFF",
      gray: "#CCCCCC",
      black: "#000000",
      brown: "#964B00",
    },
  },
  layout: {
    maxWidth: "800px",
  },
  borderRadius: {
    main: "10px",
    section: "26px",
  },
  boxShadow: {
    button: "0px 5px 60px rgba(0, 0, 0, 0.1)",
    main: "0px 2px 0px #f6f6f6",
    alt: "0px 2px 0px #6b6b6b",
    section: "0px 2px 32px rgba(0, 0, 0, 0.06)",
  },
  padding: {
    main: "16px 24px",
  },
  transitionTime: {
    main: "0.3s",
  },
  copy: {
    // https://learn-the-web.algonquindesign.ca/topics/typografier-cheat-sheet/
    pico: {},
    nano: {},
    micro: {},
    milli: {
      "font-size": "14px",
      "line-height": "132%",
    },
    kilo: {
      "font-size": "16px",
      "line-height": "132%",
    },
    mega: {
      "font-size": "20px",
      "line-height": "132%",
    },
    giga: {
      "font-size": "24px",
      "line-height": "132%",
    },
    tera: {
      "font-size": "28px",
      "line-height": "132%",
    },
    peta: {
      "font-size": "32px",
      "line-height": "132%",
    },
    exa: {
      "font-size": "38px",
      "line-height": "132%",
    },
    zetta: {
      "font-size": "42px",
      "line-height": "120%",
    },
    yotta: {
      "font-size": "52px",
      "line-height": "120%",
    },
    nina: {
      "font-size": "62px",
      "line-height": "120%",
    },
    tena: {
      "font-size": "72px",
      "line-height": "120%",
    },
  },
} as const;

export type Theme = typeof defaultTheme;

export type WithTheme = {
  theme: Theme;
};

export const FontImport = () => css`
  @import url("https://rsms.me/inter/inter.css");
`;

export const Font = (size = "kilo", fontFamily = "Inter") => css`
  font-family: "${fontFamily}", sans-serif;
  font-style: normal;
  font-weight: normal;
  ${({ theme }: { theme: typeof defaultTheme }) =>
    theme?.copy ? theme.copy[size] : defaultTheme.copy[size]};
`;

enum Sizes {
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg",
}

export const breakpoints = [
  { size: "lg", value: "1200px" },
  { size: "md", value: "885px" },
  { size: "sm", value: "600px" },
] as { size: Sizes; value: string }[];

export const Media: { [breakpoint in Sizes]: typeof css } = breakpoints.reduce(
  (accumulator, { size, value }) => {
    const nextMedia = (
      first: TemplateStringsArray | CSSObject,
      ...interpolations: SimpleInterpolation[]
    ) => css`
      @media (min-width: ${value}) {
        ${css(first, ...interpolations)};
      }
    `;
    return {
      ...accumulator,
      [size]: nextMedia,
    };
  },
  {
    sm: css,
    md: css,
    lg: css,
  }
);

// TODO: Make media query helper, but be sure to use breakpoints in array to guarantee order

export default defaultTheme;
