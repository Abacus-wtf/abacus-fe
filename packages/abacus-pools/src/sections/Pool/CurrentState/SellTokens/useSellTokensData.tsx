import { useActiveWeb3React } from "@hooks/index"

import { useCurrentEpoch } from "@state/application/hooks"

import { useSellablePositions } from "@state/singlePoolData/hooks"

const useSellTokensData = () => {
  const { account } = useActiveWeb3React()
  const currentEpoch = useCurrentEpoch()
  const sellablePositions = useSellablePositions(currentEpoch, account)

  return {
    sellablePositions,
  }
}

export { useSellTokensData }
