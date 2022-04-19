import { useCallback } from "react"
import { getContract } from "@config/utils"
import { ABC_TOKEN } from "@config/constants"
import { useActiveWeb3React, useGeneralizedContractCall } from "@hooks/index"
import { useTransactionAdder } from "@state/transactions/hooks"
import ABC_TOKEN_ABI from "../config/contracts/ABC_TOKEN_ABI.json"

export const useOnFaucet = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onFaucet = useCallback(
    async (cb: () => void) => {
      const tokenContract = getContract(
        ABC_TOKEN,
        ABC_TOKEN_ABI,
        library,
        account
      )
      const method = tokenContract.faucet
      const estimate = tokenContract.estimateGas.faucet
      const args = []
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Faucet",
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
    onFaucet,
    isPending,
  }
}
