import React, { useEffect, useState } from "react"
import Button from "@components/Button"
import { NumericalInput } from "@components/Input"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { web3 } from "@config/constants"
import { useGetCurrentNetwork } from "@state/application/hooks"
import { formatEther } from "ethers/lib/utils"
import { useActiveWeb3React } from "@hooks/index"
import {
  InfoSectionContainer,
  InputContainer,
  BORDER,
  LabelRow,
  BalanceContainer,
  TinyTitles,
  MaxButton,
  CardContainer,
} from "./AMM.styles"

const AMM = () => {
  const { account } = useActiveWeb3React()
  const networkSymbol = useGetCurrentNetwork()
  const [isTokenFirst, setIsTokenFirst] = useState(false)
  const poolData = useGetPoolData()
  const [inputAmount, setInputAmount] = useState("")
  const [outputAmount, setOutputAmount] = useState("0.0")
  const [ethBalance, setEthBalance] = useState<number | null>(null)

  useEffect(() => {
    const getBalance = async () => {
      const provider = web3(networkSymbol)
      const balance = await provider.eth.getBalance(account)
      setEthBalance(parseFloat(formatEther(balance)))
    }
    if (ethBalance === null) {
      getBalance()
    }
  }, [account, ethBalance, networkSymbol])

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleButtonClick = async () => {}

  const cardData = (
    <CardContainer style={{ padding: 0 }}>
      <InfoSectionContainer>
        <InputContainer
          style={{
            border: BORDER,
            borderRadius: 15,
          }}
        >
          <LabelRow>
            <BalanceContainer>
              <TinyTitles>
                From: {isTokenFirst ? poolData.symbol : "ETH"}
              </TinyTitles>
              <TinyTitles>
                Balance: {isTokenFirst ? poolData.balance : ethBalance}
              </TinyTitles>
            </BalanceContainer>
          </LabelRow>
          <LabelRow>
            <BalanceContainer>
              <NumericalInput
                placeholder="0.0"
                value={inputAmount}
                onChange={(e) => {
                  setOutputAmount(
                    isTokenFirst
                      ? `${
                          Number(e.target.value) * Number(poolData.tokenPrice)
                        }`
                      : `${
                          Number(e.target.value) / Number(poolData.tokenPrice)
                        }`
                  )
                  setInputAmount(e.target.value)
                }}
              />
              <MaxButton
                style={{ marginRight: 8 }}
                onClick={() => {
                  setIsTokenFirst(!isTokenFirst)
                }}
              >
                SWITCH
              </MaxButton>
              <MaxButton
                onClick={() => {
                  setInputAmount(
                    isTokenFirst ? `${poolData.balance}` : `${ethBalance}`
                  )
                  setOutputAmount(
                    isTokenFirst
                      ? `${
                          Number(poolData.balance) * Number(poolData.tokenPrice)
                        }`
                      : `${Number(ethBalance) / Number(poolData.tokenPrice)}`
                  )
                }}
              >
                MAX
              </MaxButton>
            </BalanceContainer>
          </LabelRow>
        </InputContainer>
        <InputContainer
          style={{
            border: BORDER,
            borderRadius: 15,
          }}
        >
          <LabelRow>
            <BalanceContainer>
              <TinyTitles>
                To: {isTokenFirst ? "ETH" : poolData.symbol}
              </TinyTitles>
              <TinyTitles>
                Balance: {isTokenFirst ? ethBalance : poolData.balance}
              </TinyTitles>
            </BalanceContainer>
          </LabelRow>
          <LabelRow>
            <BalanceContainer>
              <NumericalInput disabled value={outputAmount} />
            </BalanceContainer>
          </LabelRow>
        </InputContainer>
      </InfoSectionContainer>
      <Button
        style={{ width: "100%", padding: 20, fontSize: "1rem" }}
        onClick={handleButtonClick}
        disabled={
          (isTokenFirst && Number(inputAmount) > Number(poolData.balance)) ||
          (!isTokenFirst && Number(inputAmount) > Number(ethBalance))
        }
      >
        Exchange
      </Button>
    </CardContainer>
  )
  return cardData
}

export default AMM
