import { useActiveWeb3React } from "@hooks/index"
import { useCurrentSessionData } from "@state/sessionData/hooks"

const useUserRanking = () => {
  const { account } = useActiveWeb3React()
  const sessionData = useCurrentSessionData()
  const userRanking = sessionData?.rankings.find(
    (ranking) => ranking.user.toLowerCase() === account.toLowerCase()
  )
  return userRanking
}

export default useUserRanking
