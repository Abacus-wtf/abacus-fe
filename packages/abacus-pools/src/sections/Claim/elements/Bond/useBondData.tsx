import { useCallback, useEffect, useMemo, useState } from "react"
import { useActiveWeb3React, useMultiCall } from "@hooks/index"
import { formatEther } from "ethers/lib/utils"

import { ABC_CREDIT_BONDS, ABC_EPOCH, ABC_TOKEN } from "@config/constants"
import { useOnAddABCCredit, useOnBond } from "@hooks/bondFunc"

import { useGetCurrentNetwork } from "@state/application/hooks"

import { BigNumber } from "ethers"
import { map, range } from "lodash"
import ABC_BOND_ABI from "../../../../config/contracts/ABC_CREDIT_BONDS_ABI.json"
import ERC_721_ABI from "../../../../config/contracts/ERC_721_ABI.json"
import EPOCH_VAULT_ABI from "../../../../config/contracts/ABC_EPOCH_ABI.json"

interface CreditData {
  creditStored: string
  bondedAmount: string
  abcOwned: string
}

const useBondData = () => {
  const { account, library } = useActiveWeb3React()
  const [userData, setUserData] = useState<CreditData | null>(null)

  const [creditAmount, setCreditAmount] = useState("")
  const { onBond, isPending: isPendingBond } = useOnBond()
  const { onAddABCCredit, isPending: isPendingABCCredit } = useOnAddABCCredit()
  const bondContracts = useMultiCall(ABC_BOND_ABI)
  const epochVault = useMultiCall(EPOCH_VAULT_ABI)
  const erc721 = useMultiCall(ERC_721_ABI)
  const [ethBalance, setEthBalance] = useState(null)
  const [epoch, setEpoch] = useState(0)
  const [currentEpoch, setCurrentEpoch] = useState(0)
  const networkSymbol = useGetCurrentNetwork()

  const getBalance = useCallback(async () => {
    const balance = await library.getBalance(account)
    setEthBalance(parseFloat(formatEther(balance)))
  }, [account, library])

  const getCreditData = useCallback(async () => {
    const [[currentEpoch]] = await Promise.all([
      epochVault(ABC_EPOCH, ["getCurrentEpoch"], [[]]),
    ])

    const [[creditStored], [balance]] = await Promise.all([
      bondContracts(
        ABC_CREDIT_BONDS,
        ["userCredit"],
        [[currentEpoch[0], account]]
      ),
      erc721(ABC_TOKEN, ["balanceOf"], [[account]]),
    ])

    setUserData({
      creditStored: formatEther(creditStored[0]),
      abcOwned: formatEther(balance[0]),
      bondedAmount: "0",
    })
    setEpoch(BigNumber.from(currentEpoch[0]).toNumber())
    setCurrentEpoch(BigNumber.from(currentEpoch[0]).toNumber())
  }, [account, bondContracts, epochVault, erc721])

  const getBondedAmount = useCallback(async () => {
    const [[bondedAmount]] = await Promise.all([
      bondContracts(ABC_CREDIT_BONDS, ["userCredit"], [[epoch, account]]),
    ])

    setUserData({
      creditStored: userData.creditStored,
      abcOwned: userData.abcOwned,
      bondedAmount: formatEther(bondedAmount[0]),
    })
  }, [account, bondContracts, userData, epoch])

  useEffect(() => {
    if (ethBalance === null && account) {
      getBalance()
    }
  }, [account, ethBalance, networkSymbol, getBalance, getBondedAmount])

  useEffect(() => {
    if (userData !== null) {
      getBondedAmount()
    }
  }, [epoch, getBondedAmount, userData])

  useEffect(() => {
    if (account) {
      try {
        getCreditData()
      } catch (e) {
        console.error(e)
      }
    }
  }, [account, bondContracts, getCreditData])

  const epochs = useMemo(
    () => map(range(0, currentEpoch + 10), (i) => `#${i}`),
    [currentEpoch]
  )

  return {
    epoch,
    setEpoch,
    epochs,
    ethBalance,
    getCreditData,
    onBond,
    isPendingBond,
    userData,
  }
}

export { useBondData }
