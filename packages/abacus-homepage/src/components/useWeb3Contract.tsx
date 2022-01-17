import { useCallback } from "react"
import Web3 from "web3"

export const ABC_TREASURY_ADDRESS = "0x93dcf21284B78163ec218DeF37471C4B77CCC6E1"
export const ABC_PRICING_SESSION_ADDRESS =
  "0xfc3232FF3e85112F231ee72c28b7f197088Efa24"
export const SUBGRAPH = process.env.GATSBY_SUBGRAPH as string
const ARBITRUM_ETH_RPC =
  "https://arbitrum-mainnet.infura.io/v3/b2d15a1424b74f158a3ccf9f78f2e8e0"

export function useWeb3Contract(ABI: any) {
  return useCallback(
    (address: string) => {
      const web3 = new Web3(ARBITRUM_ETH_RPC)
      const contract = new web3.eth.Contract(ABI, address)
      return contract
    },
    [ABI]
  )
}
