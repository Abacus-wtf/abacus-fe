import { useCallback, useEffect, useState } from "react"

import { ABC_EPOCH, ABC_TOKEN, VE_ABC_TOKEN } from "@config/constants"
import { useActiveWeb3React, useMultiCall, useWeb3Contract } from "@hooks/index"
import { formatEther, parseEther } from "ethers/lib/utils"
import { BigNumber } from "@ethersproject/bignumber"
import moment from "moment"
// import {
//   useOnAddTokens,
//   useOnChangeAllocation,
//   useOnClaimReward,
//   useOnLockTokens,
//   useOnUnlockTokens,
// } from "@hooks/veFunc"
import ABC_EPOCH_ABI from "../../config/contracts/ABC_EPOCH_ABI.json"
import VE_ABC_ABI from "../../config/contracts/VE_ABC_TOKEN_ABI.json"
import ABC_ABI from "../../config/contracts/ABC_TOKEN_ABI.json"

interface Holder {
  timeUnlock: number
  amountLocked: number
  multiplier: number
  amountAllocated: number
  amountAutoAllocated: number
}

const useVeData = () => {
  const { account } = useActiveWeb3React()
  const [refresh, setRefresh] = useState({})

  const [epoch, setEpoch] = useState(0)
  const [abcMaxBalance, setABCMaxBalance] = useState("")
  const [veAbcBalance, setVeAbcBalance] = useState("")

  const [holderData, setHolderData] = useState<Holder | null>(null)

  const [showClaimButton, setShowClaimButton] = useState(false)
  const [showUnlockTokensButton, setShowUnlockTokensButton] = useState(false)

  const veAbcCall = useMultiCall(VE_ABC_ABI)
  const abcCall = useWeb3Contract(ABC_ABI)
  const epochCall = useWeb3Contract(ABC_EPOCH_ABI)
  // const { onAddTokens, isPending: isPendingAddTokens } = useOnAddTokens()
  // const { onLockTokens, isPending: isPendingLockTokens } = useOnLockTokens()
  // const { onUnlockTokens, isPending: isPendingUnlockTokens } =
  //   useOnUnlockTokens()
  // const { onChangeAllocation, isPending: isPendingChangeAllocation } =
  //   useOnChangeAllocation()
  // const { onClaimReward, isPending: isPendingClaimReward } = useOnClaimReward()

  const getVeData = useCallback(async () => {
    const currentEpoch = await epochCall(ABC_EPOCH)
      .methods.getCurrentEpoch()
      .call()
    const [
      [veHolderHistory, veBalance, getAmountAllocated, getAmountAutoAllocated],
      balance,
    ] = await Promise.all([
      veAbcCall(
        VE_ABC_TOKEN,
        [
          "veHolderHistory",
          "balanceOf",
          "getAmountAllocated",
          "getAmountAutoAllocated",
        ],
        [[account], [account], [account], [account, currentEpoch]]
      ),
      abcCall(ABC_TOKEN).methods.balanceOf(account).call(),
    ])

    setShowUnlockTokensButton(
      Number(formatEther(veHolderHistory[3])) === 0 &&
        BigNumber.from(veHolderHistory[0]).toNumber() < moment().unix()
    )
    setVeAbcBalance(formatEther(veBalance[0] ?? "0"))
    setABCMaxBalance(BigNumber.from(balance).sub(parseEther("10")).toString())

    setHolderData({
      timeUnlock: BigNumber.from(veHolderHistory[0]).mul(1000).toNumber(),
      amountLocked: Number(formatEther(veHolderHistory[1])),
      multiplier: BigNumber.from(veHolderHistory[2]).toNumber(),
      amountAllocated: Number(formatEther(getAmountAllocated[0])),
      amountAutoAllocated: Number(formatEther(getAmountAutoAllocated[0])),
    })

    setShowClaimButton(
      BigNumber.from(veHolderHistory[0]).toNumber() < currentEpoch
    )

    setEpoch(currentEpoch)
  }, [abcCall, account, epochCall, veAbcCall])

  useEffect(() => {
    if (account) {
      try {
        getVeData()
      } catch (e) {
        console.error(e)
      }
    }
  }, [account, getVeData, refresh])

  return {
    epoch,
    abcMaxBalance,
    veAbcBalance,
    holderData,
    showClaimButton,
    showUnlockTokensButton,
    getVeData,
    refreshVeState: () => setRefresh({}),
  }
}

export { useVeData }
