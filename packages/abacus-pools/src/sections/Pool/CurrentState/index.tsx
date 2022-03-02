import { PoolStatus } from "@state/poolData/reducer"
import React from "react"
import CurrentPosition from "./CurrentPosition"
import AMM from "./AMM"
import ManagePool from "./ManagePool"
import Auction from "./Auction"

const CurrentState = ({
  page,
  status,
}: {
  page: number
  status: PoolStatus
}) => {
  if (status === PoolStatus.Normal) {
    switch (page) {
      case 0:
        return <AMM />
      case 1:
        return <CurrentPosition />
      default:
        return <ManagePool />
    }
  } else if (status === PoolStatus.Auction) {
    return <Auction />
  }
  return <></>
}

export default CurrentState
