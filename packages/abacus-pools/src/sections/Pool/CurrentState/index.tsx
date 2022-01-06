import React from "react"
import { useGetPoolStatus } from "@state/singlePoolData/hooks"
import { PoolStateStatus } from "@state/singlePoolData/reducer"
import AMM from "./AMM"

const CurrentState = () => {
  const status = useGetPoolStatus()
  switch (status) {
    case PoolStateStatus.AMM:
      return <AMM />
    case PoolStateStatus.Auction:
      return <AMM />
    default:
      return null
  }
}

export default CurrentState
