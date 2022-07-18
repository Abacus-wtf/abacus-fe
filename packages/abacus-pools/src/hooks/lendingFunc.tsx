import { getContract } from "@config/utils"
import { useTransactionAdder } from "@state/transactions/hooks"
import { parseEther } from "ethers/lib/utils"
import { useCallback } from "react"
import { useActiveWeb3React, useGeneralizedContractCall } from "."
import LEND_ABI from "../config/contracts/ABC_LEND_MULTI_ABI.json"
import { ABC_LEND } from "../config/constants"

export const useOnBorrow = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onBorrow = useCallback(
    async (
      pool: string,
      nft: string,
      tokenId: number,
      amount: string,
      cb: () => void
    ) => {
      const lendContract = getContract(ABC_LEND, LEND_ABI, library, account)

      const method = lendContract.borrow
      const estimate = lendContract.estimateGas.borrow
      const args = [pool, nft, tokenId, parseEther(amount)]
      console.log(args)
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Borrow ETH",
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
    [account, addTransaction, generalizedContractCall, library]
  )
  return {
    onBorrow,
    isPending,
  }
}

export const useOnRepay = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onRepay = useCallback(
    async (nft: string, tokenId: number, amount: string, cb: () => void) => {
      const lendContract = getContract(ABC_LEND, LEND_ABI, library, account)

      const method = lendContract.repay
      const estimate = lendContract.estimateGas.repay
      const args = [nft, tokenId, parseEther(amount)]
      console.log(args)
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Repay ETH",
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
    [account, addTransaction, generalizedContractCall, library]
  )
  return {
    onRepay,
    isPending,
  }
}
