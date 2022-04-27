// eslint-disable-next-line no-unused-vars
import React from "react"
import { ThemeProvider } from "styled-components"
import { defaultTheme } from "abacus-ui"
import { createClient, Provider } from "urql"

export const GRAPHQL_ENDPOINT = process.env.GATSBY_GRAPH_API

const client = createClient({
  url: GRAPHQL_ENDPOINT,
})

const wrapper = ({ element }) => (
  <Provider value={client}>
    <ThemeProvider theme={defaultTheme}>{element}</ThemeProvider>
  </Provider>
)

export default wrapper
