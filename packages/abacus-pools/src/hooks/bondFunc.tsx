import { useCallback } from "react"
import { getContract } from "@config/utils"
import { useActiveWeb3React, useGeneralizedContractCall } from "@hooks/index"
import { useTransactionAdder } from "@state/transactions/hooks"
import { ABC_CREDIT_BONDS } from "@config/constants"
import { parseEther } from "ethers/lib/utils"
import ABC_CREDIT_ABI from "../config/contracts/ABC_CREDIT_BONDS_ABI.json"

export const useOnBond = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onBond = useCallback(
    async (_value: string, cb: () => void) => {
      const bondContract = getContract(
        ABC_CREDIT_BONDS,
        ABC_CREDIT_ABI,
        library,
        account
      )
      const method = bondContract.bond
      const estimate = bondContract.estimateGas.bond
      const args = [parseEther(_value)]
      console.log(args)
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Bond",
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
    [library, account, generalizedContractCall, addTransaction]
  )
  return {
    onBond,
    isPending,
  }
}

export const useOnAddABCCredit = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onAddABCCredit = useCallback(
    async (amount: string, cb: () => void) => {
      const bondContract = getContract(
        ABC_CREDIT_BONDS,
        ABC_CREDIT_ABI,
        library,
        account
      )
      const method = bondContract.addAbcCredit
      const estimate = bondContract.estimateGas.addAbcCredit
      const args = [parseEther(amount)]
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Add ABC Credit",
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
    [library, account, generalizedContractCall, addTransaction]
  )
  return {
    onAddABCCredit,
    isPending,
  }
}
