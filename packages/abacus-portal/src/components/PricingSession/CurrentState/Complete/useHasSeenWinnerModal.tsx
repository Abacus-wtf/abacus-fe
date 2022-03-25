import { useActiveWeb3React } from "@hooks/index"
import { useCurrentSessionData } from "@state/sessionData/hooks"
import { useEffect, useState } from "react"

const SEEN = "seen"

const getHasSeenFromStorage = (key: string | false) =>
  window && key && window.localStorage.getItem(key) === SEEN

const useHasSeenWinnerModal = () => {
  const { account } = useActiveWeb3React()
  const sessionData = useCurrentSessionData()
  const { address, tokenId, nonce } = sessionData || {}
  const valid = account && address && tokenId && nonce
  const KEY = valid
    ? `HAS_SEEN_WINNER-${account}-${address}/${tokenId}/${nonce}`
    : false
  const [hasSeen, setHasSeen] = useState(() =>
    KEY ? getHasSeenFromStorage(KEY) : false
  )

  const setHasSeenWinnerModal = () => {
    if (KEY) {
      window.localStorage.setItem(KEY, SEEN)
      setHasSeen(true)
    }
  }

  useEffect(() => {
    if (valid) {
      setHasSeen(getHasSeenFromStorage(KEY))
    }
  }, [KEY, valid])

  return { hasSeen, setHasSeenWinnerModal }
}

export default useHasSeenWinnerModal
