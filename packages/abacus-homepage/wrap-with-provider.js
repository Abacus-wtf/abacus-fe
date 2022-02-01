// eslint-disable-next-line no-unused-vars
import React from "react"
import { ThemeProvider } from "styled-components"
import { defaultTheme } from "abacus-ui"

const wrapper = ({ element }) => (
  <>
    <ThemeProvider theme={defaultTheme}>{element}</ThemeProvider>
  </>
)

export default wrapper
