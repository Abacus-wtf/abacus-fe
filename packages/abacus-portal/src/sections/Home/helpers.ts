import { SessionData } from "@state/sessionData/reducer"

export const mapSessionData = (session: SessionData) => ({
  nftSrc: session.image_url,
  nftTitle: session.nftName,
  endTime: new Date().getTime() + 100000,
  numParticipants: session.numPpl,
  poolAmount: session.totalStaked,
  poolAmountDollars: session.totalStakedInUSD,
  imgs: [
    "/temp_icon.png",
    "/temp_icon.png",
    "/temp_icon.png",
    "/temp_icon.png",
    "/temp_icon.png",
  ],
  link: `/current-session/?address=${session.address}&tokenId=${session.tokenId}&nonce=${session.nonce}`,
  currentStatus: session.currentStatus,
})
