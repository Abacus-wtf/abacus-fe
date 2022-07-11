import { useCallback } from "react"
import { getContract } from "@config/utils"
import {
  useActiveWeb3React,
  useGeneralizedContractCall,
  useMultiCall,
  useWeb3Contract,
} from "@hooks/index"
import { useTransactionAdder } from "@state/transactions/hooks"
import _ from "lodash"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { formatEther, parseEther } from "ethers/lib/utils"
import { TICKET_SIZE } from "@config/constants"
import VAULT_ABI from "../config/contracts/ABC_VAULT_ABI.json"
import ERC_721_ABI from "../config/contracts/ERC_721_ABI.json"

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

export const useOnCollectEmissions = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onCollectEmissions = useCallback(
    async (vaultAddress: string, cb: () => void) => {
      const vaultContract = getContract(
        vaultAddress,
        VAULT_ABI,
        library,
        account
      )
      const method = vaultContract.claimOwnersReward
      const estimate = vaultContract.estimateGas.claimOwnersReward
      const args = []
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Collect Emissions",
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
    onCollectEmissions,
    isPending,
  }
}

export const useOnApproveTransfer = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()
  const poolData = useGetPoolData()

  const onApproveTransfer = useCallback(
    async (address: string, cb: () => void) => {
      const erc721 = getContract(
        poolData.vaultAddress,
        ERC_721_ABI,
        library,
        account
      )
      const method = erc721.setApprovalForAll
      const estimate = erc721.estimateGas.setApprovalForAll
      const args = [address, true]
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Approve Transfer",
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
    onApproveTransfer,
    isPending,
  }
}

export const useUnlockPosition = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()
  const poolData = useGetPoolData()

  const onUnlockPosition = useCallback(
    async (cb: () => void) => {
      const vaultContract = getContract(
        poolData.vaultAddress,
        VAULT_ABI,
        library,
        account
      )
      const method = vaultContract.sell
      const estimate = vaultContract.estimateGas.sell
      const args = [account]
      const value = null
      console.log(args)
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Unlock Position",
        })
        await response.wait()
        cb()
      }
      // eslint-disable-next-line no-await-in-loop
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
    async (
      tokenAmount: string,
      startEpoch: number,
      endEpoch: number,
      cb: () => void
    ) => {
      const vaultContract = getContract(
        poolData.vaultAddress,
        VAULT_ABI,
        library,
        account
      )

      let runningTokenAmount = Number(tokenAmount)
      const ticketArray = []
      const purchaseAmount = []
      let cycle = 0
      while (runningTokenAmount !== 0) {
        const range = _.range(cycle * 20, cycle * 20 + 20)
        const methods = _.map(range, () => "ticketsPurchased")
        const args = _.map(range, (i) => [startEpoch, parseEther(`${i}`)])
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line no-await-in-loop
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
          if (ticketFilled < TICKET_SIZE) {
            let spaceLeft = TICKET_SIZE - ticketFilled
            if (spaceLeft > runningTokenAmount) {
              spaceLeft = runningTokenAmount
              runningTokenAmount = 0
            } else {
              runningTokenAmount -= spaceLeft
            }
            ticketArray.push(i)
            purchaseAmount.push(spaceLeft)
          }
        }
        cycle += 1
      }

      const method = vaultContract.purchase
      const estimate = vaultContract.estimateGas.purchase
      const args = [
        account,
        account,
        ticketArray,
        purchaseAmount,
        startEpoch,
        endEpoch,
      ]
      console.log(args)
      const value = parseEther(
        `${Number(tokenAmount) * Number(poolData.tokenPrice)}`
      )
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

      const method = vaultContract.purchase
      const estimate = vaultContract.estimateGas.purchase
      const args = [
        account,
        account,
        [parseEther(`${ticket}`)],
        [parseEther(tokenAmount)],
        lockupPeriod,
      ]
      console.log(args)
      const value = parseEther(`${(Number(tokenAmount) * 1.0125) / 1000}`)
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

export const useOnFutureOrder = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()
  const poolData = useGetPoolData()

  const onFutureOrder = useCallback(
    async (
      positionHolder: string,
      ticket: number,
      lockupPeriod: number,
      reward: number,
      cb: () => void
    ) => {
      const vaultContract = getContract(
        poolData.vaultAddress,
        VAULT_ABI,
        library,
        account
      )

      const method = vaultContract.createPendingOrder
      const estimate = vaultContract.estimateGas.createPendingOrder
      const args = [
        positionHolder,
        account,
        ticket,
        lockupPeriod,
        parseEther(`${reward}`),
      ]
      console.log(args)
      const value = parseEther(`${(TICKET_SIZE * 1.0125) / 1000}`).add(
        parseEther(`${reward}`)
      )
      console.log(value.toString())
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Purchase Future Order",
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
    onFutureOrder,
    isPending,
  }
}

export const useOnSellTokens = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()
  const poolData = useGetPoolData()

  const onSellTokens = useCallback(
    async (
      user: string,
      nonce: number,
      payoutRatio: number,
      cb: () => void
    ) => {
      const vaultContract = getContract(
        poolData.vaultAddress,
        VAULT_ABI,
        library,
        account
      )

      const method = vaultContract.sell
      const estimate = vaultContract.estimateGas.sell
      const args = [user, nonce, payoutRatio]
      console.log(args)
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Sell Tokens",
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
    onSellTokens,
    isPending,
  }
}

export const usePurchaseCredits = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()
  const vault = useWeb3Contract(VAULT_ABI)
  const poolData = useGetPoolData()

  const onPurchaseCredits = useCallback(
    async (amount: string, cb: () => void) => {
      const vaultContract = getContract(
        poolData.vaultAddress,
        VAULT_ABI,
        library,
        account
      )

      const ethAmount = await vault(poolData.vaultAddress)
        .methods.costToPurchaseCredits(account, parseEther(amount))
        .call()

      const method = vaultContract.purchaseCredits
      const estimate = vaultContract.estimateGas.purchaseCredits
      const args = [parseEther(amount)]
      const value = ethAmount
      console.log(args)
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Purchase Credits",
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
    [library, account, generalizedContractCall, addTransaction, poolData, vault]
  )
  return {
    onPurchaseCredits,
    isPending,
  }
}

export const useChangePayoutRatio = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()
  const poolData = useGetPoolData()

  const onChangePayoutRatio = useCallback(
    async (ratio: string, cb: () => void) => {
      const vaultContract = getContract(
        poolData.vaultAddress,
        VAULT_ABI,
        library,
        account
      )
      const method = vaultContract.adjustPayoutRatio
      const estimate = vaultContract.estimateGas.adjustPayoutRatio
      const args = [Number(ratio) * 10]
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Change Payout Ratio",
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
    onChangePayoutRatio,
    isPending,
  }
}
