import { useCallback } from "react"
import { getContract } from "@config/utils"
import { ABC_FACTORY } from "@config/constants"
import { useActiveWeb3React, useGeneralizedContractCall } from "@hooks/index"
import { useTransactionAdder } from "@state/transactions/hooks"
import ERC_721_ABI from "../config/contracts/ERC_721_ABI.json"
import FACTORY_ABI from "../config/contracts/ABC_FACTORY_ABI.json"

export const useOnApproveNFT = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onApproveNFT = useCallback(
    async (nftAddress: string, cb: () => void) => {
      const nftContract = getContract(nftAddress, ERC_721_ABI, library, account)
      const method = nftContract.setApprovalForAll
      const estimate = nftContract.estimateGas.setApprovalForAll
      const args = [ABC_FACTORY, true]
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Approve NFT Transfer",
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
    onApproveNFT,
    isPending,
  }
}

export const useOnCreatePool = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onCreatePool = useCallback(
    async (
      nftAddress: string,
      tokenId: string,
      poolName: string,
      poolSymbol: string,
      exitFeeStatic: string,
      exitFeePercentage: string,
      cb: () => void
    ) => {
      const factoryContract = getContract(
        ABC_FACTORY,
        FACTORY_ABI,
        library,
        account
      )
      const method = factoryContract.createVault
      const estimate = factoryContract.estimateGas.createVault
      const args = [
        `Owner of ${poolName}`,
        `o${poolSymbol}`,
        poolName,
        poolSymbol,
        nftAddress,
        tokenId,
        exitFeePercentage,
        exitFeeStatic,
      ]
      console.log(args)
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Create Spot Vault",
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
    onCreatePool,
    isPending,
  }
}
