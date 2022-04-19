/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState, useCallback } from "react"
import Button from "@components/Button"
import { NumericalInput } from "@components/Input"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { NetworkSymbolEnum, TICKET_SIZE, web3 } from "@config/constants"
import { useGetCurrentNetwork } from "@state/application/hooks"
import { formatEther } from "ethers/lib/utils"
import { useActiveWeb3React } from "@hooks/index"
import DatePicker from "react-datepicker"
import moment from "moment"
import {
  useOnPurchaseIndividualTicket,
  useOnPurchaseTokens,
} from "@hooks/vaultFunc"
import styled from "styled-components"
import { SubgraphTicket } from "@state/singlePoolData/queries"
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
import { StateComponent } from "./index"

export const DatePickerStyled = styled(DatePicker)`
  padding: 10px 15px;
  width: 100%;
  margin: 0px 0px 15px 0px;
  border-radius: 10px;
  border: 0.5px solid rgb(196, 196, 196);
  font-weight: 400;
`

interface AMMProps extends StateComponent {
  currentTicket?: SubgraphTicket
}

const AMM = (props: AMMProps) => {
  const { account } = useActiveWeb3React()
  const networkSymbol = useGetCurrentNetwork()
  const [isTokenFirst] = useState(false)
  const poolData = useGetPoolData()
  const [inputAmount, setInputAmount] = useState("")
  const [outputAmount, setOutputAmount] = useState("0.0")
  const [ethBalance, setEthBalance] = useState<number | null>(null)
  const [startDate, setStartDate] = useState(new Date())
  const { onPurchaseTokens, isPending } = useOnPurchaseTokens()
  const { onPurchaseIndividualTicket, isPending: isPendingIndividual } =
    useOnPurchaseIndividualTicket()

  const getBalance = useCallback(async () => {
    if (
      networkSymbol !== NetworkSymbolEnum.NONE &&
      account !== null &&
      account !== undefined
    ) {
      const provider = web3(networkSymbol)
      const balance = await provider.eth.getBalance(account)
      setEthBalance(parseFloat(formatEther(balance)))
    }
  }, [account, networkSymbol])

  useEffect(() => {
    if (ethBalance === null) {
      getBalance()
    }
  }, [account, ethBalance, networkSymbol])

  const handleButtonClick = async () => {
    if (props.currentTicket) {
      await onPurchaseIndividualTicket(
        outputAmount,
        props.currentTicket.ticketNumber,
        moment(startDate).unix() - moment().unix(),
        async () => {
          await getBalance()
          await props.refresh()
          setInputAmount("")
        }
      )
    } else {
      await onPurchaseTokens(
        outputAmount,
        moment(startDate).unix() - moment().unix(),
        async () => {
          await getBalance()
          await props.refresh()
          setInputAmount("")
        }
      )
    }
  }

  return (
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
              <TinyTitles>Balance: {ethBalance}</TinyTitles>
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
                      : `${Math.round(
                          Number(e.target.value) / Number(poolData.tokenPrice)
                        )}`
                  )
                  setInputAmount(e.target.value)
                }}
              />
              <MaxButton
                onClick={() => {
                  setInputAmount(`${ethBalance}`)
                  setOutputAmount(
                    `${Number(ethBalance) / Number(poolData.tokenPrice)}`
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
        showTimeSelect
        timeIntervals={5}
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
      />
      <Button
        style={{ width: "100%", padding: 20, fontSize: "1rem" }}
        onClick={handleButtonClick}
        disabled={
          isPending ||
          isPendingIndividual ||
          (props.currentTicket &&
            Number(outputAmount) >
              TICKET_SIZE - props.currentTicket.tokenPurchasesLength) ||
          Number.isNaN(Number(inputAmount)) ||
          Number(inputAmount) === 0
        }
      >
        {isPending ? "Loading..." : "Purchase Tokens"}
      </Button>
    </CardContainer>
  )
}

export default AMM
