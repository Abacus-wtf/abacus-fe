import { SessionState } from "@state/sessionData/reducer"
import { SessionCountdown } from "abacus-ui"
import React, { useMemo } from "react"

type UseCardSubtitleProps = {
  endTime: number
  finalAppraisalValue: number
  link: string
  currentStatus: SessionState
}

const useCardSubtitile = ({
  endTime,
  finalAppraisalValue,
  link,
  currentStatus,
}: UseCardSubtitleProps) => {
  const subtitle = useMemo(() => {
    switch (currentStatus) {
      case SessionState.Vote:
        return (
          <SessionCountdown
            endTime={endTime}
            key={link}
            completedText="Voting Time Ended"
          />
        )
      case SessionState.Weigh:
        return "Weigh Your Appraisal!"
      case SessionState.Claim:
        return "Claim Appraisals"
      case SessionState.Harvest:
        return "Harvest Appraisals"
      case SessionState.SetFinalAppraisal:
        return "Set Final Appraisals"
      case SessionState.Complete:
        return `Final Appraisal ${finalAppraisalValue} ETH`
      default:
        return null
    }
  }, [endTime, finalAppraisalValue, link, currentStatus])
  return subtitle
}

export default useCardSubtitile
