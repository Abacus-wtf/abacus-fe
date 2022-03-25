import React, { FunctionComponent } from "react"
import { useCurrentSessionData } from "@state/sessionData/hooks"
import { isWithinWinRange } from "@config/utils"
import NonParticipant from "./NonParticipant"
import Winner from "./Winner"
import Loser from "./Loser"
import useUserRanking from "./useUserRanking"

const Complete: FunctionComponent = () => {
  const sessionData = useCurrentSessionData()

  const userRanking = useUserRanking()
  console.log("userRanking", userRanking)
  const isWinner = userRanking
    ? isWithinWinRange(
        Number(userRanking.appraisal),
        Number(sessionData.finalAppraisalValue),
        Number(sessionData.winnerAmount)
      )
    : false

  console.log("isWinner", isWinner)
  if (!userRanking) {
    return <NonParticipant />
  }

  return isWinner ? (
    <Winner />
  ) : (
    <Loser stake={Number(userRanking?.amountStaked)} />
  )
}

export default Complete
