import { css } from "styled-components";

const defaultTheme = {
  colors: {
    background1: "#FFFFFF1",
    background2: "#1A1A1A0A",
    text1: "#1A1A1A",
    text2: "#1C233399",
  },
  layout: {
    maxWidth: "800px",
  },
  borderRadius: {
    main: "10px",
    section: "26px",
  },
  boxShadow: {
    main: "0px 2px 0px #f6f6f6",
    alt: "0px 2px 0px #6b6b6b",
    section: "0px 2px 32px rgba(0, 0, 0, 0.06)",
  },
  copy: {
    // https://learn-the-web.algonquindesign.ca/topics/typografier-cheat-sheet/
    pico: {},
    nano: {},
    micro: {},
    milli: {
      "font-size": "14px",
      "line-height": "17px",
    },
    kilo: {
      "font-size": "16px",
      "line-height": "19px",
    },
    mega: {
      "font-size": "20px",
      "line-height": "24px",
    },
    giga: {
      "font-size": "24px",
      "line-height": "29px",
    },
    tera: {
      "font-size": "26px",
      "line-height": "31.47px",
    },
    peta: {
      "font-size": "30px",
      "line-height": "36px",
    },
    exa: {
      "font-size": "32px",
      "line-height": "38.73px",
    },
    zetta: {
      "font-size": "34px",
      "line-height": "40.8px",
    },
    yotta: {
      "font-size": "38px",
      "line-height": "45.6px",
    },
    nina: {
      "font-size": "48px",
      "line-height": "57.6px",
    },
    tena: {},
  },
} as const;

export type Theme = typeof defaultTheme;

export type WithTheme = {
  theme: Theme;
};

export const Font = (size = "kilo") => css`
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  ${({ theme }: { theme: typeof defaultTheme }) =>
    theme?.copy ? theme.copy[size] : defaultTheme.copy[size]}
`;

export const breakpoints = [
  { size: "lg", value: "1200px" },
  { size: "md", value: "885px" },
  { size: "sm", value: "600px" },
];

export const Media: { [label: string]: typeof css } = breakpoints.reduce(
  (accumulator, { size, value }) => {
    accumulator[size] = (...args) => css`
      @media (min-width: ${value}) {
        ${css(...args)};
      }
    `;
    return accumulator;
  },
  {}
);

// TODO: Make media query helper, but be sure to use breakpoints in array to guarantee order

export default defaultTheme;
