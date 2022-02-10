export type Session = {
  id: string
  imgSrc: string
  title: string
  bounty: number
  participants: number
  appraisal: number
  owner: string
}

export type SubgraphPricingSession = {
  id: string
  nftAddress: string
  tokenId: number
  finalAppraisalValue: number
  totalStaked: number
  bounty: number
  numParticipants: number
}
