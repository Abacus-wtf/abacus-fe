import { useCallback } from "react"
import { getContract } from "@config/utils"
import { useActiveWeb3React, useGeneralizedContractCall } from "@hooks/index"
import { useTransactionAdder } from "@state/transactions/hooks"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { parseEther } from "ethers/lib/utils"
import { ABC_BRIBE_FACTORY } from "@config/constants"
import BRIBE_ABI from "../config/contracts/ABC_BRIBE_FACTORY_ABI.json"

export const useOnAddToBribe = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()
  const poolData = useGetPoolData()

  const onAddToBribe = useCallback(
    async (amount: string, cb: () => void) => {
      const bribeContract = getContract(
        ABC_BRIBE_FACTORY,
        BRIBE_ABI,
        library,
        account
      )
      const method = bribeContract.addToBribe
      const estimate = bribeContract.estimateGas.addToBribe
      const args = [poolData.address, poolData.tokenId]
      const value = parseEther(amount)
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Add to Bribe",
        })
        await response.wait()
        cb()
      }
      await generalizedContractCall({
        method,
        estimate,
        args,
        value,
        cb: txnCb,
      })
    },
    [library, account, generalizedContractCall, addTransaction, poolData]
  )
  return {
    onAddToBribe,
    isPending,
  }
}

export const useWithdrawBribe = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()
  const poolData = useGetPoolData()

  const onWithdrawBribe = useCallback(
    async (amount: string, cb: () => void) => {
      const bribeContract = getContract(
        ABC_BRIBE_FACTORY,
        BRIBE_ABI,
        library,
        account
      )
      const method = bribeContract.withdrawBribe
      const estimate = bribeContract.estimateGas.withdrawBribe
      const args = [poolData.address, poolData.tokenId, parseEther(amount)]
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Withdraw Bribe",
        })
        await response.wait()
        cb()
      }
      await generalizedContractCall({
        method,
        estimate,
        args,
        value,
        cb: txnCb,
      })
    },
    [library, account, generalizedContractCall, addTransaction, poolData]
  )
  return {
    onWithdrawBribe,
    isPending,
  }
}

export const useAcceptBribe = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()
  const poolData = useGetPoolData()

  const onAcceptBribe = useCallback(
    async (cb: () => void) => {
      const bribeContract = getContract(
        ABC_BRIBE_FACTORY,
        BRIBE_ABI,
        library,
        account
      )
      const method = bribeContract.acceptBribe
      const estimate = bribeContract.estimateGas.acceptBribe
      const args = [poolData.address, poolData.tokenId]
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Accept Bribe",
        })
        await response.wait()
        cb()
      }
      await generalizedContractCall({
        method,
        estimate,
        args,
        value,
        cb: txnCb,
      })
    },
    [library, account, generalizedContractCall, addTransaction, poolData]
  )
  return {
    onAcceptBribe,
    isPending,
  }
}
