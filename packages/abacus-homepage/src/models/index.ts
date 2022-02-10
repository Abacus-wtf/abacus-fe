export type Session = {
  id: string
  imgSrc: string
  title: string
  bounty: number
  participants: number
  appraisal: number
  owner: string
  nftAddress: string
  tokenId: string
  nonce: string
}

export type SubgraphPricingSession = {
  id: string
  nftAddress: string
  tokenId: string
  nonce: string
  finalAppraisalValue: string
  totalStaked: string
  bounty: string
  numParticipants: number
}
