import { useEffect, useMemo, useState } from "react"

import { ABC_EPOCH, ABC_FACTORY } from "@config/constants"
import { useClaimABCReward } from "@hooks/epochFunc"
import { useActiveWeb3React, useMultiCall, useWeb3Contract } from "@hooks/index"
import { formatEther } from "ethers/lib/utils"
import { map, range } from "lodash"

import { BigNumber } from "ethers"

import EPOCH_VAULT_ABI from "../../../../config/contracts/ABC_EPOCH_ABI.json"
import FACTORY_ABI from "../../../../config/contracts/ABC_FACTORY_ABI.json"
import { EpochData } from "../../models"

const useCreditsData = () => {
  const { account } = useActiveWeb3React()
  const [currentEpoch, setCurrentEpoch] = useState(0)
  const [epoch, setEpoch] = useState(0)
  const [epochEndTime, setEpochEndTime] = useState<number>(null)
  const [totalEmissions, setTotalEmissions] = useState<BigNumber>(
    BigNumber.from(0)
  )
  const [totalCredits, setTotalCredits] = useState<number>(null)
  const [userData, setUserData] = useState<EpochData | null>(null)
  const [currentEpochSet, setCurrentEpochSet] = useState(false)
  const [, setPendingRewards] = useState(0)
  const { onClaimABCReward, isPending } = useClaimABCReward()
  // TODO: Determine if this will be used
  // const { onClaimEmissions, isPending: isPendingEmissions } =
  //   useClaimEmissions()

  const epochVault = useMultiCall(EPOCH_VAULT_ABI)
  const factoryVault = useWeb3Contract(FACTORY_ABI)

  useEffect(() => {
    const startData = async () => {
      const [_pendingRewards, [currentEpoch]] = await Promise.all([
        factoryVault(ABC_FACTORY).methods.pendingReturns(account).call(),
        epochVault(ABC_EPOCH, ["getCurrentEpoch"], [[]]),
      ])

      const [abcEmissions, userCredits, getEpochEndTime, epochTracker] =
        await epochVault(
          ABC_EPOCH,
          [
            "getBaseEmission",
            "getUserCredits",
            "getEpochEndTime",
            "epochTracker",
          ],
          [
            [currentEpoch[0]],
            [currentEpoch[0], account],
            [currentEpoch[0]],
            [currentEpoch[0]],
          ]
        )

      setTotalEmissions(
        BigNumber.from(abcEmissions[0]).add(BigNumber.from(epochTracker[2]))
      )
      setTotalCredits(Number(formatEther(BigNumber.from(epochTracker[0]))))

      setPendingRewards(Number(formatEther(_pendingRewards)))

      setEpochEndTime(BigNumber.from(getEpochEndTime[0]).toNumber() * 1000)
      setEpoch(BigNumber.from(currentEpoch[0]).toNumber())
      setCurrentEpoch(BigNumber.from(currentEpoch[0]).toNumber())
      setUserData({
        userCredits: Number(formatEther(userCredits[0])),
        abcEmissions: Number(formatEther(abcEmissions[0])),
      })
      setCurrentEpochSet(true)
    }
    const getClaimData = async () => {
      const [abcEmissions, userCredits, getEpochEndTime] = await epochVault(
        ABC_EPOCH,
        ["getBaseEmission", "getUserCredits", "getEpochEndTime"],
        [[epoch], [epoch, account], [epoch]]
      )

      setEpochEndTime(BigNumber.from(getEpochEndTime[0]).toNumber() * 1000)
      setUserData({
        userCredits: Number(formatEther(userCredits[0])),
        abcEmissions: Number(formatEther(abcEmissions[0])),
      })
    }
    if (account) {
      try {
        if (!currentEpochSet) {
          startData()
        } else {
          getClaimData()
        }
      } catch (e) {
        console.error(e)
      }
    }
  }, [account, epochVault, epoch, currentEpochSet, factoryVault])

  const epochs = useMemo(
    () => map(range(0, currentEpoch + 11), (i) => `#${i}`),
    [currentEpoch]
  )

  const claimableAbc =
    userData?.userCredits === 0
      ? 0
      : Number(
          formatEther(
            totalEmissions.mul(
              BigNumber.from(userData?.userCredits ?? 0).div(
                BigNumber.from(totalCredits === 0 ? 1 : totalCredits ?? 1)
              )
            )
          )
        )

  return {
    epochs,
    epoch,
    setEpoch,
    epochEndTime,
    userData,
    claimableAbc,
    onClaimABCReward,
    isPending,
  }
}

export { useCreditsData }
