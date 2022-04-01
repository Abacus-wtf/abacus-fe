/* eslint-disable no-await-in-loop */
import { useCallback } from "react"
import { getContract } from "@config/utils"
import { useActiveWeb3React, useGeneralizedContractCall } from "@hooks/index"
import { useTransactionAdder } from "@state/transactions/hooks"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { parseEther } from "ethers/lib/utils"
import CLOSE_POOL_ABI from "../config/contracts/ABC_CLOSE_POOL_ABI.json"

export const useOnBid = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()
  const poolData = useGetPoolData()

  const onBid = useCallback(
    async (bidAmount: string, cb: () => void) => {
      const closePoolContract = getContract(
        poolData.auction.closePoolAddress,
        CLOSE_POOL_ABI,
        library,
        account
      )

      const method = closePoolContract.newBid
      const estimate = closePoolContract.estimateGas.newBid
      const args = []
      const value = parseEther(bidAmount)
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Bid on Auction",
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
    [poolData, library, account, generalizedContractCall, addTransaction]
  )
  return {
    onBid,
    isPending,
  }
}

export const useOnClaimPreviousBid = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()
  const poolData = useGetPoolData()

  const onClaimPreviousBid = useCallback(
    async (cb: () => void) => {
      const closePoolContract = getContract(
        poolData.auction.closePoolAddress,
        CLOSE_POOL_ABI,
        library,
        account
      )

      const method = closePoolContract.reclaimBid
      const estimate = closePoolContract.estimateGas.reclaimBid
      const args = []
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Reclaim Bid",
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
    [poolData, library, account, generalizedContractCall, addTransaction]
  )
  return {
    onClaimPreviousBid,
    isPending,
  }
}

export const useOnEndAuction = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()
  const poolData = useGetPoolData()

  const onEndAuction = useCallback(
    async (cb: () => void) => {
      const closePoolContract = getContract(
        poolData.auction.closePoolAddress,
        CLOSE_POOL_ABI,
        library,
        account
      )

      const method = closePoolContract.endAuction
      const estimate = closePoolContract.estimateGas.endAuction
      const args = []
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "End Auction",
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
    [poolData, library, account, generalizedContractCall, addTransaction]
  )
  return {
    onEndAuction,
    isPending,
  }
}

export const useOnCloseAccount = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()
  const poolData = useGetPoolData()

  const onCloseAccount = useCallback(
    async (
      amountCredits: string,
      amountOfProfitsToUse: string,
      cb: () => void
    ) => {
      const closePoolContract = getContract(
        poolData.auction.closePoolAddress,
        CLOSE_POOL_ABI,
        library,
        account
      )

      const method = closePoolContract.closeAccount
      const estimate = closePoolContract.estimateGas.closeAccount
      const args = [
        parseEther(amountCredits).toString(),
        parseEther(amountOfProfitsToUse).toString(),
      ]
      console.log(args)
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Close Account",
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
    [poolData, library, account, generalizedContractCall, addTransaction]
  )
  return {
    onCloseAccount,
    isPending,
  }
}

export const useOnCalculatePrincipal = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()
  const poolData = useGetPoolData()

  const onCalculatePrincipal = useCallback(
    async (cb: () => void) => {
      const closePoolContract = getContract(
        poolData.auction.closePoolAddress,
        CLOSE_POOL_ABI,
        library,
        account
      )

      const method = closePoolContract.calculatePrincipal
      const estimate = closePoolContract.estimateGas.calculatePrincipal
      const args = [poolData.auction.ownedTickets]
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Calculate Principal",
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
    [poolData, library, account, generalizedContractCall, addTransaction]
  )
  return {
    onCalculatePrincipal,
    isPending,
  }
}
