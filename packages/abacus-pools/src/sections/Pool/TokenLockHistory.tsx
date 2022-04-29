import { TokenLockHistoryChart } from "@components/TokenLockHistoryChart"
import {
  useGetPoolData,
  useTokenLockHistory,
} from "@state/singlePoolData/hooks"
import { Section } from "abacus-ui"
import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { SectionHeader, SectionTitle } from "./Pool.styled"

const CurrentContainer = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: bold;
`

const CurrentCurrency = styled.div`
  color: #76808f;
  margin-left: 4px;
`

const TokenLockHistory: FunctionComponent = () => {
  const { tokenPrice, tokensLocked } = useGetPoolData()
  const data = useTokenLockHistory()
  const tokensLockedEth = (
    Number(tokensLocked) * Number(tokenPrice)
  ).toLocaleString("en-US", {
    maximumSignificantDigits: 5,
    minimumSignificantDigits: 2,
  })

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Token Lock History</SectionTitle>
        <CurrentContainer>
          Current: {tokensLockedEth} <CurrentCurrency>ETH</CurrentCurrency>
        </CurrentContainer>
      </SectionHeader>
      <TokenLockHistoryChart data={data} />
    </Section>
  )
}

export default TokenLockHistory
