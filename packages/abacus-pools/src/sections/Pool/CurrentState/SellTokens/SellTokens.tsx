import { LoadingOverlay } from "@components/LoadingOverlay"
import { useOnSellTokens } from "@hooks/vaultFunc"
import React from "react"
import { SellablePosition } from "./SellablePosition"
import { useSellTokensData } from "./useSellTokensData"

type SellTokensProps = {
  refreshPoolData: () => void
}

const SellTokens = ({ refreshPoolData }: SellTokensProps) => {
  const { sellablePositions } = useSellTokensData()
  const { onSellTokens, isPending } = useOnSellTokens()
  return (
    <>
      <LoadingOverlay loading={isPending} />
      {sellablePositions?.map((position) => (
        <SellablePosition
          key={position.id}
          {...position}
          onSellTokens={onSellTokens}
          refreshPoolData={refreshPoolData}
        />
      ))}
    </>
  )
}

export { SellTokens }
