import { useActiveWeb3React } from "@hooks/index"
import React, { FunctionComponent } from "react"
import {
  useCanUserInteract,
  useCurrentSessionData,
} from "@state/sessionData/hooks"
import { isWithinWinRange } from "@config/utils"
import NonParticipant from "./NonParticipant"
import Winner from "./Winner"
import Loser from "./Loser"

const Weigh: FunctionComponent = () => {
  const { account } = useActiveWeb3React()
  const sessionData = useCurrentSessionData()
  const isParticipant = useCanUserInteract()

  const userRanking = sessionData?.rankings.find(
    (ranking) => ranking.user.toLowerCase() === account.toLowerCase()
  )
  const isWinner = userRanking
    ? isWithinWinRange(
        Number(userRanking.appraisal),
        Number(sessionData.finalAppraisalValue),
        Number(sessionData.winnerAmount)
      )
    : false

  if (!isParticipant) {
    return <NonParticipant />
  }

  return isWinner ? (
    <Winner />
  ) : (
    <Loser stake={Number(userRanking.amountStaked)} />
  )
}

export default Weigh
