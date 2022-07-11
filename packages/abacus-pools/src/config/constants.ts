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
  : "0x75a74d728553327eA71AC5de8Df8B15f4026afE1"

export const ABC_TREASURY = IS_PRODUCTION
  ? ""
  : "0x9397D2F70c27033147595579F8a204aa2Ca66619"

export const ABC_FACTORY = IS_PRODUCTION
  ? ""
  : "0xb2102E3c608608ACbaD65c1D142F5a5Dbe7A7ba8"

export const ABC_TOKEN = IS_PRODUCTION
  ? ""
  : "0x872F6D98289b24F3cfb6FE17466C9f13b18974B6"

// TODO: Rename this ABC_ALLOCATOR
export const VE_ABC_TOKEN = IS_PRODUCTION
  ? ""
  : "0x620B859Cf2168A89Fe6028bfd03341804f259ba2"

export const ABC_EPOCH = IS_PRODUCTION
  ? ""
  : "0xaBE634a17e833564f3d01882C5890ac3A31B34b4"

export const ABC_BRIBE_FACTORY = IS_PRODUCTION
  ? ""
  : "0x8ca0cdAdeb386Ac498bE1f712e49F5f0A00C46D1"

export const ABC_CREDIT_BONDS = IS_PRODUCTION
  ? ""
  : "0x7a526a2c01e96B1E17Da7C1a000F32f2977f0daf"

export const ABC_NFT_ETH = IS_PRODUCTION
  ? ""
  : "0x7781484703fF01167b4ED2aB8e2BCeeFB8bBA76b"

export const ABC_LEND = IS_PRODUCTION
  ? ""
  : "0x1F9514a5Bda3Bb72982CF0591B8772f5505288D5"

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
