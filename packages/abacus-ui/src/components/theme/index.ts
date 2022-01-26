import { css } from "styled-components";

export const sizes = {
  tablet: "1200px",
  splitCenter: "885px",
  phone: "600px",
};

const defaultTheme = {
  colors: {
    background: "#FFFFFF1",
    text1: "#1A1A1A",
    text2: "#1C233399",
  },
  layout: {
    maxWidth: "800px",
  },
  boxShadow: {
    main: "0px 2px 0px #f6f6f6",
    alt: "0px 2px 0px #6b6b6b",
  },
  copy: {
    // https://learn-the-web.algonquindesign.ca/topics/typografier-cheat-sheet/
    milli: {
      "font-size": "14px",
      "line-height": "17px",
    },
    kilo: {
      "font-size": "16px",
      "line-height": "19px",
    },
    mega: {
      "font-size": "24px",
      "line-height": "29px",
    },
  },
  media: {
    splitCenter: `(min-width: ${sizes.splitCenter})`,
    tablet: `(min-width: ${sizes.tablet})`,
    phone: `(min-width: ${sizes.phone})`,
  },
};

export type Theme = typeof defaultTheme;

export const Font = (size = "kilo") => css`
  font-family: Arial;
  font-style: normal;
  font-weight: normal;
  ${({ theme }: { theme: typeof defaultTheme }) =>
    theme?.copy ? theme.copy[size] : defaultTheme.copy[size]}
`;

// TODO: Make media query helper, but be sure to use breakpoints in array to guarantee order

export default defaultTheme;
