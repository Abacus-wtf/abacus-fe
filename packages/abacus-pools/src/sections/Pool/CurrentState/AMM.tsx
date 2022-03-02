import React, { useEffect, useState, useCallback } from "react"
import Button from "@components/Button"
import { NumericalInput } from "@components/Input"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { web3 } from "@config/constants"
import { useGetCurrentNetwork } from "@state/application/hooks"
import { formatEther } from "ethers/lib/utils"
import { useActiveWeb3React } from "@hooks/index"
import DatePicker from "react-datepicker"
import moment from "moment"
import { useOnPurchaseTokens } from "@hooks/vaultFunc"
import styled from "styled-components"
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
import "react-datepicker/dist/react-datepicker.css"

const DatePickerStyled = styled(DatePicker)`
  padding: 10px 15px;
  width: 100%;
  margin: 0px 0px 15px 0px;
  border-radius: 10px;
  border: 0.5px solid rgb(196, 196, 196);
  font-weight: 400;
`

const AMM = () => {
  const { account } = useActiveWeb3React()
  const networkSymbol = useGetCurrentNetwork()
  const [isTokenFirst] = useState(false)
  const poolData = useGetPoolData()
  const [inputAmount, setInputAmount] = useState("")
  const [outputAmount, setOutputAmount] = useState("0.0")
  const [ethBalance, setEthBalance] = useState<number | null>(null)
  const [startDate, setStartDate] = useState(new Date())
  const { onPurchaseTokens, isPending } = useOnPurchaseTokens()

  const getBalance = useCallback(async () => {
    const provider = web3(networkSymbol)
    const balance = await provider.eth.getBalance(account)
    setEthBalance(parseFloat(formatEther(balance)))
  }, [account, networkSymbol])

  useEffect(() => {
    if (ethBalance === null) {
      getBalance()
    }
  }, [account, ethBalance, networkSymbol, getBalance])

  const handleButtonClick = async () => {
    await onPurchaseTokens(
      outputAmount,
      moment(startDate).unix() - moment().unix(),
      async () => {
        await getBalance()
        setInputAmount("")
      }
    )
  }

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
      <DatePickerStyled
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
      />
      <Button
        style={{ width: "100%", padding: 20, fontSize: "1rem" }}
        onClick={handleButtonClick}
        disabled={
          isPending ||
          moment(startDate).unix() <= moment().add(7, "days").unix() ||
          Number.isNaN(Number(inputAmount)) ||
          Number(inputAmount) === 0 ||
          (isTokenFirst && Number(inputAmount) > Number(poolData.balance)) ||
          (!isTokenFirst && Number(inputAmount) > Number(ethBalance))
        }
      >
        {isPending ? "Loading..." : "Purchase Tokens"}
      </Button>
    </CardContainer>
  )
  return cardData
}

export default AMM
