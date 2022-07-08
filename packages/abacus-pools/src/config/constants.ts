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
  : "0x668D3d730B111Caf28207f7Eef785C53882Ec2Fb"

export const ABC_TREASURY = IS_PRODUCTION
  ? ""
  : "0x53d173E8C5663aE27E220caf232e5Aca5e94A060"

export const ABC_FACTORY = IS_PRODUCTION
  ? ""
  : "0x134A279e12C055D310c5975B7678033fc3f56881"

export const ABC_TOKEN = IS_PRODUCTION
  ? ""
  : "0x5837c4f09340D8Abdf6cFF4D08153f98ff151f32"

// TODO: Rename this ABC_ALLOCATOR
export const VE_ABC_TOKEN = IS_PRODUCTION
  ? ""
  : "0x04D1BC46fF73de0140eb5E15afB0bd469c996666"

export const ABC_EPOCH = IS_PRODUCTION
  ? ""
  : "0xe9c3547416f27Ba592e8486c07e7E9b817f4380e"

export const ABC_BRIBE_FACTORY = IS_PRODUCTION
  ? ""
  : "0x8ca0cdAdeb386Ac498bE1f712e49F5f0A00C46D1"

export const ABC_CREDIT_BONDS = IS_PRODUCTION
  ? ""
  : "0x449d2d9C027eBCc7b7ED85E6a3842dAdD91cC2e0"

export const ABC_NFT_ETH = IS_PRODUCTION
  ? ""
  : "0xf2d19E1c67F32dE1118590e5102bA8EE1f5D29D6"

export const ABC_LEND = IS_PRODUCTION
  ? ""
  : "0x8E5552340856AC85310Bd185565cBcbA13c60d99"

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
    symbol: IS_PRODUCTION ? "ETH" : "Rinkeby ETH",
    network: IS_PRODUCTION ? "Ethereum Mainnet" : "Rinkeby Test Network",
    logo: "eth_logo.svg",
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

const DAY = 24 * 60 * 60 * 1000

export const EPOCH_LENGTH = IS_PRODUCTION ? 2 * DAY : 2 * DAY
