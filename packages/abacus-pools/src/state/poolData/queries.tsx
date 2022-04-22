import { gql } from "graphql-request"

export type SubgraphVault = {
  id: string
  nftAddress: string
  tokenId: string
  owner: string
  status: number
  nonce: number
  emissionsSigned: boolean
}

export type GetVaultQueryResponse = {
  vaults: SubgraphVault[]
}

export type GetVaultVariables = {
  first: number
  skip: number
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

export const GET_VAULTS = (where: string | null) => gql`
  query GetVaults($first: Int!, $skip: Int!) {
    vaults(
      first: $first
      orderBy: timestamp
      orderDirection: desc
      skip: $skip
      where: ${where}
    ) {
      id
      nftAddress
      tokenId
      owner
      status
      emissionsSigned
    }
  }
`
