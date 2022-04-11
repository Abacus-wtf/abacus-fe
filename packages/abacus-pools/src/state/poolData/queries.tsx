import { gql } from "graphql-request"

export type SubgraphTokenPurchase = {
  owner
  amount
}

export type SubgraphTicket = {
  id: string
  tokenPurchases: SubgraphTokenPurchase[]
}

export type SubgraphVault = {
  id: string
  nftAddress: string
  tokenId: string
  owner: string
  status: number
  nonce: number
  tickets: SubgraphTicket[]
}

export type GetVaultQueryResponse = {
  vaults: SubgraphVault[]
}

export type GetVaultVariables = {
  first: number
  skip: number
  orderBy?: string
  orderDirection?: string
  where?: string
}

export type VaultFilters = {
  nftAddress?: string
  tokenId?: number
}

export const vaultWhere = (filters: VaultFilters): string | null => {
  const hasFilters = Object.values(filters).some((filter) =>
    Boolean(Array.isArray(filter) ? filter.length : filter)
  )
  if (!hasFilters) {
    return null
  }
  const filterString = Object.keys(filters).reduce((acc, filter) => {
    const filterValue = filters[filter]
    switch (typeof filterValue) {
      case "string":
        return `${acc}${filter}: "${filterValue}",`
      case "number":
        return `${acc}${filter}: ${filterValue},`
      case "object":
        if (Array.isArray(filterValue)) {
          return `${acc}${filter}_in: [${filterValue}],`
        }
        return acc
      default:
        return acc
    }
  }, "")
  return `{ ${filterString} }`
}

export const GET_VAULTS = gql`
  query GetVaults(
    $first: Int!
    $skip: Int!
    $orderBy: String!
    $orderDirection: String!
    $where: String
  ) {
    vaults(
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      skip: $skip
      where: $where
    ) {
      id
      nftAddress
      tokenId
      owner
      status
      nonce
      tickets {
        id
        tokenPurchases {
          owner
          amount
        }
      }
    }
  }
`
