import { Vote } from "@state/sessionData/reducer"
import { useCallback, useState, useEffect } from "react"

const useVotesWeighted = (votes: Vote[]) => {
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

  return votesWeighted
}

export default useVotesWeighted
