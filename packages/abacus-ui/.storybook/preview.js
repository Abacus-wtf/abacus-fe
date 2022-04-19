import { ThemeProvider } from "styled-components";
import defautTheme from "@theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#000',
      },
      {
        name: 'light',
        value: '#fff',
      },
    ],
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={defautTheme}>
      <Story />
    </ThemeProvider>
  ),
];
