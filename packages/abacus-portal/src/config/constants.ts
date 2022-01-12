import { InjectedConnector } from "@web3-react/injected-connector"
import { AbstractConnector } from "@web3-react/abstract-connector"
import Web3 from "web3"

export const COINGECKO_ETH_USD =
  "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"

export const NetworkContextName = "NETWORK"
export const ETH_RPC = process.env.GATSBY_NETWORK_URL as string
export const NETWORK_CHAIN_ID = Number(process.env.GATSBY_CHAIN_ID as string)
export const IS_PRODUCTION = process.env.GATSBY_IS_PRODUCTION === "true"
export const OPENSEA_LINK = process.env.GATSBY_OPENSEA_API as string
export const CURRENT_SESSIONS = IS_PRODUCTION
  ? []
  : [
      {
        address: "0x38ec00f7a966ece849f796d1d71aae2eb4c41c2d",
        tokenId: "1",
      },
    ]

export const ABC_TREASURY_ADDRESS = IS_PRODUCTION
  ? ""
  : "0x69421DCF160B85fF2586Ea2c3415b4d48AC0b729"
export const ABC_TOKEN_ADDRESS = IS_PRODUCTION
  ? ""
  : "0x5e7aD50819f507f088Aff27196e0F4B9f727fa5b"
export const ABC_AUCTION_ADDRESS = IS_PRODUCTION
  ? "0x5165a6cf99F58AA20032AbDf5aaf3F8cD6978617"
  : "0x286c881126b86519221045B9d5DaAd25E4511780"
export const ABC_PRICING_SESSION_ADDRESS = IS_PRODUCTION
  ? ""
  : "0x34F282d640AB5769bd1D868A7425ad9e48B0e10f"

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

interface NetworkInfo {
  rpc: any
  chainId: number
  symbol: string
  network: string
  logo: string
}

export const web3 = new Web3(ETH_RPC)

export const NetworkInfoMap: NetworkInfo = {
  rpc: ETH_RPC,
  chainId: NETWORK_CHAIN_ID,
  symbol: "ETH",
  network: IS_PRODUCTION ? "mainnet" : "rinkeby",
  logo: "/ETH.svg",
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

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 56, 137, 80001],
})

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  /*INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },*/
  METAMASK: {
    connector: injected,
    name: "MetaMask",
    iconName: "metamask.png",
    description: "Easy-to-use browser extension.",
    href: null,
    color: "#E8831D",
  },
}
