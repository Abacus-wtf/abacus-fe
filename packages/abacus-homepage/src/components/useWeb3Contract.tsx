import { useCallback } from 'react'
import Web3 from 'web3'

export const ABC_TREASURY_ADDRESS = "0xdc0B4eb507d483B77ECF3B82503D5630037aF3cF"
const ARBITRUM_ETH_RPC = "https://arbitrum-mainnet.infura.io/v3/2df246f3ab0d4d80b75bc458e1bc2df4"

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