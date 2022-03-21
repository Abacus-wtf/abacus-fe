import { SessionState } from "@state/sessionData/reducer"
import { SessionCountdown, Giga } from "abacus-ui"
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
      case SessionState.Claim:
      case SessionState.Harvest:
      case SessionState.SetFinalAppraisal:
        return ""
      case SessionState.Complete:
        return (
          <Giga style={{ fontFamily: "Bluu next" }}>
            Final Appraisal {finalAppraisalValue} ETH
          </Giga>
        )
      default:
        return null
    }
  }, [endTime, finalAppraisalValue, link, currentStatus])
  return subtitle
}

export default useCardSubtitile
