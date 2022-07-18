import { getContract } from "@config/utils"
import { useTransactionAdder } from "@state/transactions/hooks"
import { parseEther } from "ethers/lib/utils"
import { useCallback } from "react"
import { useCurrentLendingNFT } from "@state/lending/hooks"
import { useActiveWeb3React, useGeneralizedContractCall } from "."
import LEND_ABI from "../config/contracts/ABC_LEND_MULTI_ABI.json"
import ERC_721_ABI from "../config/contracts/ERC_721_ABI.json"
import { ABC_LEND } from "../config/constants"

export const useOnAllowTransferFrom = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onAllowTransferFrom = useCallback(
    async (nft: string, tokenId: number, cb: () => void) => {
      const lendContract = getContract(ABC_LEND, LEND_ABI, library, account)

      const method = lendContract.allowTransferFrom
      const estimate = lendContract.estimateGas.allowTransferFrom
      const args = [nft, tokenId, account]
      console.log(args)
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Allow Transfer From",
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
    onAllowTransferFrom,
    isPending,
  }
}

export const useOnApproveLoan = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()
  const { address } = useCurrentLendingNFT()

  const onApproveLoan = useCallback(
    async (cb: () => void) => {
      const erc721 = getContract(address, ERC_721_ABI, library, account)
      const method = erc721.setApprovalForAll
      const estimate = erc721.estimateGas.setApprovalForAll
      const args = [ABC_LEND, true]
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Approve Loan",
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
    [address, library, account, generalizedContractCall, addTransaction]
  )
  return {
    onApproveLoan,
    isPending,
  }
}

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
