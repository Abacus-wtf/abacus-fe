import React, { FunctionComponent } from "react"
import {
  useCanUserInteract,
  useCurrentSessionData,
} from "@state/sessionData/hooks"
import { isWithinWinRange } from "@config/utils"
import NonParticipant from "./NonParticipant"
import Winner from "./Winner"
import Loser from "./Loser"
import useUserRanking from "./useUserRanking"

const Complete: FunctionComponent = () => {
  const sessionData = useCurrentSessionData()
  const isParticipant = useCanUserInteract()

  const userRanking = useUserRanking()
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
    <Loser stake={Number(userRanking?.amountStaked)} />
  )
}

export default Complete
