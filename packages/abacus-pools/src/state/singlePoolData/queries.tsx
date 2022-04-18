import { GRAPHQL_ENDPOINT } from "@config/constants"
import { BigNumber } from "ethers"
import request, { gql } from "graphql-request"

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

export type SubgraphTokenPurchases = {
  owner: string
  amount: string
  soldAt: number
  timestamp: number
}

export type GetTicketQueryResponse = {
  tickets: SubgraphTicket[]
}

export type GetTicketVariables = {
  first: number
  skip: number
  where: TicketFilter | null
}

export type TicketFilter = {
  vaultAddress: string
  ticketNumber: number
}

export const GET_TICKETS = gql`
  query GetTickets($first: Int!, $skip: Int!, $where: Ticket_filter) {
    tickets(
      first: $first
      orderBy: ticketNumber
      orderDirection: desc
      skip: $skip
      where: $where
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

export const getTicketOwners = async (
  vaultAddress: string,
  ticketNumber: number
) => {
  const variables: GetTicketVariables = {
    first: 50,
    skip: 0,
    where: { vaultAddress, ticketNumber },
  }
  console.log(variables)
  const { tickets } = await request<GetTicketQueryResponse>(
    GRAPHQL_ENDPOINT,
    GET_TICKETS,
    variables
  )
  console.log(tickets)
  return tickets
}
