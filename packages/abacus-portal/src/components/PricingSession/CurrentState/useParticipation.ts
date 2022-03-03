import { useState, useEffect } from "react"
import { useActiveWeb3React } from "@hooks/index"
import { useCurrentSessionData } from "@state/sessionData/hooks"
import { encodeSessionData } from "@config/utils"

type Participation = {
  appraisal: number
  stake: number
  seedNumber: string
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
        seedNumber: String(items.seedNumber),
      })
    }
  }, [account, sessionData.address, sessionData.nonce, sessionData.tokenId])

  return participation
}

export default useParticipation
