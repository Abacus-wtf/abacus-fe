import { PoolStatus } from "@state/poolData/reducer"
import React, { useEffect } from "react"
import {
  useGetPoolData,
  useGetTraderProfileData,
} from "@state/singlePoolData/hooks"
import { useActiveWeb3React } from "@hooks/index"
import CurrentPosition from "./CurrentPosition"
import AMM from "./AMM"
import ManagePool from "./ManagePool"
import Auction from "./Auction"
import Tickets from "./Tickets"
import { Page } from ".."
import Bribe from "./Bribe"

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
  const { account } = useActiveWeb3React()
  const poolData = useGetPoolData()
  const getTraderProfileData = useGetTraderProfileData()

  useEffect(() => {
    getTraderProfileData()
  }, [account, getTraderProfileData, poolData])

  if (status === PoolStatus.Normal) {
    switch (page) {
      case Page.Main:
        return <AMM refresh={refresh} />
      case Page.CurrentPositions:
        return <CurrentPosition />
      case Page.Bribes:
        return <Bribe refresh={refresh} />
      case Page.Tickets:
        return <Tickets refresh={refresh} />
      default:
        return <ManagePool refresh={refresh} />
    }
  }
  return <Auction refresh={refresh} />
}

export default CurrentState
