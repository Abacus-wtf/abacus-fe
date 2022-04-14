import { BigNumber } from "ethers"

export type SubgraphAllocation = {
  id: string
  epoch: number
  collection: string
  amount: BigNumber
  timestamp: BigNumber
}

export type SubgraphUser = {
  id: string
  allocs: SubgraphAllocation[]
}

export type SubgraphTokenPurchase = {
  id: string
  ticket: string
  owner: string
  amount: BigNumber
  timestamp: BigNumber
  length: BigNumber
  soldAt: BigNumber | null
}

export type SubgraphTicket = {
  id: string
  vaultAddress: string
  ticketNumber: number
  tokenPurchases: SubgraphTokenPurchase[]
  tokenPurchasesLength: number
}

export type SubgraphVault = {
  id: string
  owner: string
  nftAddress: string
  tokenId: BigNumber
  nonce: number
  status: number
  timestamp: BigNumber
  tickets: SubgraphTicket[]
}
