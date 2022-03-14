import { useCallback } from "react"
import { getContract } from "@config/utils"
import {
  useActiveWeb3React,
  useGeneralizedContractCall,
  useMultiCall,
} from "@hooks/index"
import { useTransactionAdder } from "@state/transactions/hooks"
import _ from "lodash"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { formatEther, parseEther } from "ethers/lib/utils"
import VAULT_ABI from "../config/contracts/ABC_VAULT_ABI.json"

export const useOnExitPool = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onExitPool = useCallback(
    async (vaultAddress: string, cb: () => void) => {
      const vaultContract = getContract(
        vaultAddress,
        VAULT_ABI,
        library,
        account
      )
      const method = vaultContract.closePool
      const estimate = vaultContract.estimateGas.closePool
      const args = []
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Exit Vault",
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
    onExitPool,
    isPending,
  }
}

export const useUnlockPosition = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()
  const poolData = useGetPoolData()

  const onUnlockPosition = useCallback(
    async (tokens: string[], cb: () => void) => {
      const vaultContract = getContract(
        poolData.vaultAddress,
        VAULT_ABI,
        library,
        account
      )
      const method = vaultContract.sellToken
      const estimate = vaultContract.estimateGas.sellToken
      const args = [account, tokens]
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Unlock Position",
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
    onUnlockPosition,
    isPending,
  }
}

export const useOnStartEmissions = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()
  const poolData = useGetPoolData()

  const onStartEmissions = useCallback(
    async (cb: () => void) => {
      const vaultContract = getContract(
        poolData.vaultAddress,
        VAULT_ABI,
        library,
        account
      )
      const method = vaultContract.startEmissions
      const estimate = vaultContract.estimateGas.startEmissions
      const args = []
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Start Emissions",
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
    onStartEmissions,
    isPending,
  }
}

export const useOnPurchaseTokens = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()
  const poolData = useGetPoolData()
  const multicall = useMultiCall(VAULT_ABI)

  const onPurchaseTokens = useCallback(
    async (tokenAmount: string, lockupPeriod: number, cb: () => void) => {
      const vaultContract = getContract(
        poolData.vaultAddress,
        VAULT_ABI,
        library,
        account
      )

      console.log(poolData.vaultAddress)

      let runningTokenAmount = Number(tokenAmount)
      const ticketArray = []
      const purchaseAmount = []
      let cycle = 0
      while (runningTokenAmount !== 0) {
        const methods = _.map(
          _.range(cycle * 20, cycle * 20 + 20),
          () => "ticketsPurchased"
        )
        const args = _.map(_.range(cycle * 20, cycle * 20 + 20), (i) => [i])
        // @ts-ignore
        const ticketFillings = await multicall(
          poolData.vaultAddress,
          methods,
          args
        )

        for (let i = 0; i < ticketFillings.length; i += 1) {
          if (runningTokenAmount === 0) {
            break
          }

          const ticketFilled = parseFloat(formatEther(ticketFillings[i][0]))
          if (ticketFilled < 3000) {
            let spaceLeft = 3000 - ticketFilled
            if (spaceLeft > runningTokenAmount) {
              spaceLeft = runningTokenAmount
              runningTokenAmount = 0
            } else {
              runningTokenAmount -= spaceLeft
            }
            ticketArray.push(i)
            purchaseAmount.push(parseEther(`${spaceLeft}`))
          }
        }
        cycle += 1
      }

      const method = vaultContract.purchaseMulti
      const estimate = vaultContract.estimateGas.purchaseMulti
      const args = [account, account, ticketArray, purchaseAmount, lockupPeriod]
      console.log(args)
      const value = parseEther(`${(Number(tokenAmount) * 1.0025) / 1000}`)
      console.log(value.toString())
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Purchase Locked Up Tokens",
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
    [
      poolData,
      library,
      account,
      generalizedContractCall,
      multicall,
      addTransaction,
    ]
  )
  return {
    onPurchaseTokens,
    isPending,
  }
}

export const useOnPurchaseIndividualTicket = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()
  const poolData = useGetPoolData()

  const onPurchaseIndividualTicket = useCallback(
    async (
      tokenAmount: string,
      ticket: number,
      lockupPeriod: number,
      cb: () => void
    ) => {
      const vaultContract = getContract(
        poolData.vaultAddress,
        VAULT_ABI,
        library,
        account
      )

      const method = vaultContract.purchaseToken
      const estimate = vaultContract.estimateGas.purchaseToken
      const args = [
        account,
        account,
        ticket,
        parseEther(tokenAmount),
        lockupPeriod,
      ]
      console.log(args)
      const value = parseEther(`${(Number(tokenAmount) * 1.0025) / 1000}`)
      console.log(value.toString())
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Purchase Locked Up Ticket",
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
    onPurchaseIndividualTicket,
    isPending,
  }
}
