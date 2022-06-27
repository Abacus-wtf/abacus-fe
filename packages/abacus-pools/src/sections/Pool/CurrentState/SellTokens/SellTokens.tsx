import React from "react"
import { useSellTokensData } from "./useSellTokensData"

type SellTokensProps = {
  refreshPoolData: () => void
}

const SellTokens = ({ refreshPoolData }: SellTokensProps) => {
  const { sellablePositions } = useSellTokensData()
  return (
    <>
      {sellablePositions?.map((position) => (
        <React.Fragment key={position.id}>
          <p>Amount: {position.amount}</p>
          <p>Started: Epoch #{position.startEpoch}</p>
          <p>Ended: Epoch #{position.finalEpoch}</p>
          <p>Nonce: {position.nonce}</p>
        </React.Fragment>
      ))}
    </>
  )
}

export { SellTokens }
