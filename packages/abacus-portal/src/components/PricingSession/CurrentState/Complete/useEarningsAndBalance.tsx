import { useEthToUSD } from "@state/application/hooks"
import { useClaimPayoutData } from "@state/miscData/hooks"
import { round2Decimals } from "utils"

const useEarningsAndBalance = () => {
  const claimData = useClaimPayoutData()
  const ethBalance = round2Decimals(claimData.ethCredit)
  const ethEarnings = round2Decimals(claimData.ethPayout)
  const abcEarnings = round2Decimals(claimData.abcPayout)
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
