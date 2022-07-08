import { useCallback, useState } from "react"
import { getContract } from "@config/utils"
import { ABC_FACTORY } from "@config/constants"
import { useActiveWeb3React, useGeneralizedContractCall } from "@hooks/index"
import { useTransactionAdder } from "@state/transactions/hooks"
import ERC_721_ABI from "../config/contracts/ERC_721_ABI.json"
import VAULT_ABI from "../config/contracts/ABC_VAULT_ABI.json"
import FACTORY_ABI from "../config/contracts/ABC_FACTORY_ABI.json"

export const useOnApproveNFT = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending, txError } =
    useGeneralizedContractCall()
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
    txError,
  }
}

export const useOnCreatePool = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending, txError } =
    useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onCreatePool = useCallback(
    async (vaultName: string, cb: () => void) => {
      const factoryContract = getContract(
        ABC_FACTORY,
        FACTORY_ABI,
        library,
        account
      )
      const method = factoryContract.initiateMultiAssetVault
      const estimate = factoryContract.estimateGas.initiateMultiAssetVault
      const args = [vaultName]
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
    txError,
  }
}

type IncludeNFTInput = {
  nfts: string[]
  tokenIds: number[]
  vaultAddress: string
}

export const useOnIncludeNFT = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending, txError } =
    useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()
  const [pendingFactory, setPendingFactory] = useState(false)

  const onIncludeNFT = useCallback(
    async (
      { nfts, tokenIds, vaultAddress }: IncludeNFTInput,
      cb: () => void
    ) => {
      const factoryContract = getContract(
        ABC_FACTORY,
        FACTORY_ABI,
        library,
        account
      )
      const vault = getContract(vaultAddress, VAULT_ABI, library, account)

      setPendingFactory(true)
      const compressedInput = await factoryContract.encodeCompressedValue(
        nfts,
        tokenIds
      )

      const method = vault.includeNft
      const estimate = vault.estimateGas.includeNft
      const args = [compressedInput]
      console.log(args)
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Include NFTs",
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
      setPendingFactory(false)
    },
    [library, account, generalizedContractCall, addTransaction]
  )
  return {
    onIncludeNFT,
    isPending: isPending || pendingFactory,
    txError,
  }
}

type RemoveNFTInput = {
  nftAddress: string
  tokenId: number
}

export const useOnRemoveNFT = (vaultAddress: string) => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending, txError } =
    useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onRemoveNFT = useCallback(
    async ({ nftAddress, tokenId }: RemoveNFTInput, cb: () => void) => {
      const vault = getContract(vaultAddress, VAULT_ABI, library, account)

      const method = vault.remove
      const estimate = vault.estimateGas.remove
      const args = [nftAddress, tokenId]
      console.log(args)
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Remove NFT",
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
    [vaultAddress, library, account, generalizedContractCall, addTransaction]
  )
  return {
    onRemoveNFT,
    isPending,
    txError,
  }
}

export const useOnBeginPool = () => {
  const { account, library } = useActiveWeb3React()
  const { generalizedContractCall, isPending } = useGeneralizedContractCall()
  const addTransaction = useTransactionAdder()

  const onBeginPool = useCallback(
    async (vaultAddress: string, slots: number, cb: () => void) => {
      const vaultContract = getContract(
        vaultAddress,
        VAULT_ABI,
        library,
        account
      )

      const method = vaultContract.begin
      const estimate = vaultContract.estimateGas.begin
      const args = [slots]
      const value = null
      const txnCb = async (response: any) => {
        addTransaction(response, {
          summary: "Begin Pool",
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
    onBeginPool,
    isPending,
  }
}
