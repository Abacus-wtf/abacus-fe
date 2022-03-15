import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core"
import { Provider } from "react-redux"
// eslint-disable-next-line no-unused-vars
import React from "react"
import { ThemeProvider } from "styled-components"
import { Web3Provider } from "@ethersproject/providers"
import MetamaskProvider from "./src/config/MetamaskProvider"
import { NetworkContextName } from "./src/config/constants"
import { theme } from "./src/config/theme"
import store from "./src/state"

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)
const getLibrary = (provider) => {
  const library = new Web3Provider(provider, "any")
  library.pollingInterval = 15000
  return library
}

const wrapper = ({ element }) => {
  if (typeof window !== "undefined") {
    return (
      <>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ProviderNetwork getLibrary={getLibrary}>
            <Provider store={store}>
              <MetamaskProvider>
                <ThemeProvider theme={theme}>{element}</ThemeProvider>
              </MetamaskProvider>
            </Provider>
          </Web3ProviderNetwork>
        </Web3ReactProvider>
      </>
    )
  }
  return (
    <ThemeProvider>
      <Provider store={store}>{element}</Provider>
    </ThemeProvider>
  )
}

export default wrapper
