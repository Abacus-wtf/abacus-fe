import { useActiveWeb3React } from "@hooks/index"
import { Vote } from "@state/sessionData/reducer"
import { useCallback, useState, useEffect } from "react"

const useVotesWeighted = (votes: Vote[]) => {
  const { account } = useActiveWeb3React()
  const getVotesWeighted = useCallback(
    () =>
      votes.reduce(
        (acc, { weight }) => weight && (Number(weight) === 0 ? acc : acc + 1),
        0
      ),
    [votes]
  )

  const [votesWeighted, setVotesWeighted] = useState(getVotesWeighted)

  useEffect(() => {
    if (votes.length) {
      setVotesWeighted(getVotesWeighted())
    }
  }, [getVotesWeighted, votes])

  const hasUserWeighed = votes.findIndex((vote) => vote.user === account) > -1

  return { votesWeighted, hasUserWeighed }
}

export default useVotesWeighted
