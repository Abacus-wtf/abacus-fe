import { GRAPHQL_ENDPOINT } from "@config/constants"
import { SubgraphTicket } from "@models/Subgraph"
import request, { gql } from "graphql-request"

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
  ticketNumber?: number
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
      tokenPurchasesLength
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
