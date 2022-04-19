import { SessionData } from "@state/sessionData/reducer"
import { Link } from "gatsby"
import { ExploreCardProps } from "@components/ExploreCard"
import { getUserIcon } from "@utils"

export const mapSessionData = (session: SessionData): ExploreCardProps => ({
  nftSrc: session.image_url,
  nftTitle: session.nftName,
  endTime: session.endTime,
  numParticipants: session.numPpl,
  poolAmount: session.totalStaked,
  imgs: session.rankings?.map((ranking) => getUserIcon(ranking.user)) ?? [],
  link: `/current-session/?address=${session.address}&tokenId=${session.tokenId}&nonce=${session.nonce}`,
  currentStatus: session.currentStatus,
  linkComponent: Link,
  finalAppraisalValue: session.finalAppraisalValue || null,
})
