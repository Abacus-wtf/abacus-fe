import { useCallback, useEffect, useMemo, useState } from "react"

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
import {
  useFetchEpochAllocations,
  useFetchUserAllocations,
  useFetchEpochAllocationAggregate,
} from "@state/allocations/hooks"
import { map, range } from "lodash"
import { useCurrentEpoch } from "@state/application/hooks"
import ABC_EPOCH_ABI from "../../config/contracts/ABC_EPOCH_ABI.json"
import VE_ABC_ABI from "../../config/contracts/VE_ABC_TOKEN_ABI.json"
import ABC_ABI from "../../config/contracts/ABC_TOKEN_ABI.json"

export interface Holder {
  timeUnlock: number
  amountLocked: number
  multiplier: number
  amountAllocated: number
  amountAutoAllocated: number
}

const useVeData = () => {
  const { account } = useActiveWeb3React()
  const [refresh, setRefresh] = useState({})
  const { fetchUserAllocations } = useFetchUserAllocations()
  const { fetchEpochAllocations } = useFetchEpochAllocations()
  const { fetchEpochAllocationAggregate } = useFetchEpochAllocationAggregate()

  const currentEpoch = useCurrentEpoch()
  const [epoch, setEpoch] = useState(0)
  const [abcMaxBalance, setABCMaxBalance] = useState("")
  const [veABCMaxToAllocate, setVeABCMaxToAllocate] = useState("")
  const [veAbcBalance, setVeAbcBalance] = useState("")
  const [epochEndTime, setEpochEndTime] = useState<number>(null)

  const [holderData, setHolderData] = useState<Holder | null>(null)

  const [showClaimButton, setShowClaimButton] = useState(false)
  const [showUnlockTokensButton, setShowUnlockTokensButton] = useState(false)

  const veAbcCall = useMultiCall(VE_ABC_ABI)
  const abcCall = useWeb3Contract(ABC_ABI)
  const epochMulti = useMultiCall(ABC_EPOCH_ABI)
  // const { onAddTokens, isPending: isPendingAddTokens } = useOnAddTokens()
  // const { onLockTokens, isPending: isPendingLockTokens } = useOnLockTokens()
  // const { onUnlockTokens, isPending: isPendingUnlockTokens } =
  //   useOnUnlockTokens()
  // const { onChangeAllocation, isPending: isPendingChangeAllocation } =
  //   useOnChangeAllocation()
  // const { onClaimReward, isPending: isPendingClaimReward } = useOnClaimReward()

  const getVeData = useCallback(async () => {
    if (!currentEpoch) {
      return
    }
    const [
      [veHolderHistory, veBalance, getAmountAllocated, getAmountAutoAllocated],
      balance,
    ] = await Promise.all([
      veAbcCall(
        VE_ABC_TOKEN,
        [
          "veHolderHistory",
          "getVeAmount",
          "getAmountAllocated",
          "getAmountAutoAllocated",
        ],
        [[account], [account, currentEpoch], [account], [account, currentEpoch]]
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
      timeUnlock: BigNumber.from(veHolderHistory[2]).mul(1000).toNumber(),
      amountLocked: Number(formatEther(veHolderHistory[3])),
      multiplier: 1,
      amountAllocated: Number(formatEther(getAmountAllocated[0])),
      amountAutoAllocated: Number(formatEther(getAmountAutoAllocated[0])),
    })

    setVeABCMaxToAllocate(
      formatEther(
        BigNumber.from(veBalance[0]).sub(BigNumber.from(getAmountAllocated[0]))
      )
    )

    setShowClaimButton(
      BigNumber.from(veHolderHistory[0]).toNumber() < Number(currentEpoch)
    )

    setEpoch(Number(currentEpoch))
  }, [abcCall, account, currentEpoch, veAbcCall])

  useEffect(() => {
    if (account) {
      try {
        getVeData()
      } catch (e) {
        console.error(e)
      }
    }
  }, [account, getVeData, refresh])

  useEffect(() => {
    if (account) {
      fetchUserAllocations()
    }
  }, [account, fetchUserAllocations, refresh])

  useEffect(() => {
    fetchEpochAllocations()
  }, [fetchEpochAllocations, refresh])

  useEffect(() => {
    fetchEpochAllocationAggregate()
  }, [fetchEpochAllocationAggregate, refresh])

  useEffect(() => {
    const getEndTime = async () => {
      const [getEpochEndTime] = await epochMulti(
        ABC_EPOCH,
        ["getEpochEndTime"],
        [[epoch]]
      )
      setEpochEndTime(BigNumber.from(getEpochEndTime[0]).toNumber() * 1000)
    }
    getEndTime()
  }, [epoch, epochMulti])

  const epochs = useMemo(
    () => map(range(0, Number(currentEpoch) + 11), (i) => `#${i}`),
    [currentEpoch]
  )

  return {
    epoch,
    setEpoch,
    epochs,
    abcMaxBalance,
    veAbcBalance,
    holderData,
    showClaimButton,
    showUnlockTokensButton,
    veABCMaxToAllocate,
    epochEndTime,
    getVeData,
    refreshVeState: () => setRefresh({}),
  }
}

export { useVeData }
