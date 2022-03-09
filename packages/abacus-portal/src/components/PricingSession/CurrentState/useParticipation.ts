import { useState, useEffect } from "react"
import { useActiveWeb3React } from "@hooks/index"
import { useCurrentSessionData } from "@state/sessionData/hooks"
import { encodeSessionData } from "@config/utils"

type Participation = {
  appraisal: number
  stake: number
  password: string
  hasWeighed: boolean
}

function useParticipation() {
  const [participation, setParticipation] = useState<Participation>(null)
  const { account } = useActiveWeb3React()
  const sessionData = useCurrentSessionData()

  useEffect(() => {
    const encodedVals = encodeSessionData({
      account,
      nftAddress: sessionData.address,
      tokenId: sessionData.tokenId,
      nonce: sessionData.nonce,
    })
    const itemsString = localStorage.getItem(encodedVals)
    if (itemsString !== null && account) {
      const items = JSON.parse(itemsString)
      setParticipation({
        appraisal: Number(items.appraisal),
        stake: Number(items.stake),
        password: String(items.password),
        hasWeighed: Boolean(items.hasWeighed),
      })
    }
  }, [account, sessionData.address, sessionData.nonce, sessionData.tokenId])

  const setHasWeighed = (hasWeighed: boolean) => {
    const encodedVals = encodeSessionData({
      account,
      nftAddress: sessionData.address,
      tokenId: sessionData.tokenId,
      nonce: sessionData.nonce,
    })
    localStorage.setItem(
      encodedVals,
      JSON.stringify({
        ...participation,
        hasWeighed,
      })
    )
  }

  return { participation, setHasWeighed }
}

export default useParticipation
