import { useCallback } from "react"
import { getContract } from "@config/utils"
import { VE_ABC_TOKEN } from "@config/constants"
import { useActiveWeb3React, useGeneralizedContractCall } from "@hooks/index"
import { useTransactionAdder } from "@state/transactions/hooks"
import { parseEther } from "ethers/lib/utils"
import VE_ABC_TOKEN_ABI from "../config/contracts/VE_ABC_TOKEN_ABI.json"

export const useOnLockTokens = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onLockTokens = useCallback(
    async (amount: string, time: number, cb: () => void) => {
      const veContract = getContract(
        VE_ABC_TOKEN,
        VE_ABC_TOKEN_ABI,
        library,
        account
      )
      const method = veContract.lockTokens
      const estimate = veContract.estimateGas.lockTokens
      const args = [parseEther(amount), time]
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Lock Tokens",
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
    onLockTokens,
    isPending,
  }
}

export const useOnAddTokens = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onAddTokens = useCallback(
    async (amount: string, cb: () => void) => {
      const veContract = getContract(
        VE_ABC_TOKEN,
        VE_ABC_TOKEN_ABI,
        library,
        account
      )
      const method = veContract.addTokens
      const estimate = veContract.estimateGas.addTokens
      const args = [parseEther(`${amount}`)]
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Add Tokens",
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
    onAddTokens,
    isPending,
  }
}

export const useOnUnlockTokens = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onUnlockTokens = useCallback(
    async (cb: () => void) => {
      const veContract = getContract(
        VE_ABC_TOKEN,
        VE_ABC_TOKEN_ABI,
        library,
        account
      )
      const method = veContract.unlockTokens
      const estimate = veContract.estimateGas.unlockTokens
      const args = []
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Unlock Tokens",
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
    onUnlockTokens,
    isPending,
  }
}

export const useOnAllocateTokens = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onAllocateTokens = useCallback(
    async (collection: string, amount: number, cb: () => void) => {
      const veContract = getContract(
        VE_ABC_TOKEN,
        VE_ABC_TOKEN_ABI,
        library,
        account
      )
      const method = veContract.allocateToCollection
      const estimate = veContract.estimateGas.allocateToCollection
      const args = [collection, parseEther(`${amount}`)]
      const value = null
      console.log(args)
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Allocate Tokens",
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
    onAllocateTokens,
    isPending,
  }
}

export const useOnChangeAllocation = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onChangeAllocation = useCallback(
    async (
      currentCollection: string,
      newCollection: string,
      amount: number,
      cb: () => void
    ) => {
      const veContract = getContract(
        VE_ABC_TOKEN,
        VE_ABC_TOKEN_ABI,
        library,
        account
      )
      const method = veContract.changeAllocation
      const estimate = veContract.estimateGas.changeAllocation
      const parsedAmount = parseEther(`${amount}`).toString()
      const args = [currentCollection, newCollection, parsedAmount]

      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Change Allocation",
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
    onChangeAllocation,
    isPending,
  }
}

export const useOnRemoveAllocation = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onRemoveAllocation = useCallback(
    async (collection: string, amount: number, cb: () => void) => {
      const veContract = getContract(
        VE_ABC_TOKEN,
        VE_ABC_TOKEN_ABI,
        library,
        account
      )
      const method = veContract.removeAllocation
      const estimate = veContract.estimateGas.removeAllocation
      const args = [collection, parseEther(`${amount}`)]
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Remove Allocation",
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
    onRemoveAllocation,
    isPending,
  }
}

export const useOnAddAutoAllocation = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onAddAutoAllocation = useCallback(
    async (amount: number, cb: () => void) => {
      const veContract = getContract(
        VE_ABC_TOKEN,
        VE_ABC_TOKEN_ABI,
        library,
        account
      )
      const method = veContract.addAutoAllocation
      const estimate = veContract.estimateGas.addAutoAllocation
      const args = [parseEther(`${amount}`)]
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Add to Auto Allocation",
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
    onAddAutoAllocation,
    isPending,
  }
}

export const useOnRemoveAutoAllocation = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onRemoveAutoAllocation = useCallback(
    async (amount: number, cb: () => void) => {
      const veContract = getContract(
        VE_ABC_TOKEN,
        VE_ABC_TOKEN_ABI,
        library,
        account
      )
      const method = veContract.removeAutoAllocation
      const estimate = veContract.estimateGas.removeAutoAllocation
      const args = [parseEther(`${amount}`)]
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Remove Auto Allocation",
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
    onRemoveAutoAllocation,
    isPending,
  }
}

export const useOnClaimReward = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onClaimReward = useCallback(
    async (cb: () => void) => {
      const veContract = getContract(
        VE_ABC_TOKEN,
        VE_ABC_TOKEN_ABI,
        library,
        account
      )

      const method = veContract.claimRewards
      const estimate = veContract.estimateGas.claimRewards
      const args = []
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Claim Rewards",
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
    onClaimReward,
    isPending,
  }
}
