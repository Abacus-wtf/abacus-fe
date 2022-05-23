import React from "react"

import { Epoch } from "./Epoch"
import { Emissions } from "./Emissions"
import { useCreditsData } from "./useCreditsData"

const Credits = () => {
  const {
    epochs,
    epoch,
    setEpoch,
    epochEndTime,
    userData,
    claimableAbc,
    onClaimABCReward,
  } = useCreditsData()
  return (
    <>
      <Epoch
        epochs={epochs}
        epoch={epoch}
        setEpoch={setEpoch}
        endTime={epochEndTime}
      />
      <Emissions
        abcEmissions={userData?.abcEmissions}
        userCredits={userData?.userCredits}
        claimableAbc={claimableAbc}
        claimAbc={() =>
          onClaimABCReward(epoch, () => {
            // TODO: Refresh page data
          })
        }
      />
    </>
  )
}

export { Credits }
