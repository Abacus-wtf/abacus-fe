import { useState, useEffect } from "react"
import { useActiveWeb3React } from "@hooks/index"
import { useCurrentSessionData } from "@state/sessionData/hooks"
import { encodeSessionData } from "@config/utils"

type Participation = {
  appraisal: number
  stake: number
  password: string
  hasWeighted: boolean
} | null

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

    if (account) {
      const itemsString = localStorage.getItem(encodedVals)
      const items = JSON.parse(itemsString)
      if (items) {
        setParticipation({
          appraisal: Number(items.appraisal),
          stake: Number(items.stake),
          password: String(items.password),
          hasWeighted: Boolean(items.hasWeighted),
        })
      } else {
        setParticipation(null)
      }
    }
  }, [account, sessionData.address, sessionData.nonce, sessionData.tokenId])

  const setHasWeighted = (hasWeighted: boolean) => {
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
        hasWeighted,
      })
    )
  }

  return { participation, setHasWeighted }
}

export default useParticipation
