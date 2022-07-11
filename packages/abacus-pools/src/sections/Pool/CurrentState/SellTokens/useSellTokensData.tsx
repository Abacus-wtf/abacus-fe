import { useSellablePositions } from "@state/singlePoolData/hooks"

const useSellTokensData = () => {
  const sellablePositions = useSellablePositions()

  return {
    sellablePositions,
  }
}

export { useSellTokensData }
