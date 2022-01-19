import React from "react"
import { useGetPoolStatus } from "@state/singlePoolData/hooks"
import { PoolStateStatus } from "@state/singlePoolData/reducer"
import AMM from "./AMM"
import Auction from "./Auction"
import ManagePool from "./ManagePool"

const CurrentState = ({ isOnManage }: { isOnManage: boolean }) => {
  const status = useGetPoolStatus()

  if (isOnManage) {
    return <ManagePool />
  }

  switch (status) {
    case PoolStateStatus.AMM:
      return <AMM />
    case PoolStateStatus.Auction:
      return <Auction />
    default:
      return null
  }
}

export default CurrentState
