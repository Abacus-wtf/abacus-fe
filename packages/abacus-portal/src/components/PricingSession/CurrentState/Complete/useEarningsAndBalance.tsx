import { useEthToUSD } from "@state/application/hooks"
import { useClaimPayoutData } from "@state/miscData/hooks"

const useEarningsAndBalance = () => {
  const claimData = useClaimPayoutData()

  const ethBalance = claimData.ethCredit
  const ethEarnings = claimData.ethPayout
  const abcEarnings = claimData.abcPayout
  const earningsUSD = useEthToUSD(ethEarnings)
  const balanceUSD = useEthToUSD(ethBalance)
  return {
    ethBalance,
    ethEarnings,
    abcEarnings,
    earningsUSD,
    balanceUSD,
  }
}

export default useEarningsAndBalance
