// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AbstractConnector } from "@web3-react/abstract-connector"
import { InjectedConnector } from "@web3-react/injected-connector"
import Web3 from "web3"
import {
  fortmatic,
  portis,
  walletconnect,
  walletlink,
  InjectedConnectorProps,
} from "./connectors"

export declare enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
  MATIC = 137,
  MUMBAI = 80001,
}

export type NetworkSymbol = "ETH"

export enum NetworkSymbolEnum {
  NONE = "SOLID_NUTHIN",
  ETH = "ETH",
}

export const OPENSEA_API_KEY = process.env.GATSBY_OPENSEA_API_KEY || undefined
export const NetworkContextName = "NETWORK"
export const ETH_RPC = process.env.GATSBY_NETWORK_URL as string

export const NETWORK_CHAIN_ID = Number(process.env.GATSBY_CHAIN_ID as string)
export const IS_PRODUCTION = process.env.GATSBY_IS_PRODUCTION === "true"
export const OPENSEA_LINK = process.env.GATSBY_OPENSEA_API as string
export const BACKEND_LINK = process.env.GATSBY_APP_SERVER as string
export const GRAPHQL_ENDPOINT = process.env.GATSBY_GRAPH_API as string

export const ABC_CONTROLLER = IS_PRODUCTION
  ? ""
  : "0xac7B45B36C0F0C515E81076ECbbD40a8a283F162"

export const ABC_TREASURY = IS_PRODUCTION
  ? ""
  : "0x344db1B379486aEcC50B19db07e444E62412f225"

export const ABC_FACTORY = IS_PRODUCTION
  ? ""
  : "0x0B5Da6288737696b85b71187cB6171165e1Bb340"

export const ABC_TOKEN = IS_PRODUCTION
  ? ""
  : "0x5EE55410bCc074A73cB19C501d3bCC7339292e33"

export const VE_ABC_TOKEN = IS_PRODUCTION
  ? ""
  : "0x61dD3cAA606D5b07c77E86ba59e0BeEBe3c53490"

export const ABC_EPOCH = IS_PRODUCTION
  ? ""
  : "0x8620A583FcF5d5e35d9681E1f4eb6DF2b070a6ca"

export const ABC_BRIBE_FACTORY = IS_PRODUCTION
  ? ""
  : "0x8A62B84cBb8FC6c02D604ad9FD6a1095E31B11d2"

export const ETH_USD_ORACLE_ADDRESS =
  "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

export const TICKET_SIZE = 1000

export interface NetworkInfo {
  rpc: any
  chainId: number
  symbol: string
  network: string
  logo: string
  blockExplorer: string
}

const NETWORK_ADDRESSES = {
  [NetworkSymbolEnum.ETH]: ETH_RPC,
}

export const web3 = (networkSymbol: NetworkSymbolEnum) =>
  new Web3(NETWORK_ADDRESSES[networkSymbol])

export const web3Eth = new Web3(ETH_RPC)

export const NetworkInfoMap: NetworkInfo[] = [
  {
    rpc: ETH_RPC,
    chainId: NETWORK_CHAIN_ID,
    symbol: "ETH",
    network: IS_PRODUCTION ? "Ethereum Mainnet" : "Rinkeby Test Network",
    logo: "ETH.svg",
    blockExplorer: IS_PRODUCTION
      ? "https://etherscan.io/#/"
      : "https://rinkeby.etherscan.io/#/",
  },
]

export const NetworkSymbolAndId = {
  [NETWORK_CHAIN_ID]: NetworkSymbolEnum.ETH,
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  /* INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  }, */
  METAMASK: {
    connector: new InjectedConnector(InjectedConnectorProps),
    name: "MetaMask",
    iconName: "metamask.png",
    description: "Easy-to-use browser extension.",
    href: null,
    color: "#E8831D",
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: "WalletConnect",
    iconName: "walletConnectIcon.svg",
    description: "Connect to Trust Wallet, Rainbow Wallet and more...",
    href: null,
    color: "#4196FC",
    mobile: true,
  },
  WALLET_LINK: {
    connector: walletlink,
    name: "Wallet Link",
    iconName: "coinbaseWalletIcon.svg",
    description: "Use Coinbase Wallet app on mobile device",
    href: null,
    color: "#315CF5",
  },
  FORTMATIC: {
    connector: fortmatic,
    name: "Fortmatic",
    iconName: "fortmaticIcon.png",
    description: "Login using Fortmatic hosted wallet",
    href: null,
    color: "#6748FF",
    mobile: true,
  },
  Portis: {
    connector: portis,
    name: "Portis",
    iconName: "portisIcon.png",
    description: "Login using Portis hosted wallet",
    href: null,
    color: "#4A6C9B",
    mobile: true,
  },
}
