import { GRAPHQL_ENDPOINT } from "@config/constants"
import request, { gql } from "graphql-request"

export type SubgraphAllocs = {
  epoch: string
  collection: string
  amount: string
}

export type GetAllocsQueryResponse = {
  user: {
    allocations: SubgraphAllocs[]
  }
}

export type GetVaultVariables = {
  first: number
  skip: number
}

export const GET_ALLOCS = (user: string | null) => gql`
  query GetAllocs($first: Int!, $skip: Int!) {
    user(id: \"${user}\") {
      allocations {
        epoch
        collection
        amount
      }
    }
  }
`

export const getAllocs = async (userAddress: string) => {
  const variables: GetVaultVariables = {
    first: 50,
    skip: 0,
  }

  const { user } = await request<GetAllocsQueryResponse>(
    GRAPHQL_ENDPOINT,
    GET_ALLOCS(userAddress.toLowerCase()),
    variables
  )
  if (user === null) {
    return undefined
  }
  return user.allocations
}
