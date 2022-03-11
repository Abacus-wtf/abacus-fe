import React, { FunctionComponent } from "react"
import { useCurrentSessionStatus } from "@state/sessionData/hooks"
import { SessionState } from "@state/sessionData/reducer"
import { Vote } from "./Vote"
import { Weigh } from "./Weigh"
import { SetFinalAppraisal } from "./SetFinalAppraisal"
import { Harvest } from "./Harvest"
import { Claim } from "./Claim"
import { Complete } from "./Complete"
import Fallback from "./Fallback"

type CurrentStateProps = {
  openDepositModal: () => void
  isLoading: boolean
}

const CurrentState: FunctionComponent<CurrentStateProps> = ({
  openDepositModal,
  isLoading,
}) => {
  const status = useCurrentSessionStatus()

  if (isLoading) {
    return <Fallback />
  }
  switch (status) {
    case SessionState.Vote:
      return <Vote openDepositModal={openDepositModal} />
    case SessionState.Weigh:
      return <Weigh />
    case SessionState.SetFinalAppraisal:
      return <SetFinalAppraisal />
    case SessionState.Harvest:
      return <Harvest />
    case SessionState.Claim:
      return <Claim />
    case SessionState.Complete:
      return <Complete />
    default:
      return null
  }
}

export default CurrentState
