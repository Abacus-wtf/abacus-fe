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
import { BigNumber } from "ethers"
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
        poolData.address,
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
    async (tokens: string[], cb: () => void) => {
      const vaultContract = getContract(
        poolData.vaultAddress,
        VAULT_ABI,
        library,
        account
      )
      let max = 0
      for (let i = 0; i < tokens.length; i += 1) {
        if (max < Number(tokens[i])) {
          max = Number(tokens[i])
        }
      }
      let min = 0
      while (min <= max) {
        const method = vaultContract.sellToken
        const estimate = vaultContract.estimateGas.sellToken
        const args = [account, min]
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
        min += 100
      }
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

      let runningTokenAmount = Number(tokenAmount)
      const ticketArray = []
      const purchaseAmount = []
      let cycle = 0
      while (runningTokenAmount !== 0) {
        const range = _.range(cycle * 20, cycle * 20 + 20)
        const methods = _.map(range, () => "ticketsPurchased")
        const args = _.map(range, (i) => [parseEther(`${i}`)])
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
            ticketArray.push(parseEther(`${i}`).toString())
            purchaseAmount.push(parseEther(`${spaceLeft}`).toString())
          }
        }
        cycle += 1
      }

      const method = vaultContract.purchaseMulti
      const estimate = vaultContract.estimateGas.purchaseMulti
      const args = [
        account,
        account,
        parseEther(`${Number(tokenAmount) * Number(poolData.tokenPrice)}`)
          .mul(BigNumber.from(10125))
          .div(BigNumber.from(10000))
          .div(BigNumber.from(10000))
          .mul(BigNumber.from(10000))
          .toString(),
        ticketArray,
        purchaseAmount,
        lockupPeriod,
      ]
      console.log(args)
      const value = null
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
        parseEther(`${(Number(tokenAmount) * 1.0125) / 1000}`).toString(),
        parseEther(`${ticket}`).toString(),
        parseEther(tokenAmount).toString(),
        lockupPeriod,
      ]
      console.log(args)
      const value = null
      // console.log(value.toString())
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
        parseEther(`${(TICKET_SIZE * 1.0125) / 1000}`).add(
          parseEther(`${reward}`)
        ),
        ticket,
        lockupPeriod,
        parseEther(`${reward}`),
      ]
      console.log(args)
      const value = null
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

export const useOnSellToken = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()
  const poolData = useGetPoolData()

  const onSellToken = useCallback(
    async (user: string, startingTicket: number, cb: () => void) => {
      const vaultContract = getContract(
        poolData.vaultAddress,
        VAULT_ABI,
        library,
        account
      )

      const method = vaultContract.sellToken
      const estimate = vaultContract.estimateGas.sellToken
      const args = [user, startingTicket]
      console.log(args)
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Sell Token",
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
    onSellToken,
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
      const args = [ethAmount, parseEther(amount)]
      const value = null
      console.log(args)
      console.log(ethAmount)
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
