import { GRAPHQL_ENDPOINT } from "@config/constants"
import request, { gql } from "graphql-request"

export type SubgraphAllocs = {
  epoch: string
  collection: string
  amount: string
}

export type GetAllocsQueryResponse = {
  allocs: SubgraphAllocs[]
}

export type GetVaultVariables = {
  first: number
  skip: number
}

export const GET_ALLOCS = (user: string | null) => gql`
  query GetAllocs($first: Int!, $skip: Int!) {
    user(id: \"${user}\") {
      allocs {
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

  const { allocs } = await request<GetAllocsQueryResponse>(
    GRAPHQL_ENDPOINT,
    GET_ALLOCS(userAddress),
    variables
  )
  return allocs
}
