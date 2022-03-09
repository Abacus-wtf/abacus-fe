import { gql } from "graphql-request"
import { isBigNumberish } from "@ethersproject/bignumber/lib/bignumber"

export interface SubgraphVote {
  user: {
    id: string
  }
  appraisal: string
  amountStaked: string
  weight: string
}

export type SubgraphPricingSession = {
  id: string
  nftAddress: string
  tokenId: string
  nonce: string
  finalAppraisalValue: number
  totalStaked: number
  bounty: number
  votingTime: number
  endTime: number
  sessionStatus: number
  numParticipants: number
  timeFinalAppraisalSet: number
  maxAppraisal: number
  participants: SubgraphVote[]
}

export type GetPricingSessionsQueryResponse = {
  pricingSessions: SubgraphPricingSession[]
}

export type GetPricingSessionsVariables = {
  first: number
  skip: number
  orderBy?: string
  orderDirection?: string
}

export type PricingSessionFilters = {
  nftAddress?: string
  tokenId?: number
  sessionStatus?: number[]
}

export const pricingSessionWhere = (
  filters: PricingSessionFilters
): string | null => {
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
        if (isBigNumberish(filterValue)) {
          return `${acc}${filter}: ${filterValue.toString()},`
        }
        return acc
      default:
        return acc
    }
  }, "")
  return `{ ${filterString} }`
}
/*
  will want to change the where clause to `where: { sessionStatus_lt: 5 }` when we have active sessions
*/
export const GET_FEATURED_SESSIONS = gql`
  query GetPricingSessions($first: Int!, $skip: Int!) {
    pricingSessions(
      first: $first
      orderBy: endTime
      orderDirection: desc
      skip: $skip
      where: { sessionStatus_gt: -1 }
    ) {
      id
      nftAddress
      tokenId
      nonce
      finalAppraisalValue
      totalStaked
      bounty
      votingTime
      endTime
      sessionStatus
      timeFinalAppraisalSet
      numParticipants
      maxAppraisal
      participants {
        user {
          id
        }
        amountStaked
        appraisal
      }
    }
  }
`

export const GET_PRICING_SESSIONS = (where: string | null) => gql`
  query GetPricingSessions(
    $first: Int!
    $skip: Int!
    $orderBy: String!
    $orderDirection: String!
  ) {
    pricingSessions(
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      skip: $skip
      where: ${where}
    ) {
      id
      nftAddress
      tokenId
      nonce
      finalAppraisalValue
      totalStaked
      bounty
      votingTime
      endTime
      sessionStatus
      timeFinalAppraisalSet
      numParticipants
      maxAppraisal
      participants {
        user {
          id
        }
        amountStaked
        appraisal
      }
    }
  }
`

export type GetPricingSessionQueryResponse = {
  data: {
    pricingSession: SubgraphPricingSession
  }
}

export const GET_PRICING_SESSION = (id: string) => `
  query GetPricingSession {
    pricingSession(id: "${id}") {
      id
      nftAddress
      tokenId
      nonce
      finalAppraisalValue
      totalStaked
      bounty
      votingTime
      endTime
      sessionStatus
      timeFinalAppraisalSet
      numParticipants
      maxAppraisal
      participants {
        user {
          id
        }
        amountStaked
        appraisal
        weight
      }
    }
  }
`

export type GetMySessionsQueryResponse = {
  user: {
    creatorOf: SubgraphPricingSession[]
  } | null
}

export type GetMySessionsVariables = {
  userId: string
  first: number
  skip: number
}

export const GET_MY_SESSIONS = (where: string | null) => gql`
  query GetMySessions($userId: ID!, $first: Int!, $skip: Int!) {
    user(id: $userId) {
      creatorOf(
        first: $first
        orderBy: createdAt
        orderDirection: desc
        skip: $skip
        where: ${where}
      ) {
        id
        nftAddress
        tokenId
        nonce
        finalAppraisalValue
        totalStaked
        bounty
        votingTime
        endTime
        sessionStatus
        timeFinalAppraisalSet
        numParticipants
        maxAppraisal
        participants {
          user {
            id
          }
          amountStaked
          appraisal
        }
      }
    }
  }
`

export type GetActiveSessionsQueryResponse = {
  user: {
    pricingSessionsVotedIn: SubgraphPricingSession[]
  } | null
}

export type GetActiveSessionsVariables = {
  userId: string
  first: number
  skip: number
}

export const GET_ACTIVE_SESSIONS = (where: string | null) => gql`
  query GetActiveSessions($userId: ID!, $first: Int!, $skip: Int!) {
    user(id: $userId) {
      pricingSessionsVotedIn(
        first: $first
        orderBy: createdAt
        orderDirection: desc
        skip: $skip
        where: ${where}
      ) {
        id
        nftAddress
        tokenId
        nonce
        finalAppraisalValue
        totalStaked
        bounty
        votingTime
        endTime
        sessionStatus
        timeFinalAppraisalSet
        numParticipants
        maxAppraisal
        participants {
          user {
            id
          }
          amountStaked
          appraisal
        }
      }
    }
  }
`
