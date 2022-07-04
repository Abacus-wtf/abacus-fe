import { useCallback, useEffect, useMemo, useState } from "react"
import { useActiveWeb3React, useMultiCall } from "@hooks/index"
import { formatEther } from "ethers/lib.esm/utils"

import { ABC_CREDIT_BONDS, ABC_EPOCH } from "@config/constants"
import { useOnBond } from "@hooks/bondFunc"

import { useGetCurrentNetwork } from "@state/application/hooks"

import { BigNumber } from "ethers"
import { map, range } from "lodash"
import ABC_BOND_ABI from "../../../../config/contracts/ABC_CREDIT_BONDS_ABI.json"
import EPOCH_VAULT_ABI from "../../../../config/contracts/ABC_EPOCH_ABI.json"

const useBondData = () => {
  const { account, library } = useActiveWeb3React()

  const { onBond, isPending: isPendingBond } = useOnBond()
  const [abcBonded, setAbcBonded] = useState(0)
  const bondContracts = useMultiCall(ABC_BOND_ABI)
  const epochVault = useMultiCall(EPOCH_VAULT_ABI)
  const [ethBalance, setEthBalance] = useState(null)
  const [epoch, setEpoch] = useState(0)
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

    // eslint-disable-next-line no-underscore-dangle
    const _currentEpoch = BigNumber.from(currentEpoch[0]).toNumber()
    setCurrentEpoch(_currentEpoch)
    setEpoch(_currentEpoch)
  }, [epochVault])

  const getBondedAmount = useCallback(async () => {
    if (account) {
      const [[userCredit]] = await Promise.all([
        bondContracts(ABC_CREDIT_BONDS, ["userCredit"], [[epoch, account]]),
      ])

      setAbcBonded(Number(formatEther(userCredit[0])))
    }
  }, [account, bondContracts, epoch])

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

  const epochs = useMemo(
    () => map(range(0, currentEpoch + 2), (i) => `#${i}`),
    [currentEpoch]
  )

  return {
    ethBalance,
    getBondedAmount,
    onBond,
    isPendingBond,
    abcBonded,
    account,
    currentEpoch,
    epoch,
    setEpoch,
    epochs,
  }
}

export { useBondData }
