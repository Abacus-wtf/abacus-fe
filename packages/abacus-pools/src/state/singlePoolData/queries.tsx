import { GRAPHQL_ENDPOINT } from "@config/constants"
import request, { gql } from "graphql-request"

export type SubgraphTokenPurchases = {
  owner: string
  amount: string
  soldAt: number
  timestamp: number
}

export type SubgraphTicket = {
  ticketNumber: string

  vaultAddress: string
  tokenPurchases: SubgraphTokenPurchases[]
}

export type GetTicketQueryResponse = {
  tickets: SubgraphTicket[]
}

export type GetVaultVariables = {
  first: number
  skip: number
}

export type TicketFilters = {
  owner?: string
  vaultAddress?: string
}

export const ticketWhere = (filters: TicketFilters): string | null => {
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

export const GET_TICKETS = (where: string | null) => gql`
  query GetTickets($first: Int!, $skip: Int!) {
    tickets(
      first: $first
      orderBy: ticketNumber
      orderDirection: desc
      skip: $skip
      where: ${where}
    ) {
      ticketNumber
      vaultAddress
    	tokenPurchases {
        owner
        amount
        soldAt
        timestamp
      }
    }
  }
`

export const getTicketOwners = async (vaultAddress: string, ticket: number) => {
  const variables: GetVaultVariables = {
    first: 50,
    skip: 0,
  }

  const { tickets } = await request<GetTicketQueryResponse>(
    GRAPHQL_ENDPOINT,
    GET_TICKETS(
      `{ vaultAddress: "${vaultAddress.toLowerCase()}", ticketNumber: ${ticket} }`
    ),
    variables
  )
  return tickets
}
