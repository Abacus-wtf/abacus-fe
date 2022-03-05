import { PoolStatus } from "@state/poolData/reducer"
import React from "react"
import CurrentPosition from "./CurrentPosition"
import AMM from "./AMM"
import ManagePool from "./ManagePool"
import Auction from "./Auction"
import ClosedPool from "./ClosedPool"

export interface StateComponent {
  refresh: () => void
}

const CurrentState = ({
  page,
  status,
  refresh,
}: {
  page: number
  status: PoolStatus
  refresh: () => void
}) => {
  if (status === PoolStatus.Normal) {
    switch (page) {
      case 0:
        return <AMM refresh={refresh} />
      case 1:
        return <CurrentPosition />
      default:
        return <ManagePool refresh={refresh} />
    }
  } else if (status === PoolStatus.Auction) {
    return <Auction refresh={refresh} />
  }
  return <ClosedPool />
}

export default CurrentState
