import { ABC_BRIBE_FACTORY } from "@config/constants"
import { getContract } from "@config/utils"
import { useTransactionAdder } from "@state/transactions/hooks"
import { useCallback } from "react"
import { useActiveWeb3React, useGeneralizedContractCall } from "."
import EPOCH_VAULT_ABI from "../config/contracts/ABC_EPOCH_ABI.json"

export const useClaimABCReward = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onClaimABCReward = useCallback(
    async (epoch: number, cb: () => void) => {
      const epochVault = getContract(
        ABC_BRIBE_FACTORY,
        EPOCH_VAULT_ABI,
        library,
        account
      )
      const method = epochVault.claimAbcReward
      const estimate = epochVault.estimateGas.claimAbcReward
      const args = [account, epoch]
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Claim ABC Reward",
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
    onClaimABCReward,
    isPending,
  }
}
