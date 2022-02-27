import React from "react"
import AMM from "./AMM"
import ManagePool from "./ManagePool"

const CurrentState = ({ page }: { page: number }) => {
  switch (page) {
    case 0:
      return <AMM />
    case 1:
    default:
      return <ManagePool />
  }
}

export default CurrentState
