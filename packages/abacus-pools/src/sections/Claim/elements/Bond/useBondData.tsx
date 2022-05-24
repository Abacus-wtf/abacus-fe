import { useCallback, useEffect, useState } from "react"
import { useActiveWeb3React, useMultiCall } from "@hooks/index"
import { formatEther } from "ethers/lib.esm/utils"

import { ABC_CREDIT_BONDS, ABC_EPOCH } from "@config/constants"
import { useOnBond } from "@hooks/bondFunc"

import { useGetCurrentNetwork } from "@state/application/hooks"

import { BigNumber } from "ethers"
import ABC_BOND_ABI from "../../../../config/contracts/ABC_CREDIT_BONDS_ABI.json"
import EPOCH_VAULT_ABI from "../../../../config/contracts/ABC_EPOCH_ABI.json"

const useBondData = () => {
  const { account, library } = useActiveWeb3React()

  const { onBond, isPending: isPendingBond } = useOnBond()
  const [abcBonded, setAbcBonded] = useState(0)
  const bondContracts = useMultiCall(ABC_BOND_ABI)
  const epochVault = useMultiCall(EPOCH_VAULT_ABI)
  const [ethBalance, setEthBalance] = useState(null)
  const [currentEpoch, setCurrentEpoch] = useState(0)
  const networkSymbol = useGetCurrentNetwork()

  const getBalance = useCallback(async () => {
    const balance = await library.getBalance(account)
    setEthBalance(parseFloat(formatEther(balance)))
  }, [account, library])

  const getCurrentEpoch = useCallback(async () => {
    const [[currentEpoch]] = await Promise.all([
      epochVault(ABC_EPOCH, ["getCurrentEpoch"], [[]]),
    ])

    setCurrentEpoch(BigNumber.from(currentEpoch[0]).toNumber())
  }, [epochVault])

  const getBondedAmount = useCallback(async () => {
    if (account) {
      const [[userCredit]] = await Promise.all([
        bondContracts(
          ABC_CREDIT_BONDS,
          ["userCredit"],
          [[currentEpoch + 1, account]]
        ),
      ])

      setAbcBonded(Number(formatEther(userCredit[0])))
    }
  }, [account, bondContracts, currentEpoch])

  useEffect(() => {
    if (ethBalance === null && account) {
      getBalance()
    }
  }, [account, ethBalance, networkSymbol, getBalance, getBondedAmount])

  useEffect(() => {
    getBondedAmount()
  }, [currentEpoch, getBondedAmount])

  useEffect(() => {
    if (account) {
      try {
        getCurrentEpoch()
      } catch (e) {
        console.error(e)
      }
    }
  }, [account, getCurrentEpoch])

  return {
    ethBalance,
    getBondedAmount,
    onBond,
    isPendingBond,
    abcBonded,
    account,
    currentEpoch,
  }
}

export { useBondData }
