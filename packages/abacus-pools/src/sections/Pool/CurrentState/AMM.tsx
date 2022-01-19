import React, { useState } from "react"
import Button from "@components/Button"
import { NumericalInput } from "@components/Input"
import { useGetPoolData } from "@state/singlePoolData/hooks"
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
  const [isTokenFirst, setIsTokenFirst] = useState(true)
  const poolData = useGetPoolData()
  const [inputAmount, setInputAmount] = useState("")
  const [outputAmount, setOutputAmount] = useState("0.0")
  const [typingTimeout, setTypingTimeout] = useState<any>(null)

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
              <TinyTitles>Balance: 10</TinyTitles>
            </BalanceContainer>
          </LabelRow>
          <LabelRow>
            <BalanceContainer>
              <NumericalInput
                placeholder="0.0"
                value={inputAmount}
                onChange={(e) => {
                  if (typingTimeout) {
                    clearTimeout(typingTimeout)
                  }
                  setTypingTimeout(
                    setTimeout(
                      async (input) => {
                        console.log(input)
                        // getOutputData(input)
                        setTypingTimeout(null)
                      },
                      800,
                      e.target.value
                    )
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
                  setInputAmount("3")
                  setOutputAmount("5")
                  // getOutputData(3)
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
              <TinyTitles>Balance: 10</TinyTitles>
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
      >
        Exchange
      </Button>
    </CardContainer>
  )
  return cardData
}

export default AMM
