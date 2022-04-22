import React, { useCallback, useEffect, useState } from "react"
import { UniversalContainer } from "@components/global.styles"
import { useActiveWeb3React, useMultiCall } from "@hooks/index"
import { formatEther } from "ethers/lib/utils"
import { Stat } from "@sections/Pool/CurrentState/CurrentState.styles"
import { ABC_CREDIT_BONDS, ABC_TOKEN } from "@config/constants"
import { useOnAddABCCredit, useOnBond } from "@hooks/bondFunc"
import { InputWithTitleAndButton } from "@components/Input"
import {
  InfoSectionContainer,
  InputContainer,
  BORDER,
} from "@sections/Pool/CurrentState/AMM.styles"
import { useGetCurrentNetwork } from "@state/application/hooks"
import Buttons from "@components/Button"
import { Card } from "@sections/Ve"
import ABC_BOND_ABI from "../../config/contracts/ABC_CREDIT_BONDS_ABI.json"
import ERC_721_ABI from "../../config/contracts/ERC_721_ABI.json"

interface CreditData {
  creditStored: string
  abcOwned: string
}

const Bond: React.FC = () => {
  const { account, library } = useActiveWeb3React()
  const [userData, setUserData] = useState<CreditData | null>(null)
  const [bondAmount, setBondAmount] = useState("")
  const [creditAmount, setCreditAmount] = useState("")
  const { onBond, isPending: isPendingBond } = useOnBond()
  const { onAddABCCredit, isPending: isPendingABCCredit } = useOnAddABCCredit()
  const bondContracts = useMultiCall(ABC_BOND_ABI)
  const erc721 = useMultiCall(ERC_721_ABI)
  const [ethBalance, setEthBalance] = useState(null)
  const networkSymbol = useGetCurrentNetwork()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getBalance = async () => {
    const balance = await library.getBalance(account)
    setEthBalance(parseFloat(formatEther(balance)))
  }

  const getCreditData = useCallback(async () => {
    const [[creditStored], [balance]] = await Promise.all([
      bondContracts(ABC_CREDIT_BONDS, ["abcCreditStored"], [[account]]),
      erc721(ABC_TOKEN, ["balanceOf"], [[account]]),
    ])

    setUserData({
      creditStored: formatEther(creditStored[0]),
      abcOwned: formatEther(balance[0]),
    })
  }, [account, bondContracts, erc721])

  useEffect(() => {
    if (ethBalance === null && account) {
      getBalance()
    }
  }, [account, ethBalance, networkSymbol, getBalance])

  useEffect(() => {
    if (account) {
      try {
        getCreditData()
      } catch (e) {
        console.error(e)
      }
    }
  }, [account, bondContracts, getCreditData])

  if (userData === null) {
    return (
      <UniversalContainer style={{ textAlign: "center" }}>
        Loading...
      </UniversalContainer>
    )
  }

  return (
    <UniversalContainer style={{ gridGap: 30, alignItems: "center" }}>
      <Stat title="ABC Credit Stored:" value={userData.creditStored} />
      <div style={{ display: "flex", gridGap: 30, width: "100%" }}>
        <Card style={{ width: "100%" }}>
          <InfoSectionContainer>
            <InputContainer
              style={{
                border: BORDER,
                borderRadius: 15,
              }}
            >
              <InputWithTitleAndButton
                title="Bond Amount"
                placeholder="0"
                type="number"
                name="bondAmount"
                value={bondAmount}
                onChange={(e) => setBondAmount(e.target.value)}
                disabled={!account}
                buttonText="Max"
                onClick={() => setBondAmount(ethBalance)}
                id="bondAmount"
              />
            </InputContainer>
          </InfoSectionContainer>
          <Buttons
            disabled={!bondAmount || isPendingBond}
            onClick={() => onBond(bondAmount, () => getCreditData())}
          >
            {isPendingBond ? "Loading..." : "Bond"}
          </Buttons>
        </Card>
        <Card style={{ width: "100%" }}>
          <InfoSectionContainer>
            <InputContainer
              style={{
                border: BORDER,
                borderRadius: 15,
              }}
            >
              <InputWithTitleAndButton
                title="Credit Amount"
                placeholder="0"
                type="number"
                name="creditAmount"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                disabled={!account}
                buttonText="Max"
                onClick={() => setCreditAmount(userData.abcOwned)}
                id="creditAmount"
              />
            </InputContainer>
          </InfoSectionContainer>
          <Buttons
            disabled={!creditAmount || isPendingABCCredit}
            onClick={() => onAddABCCredit(creditAmount, () => getCreditData())}
          >
            {isPendingABCCredit ? "Loading..." : "Add Credit"}
          </Buttons>
        </Card>
      </div>
    </UniversalContainer>
  )
}

export default Bond
