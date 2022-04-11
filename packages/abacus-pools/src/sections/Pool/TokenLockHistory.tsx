import { useGetPoolData } from "@state/singlePoolData/hooks"
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
  const tokensLockedEth = Number(tokensLocked) * Number(tokenPrice)
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Token Lock History</SectionTitle>
        <CurrentContainer>
          Current: {tokensLockedEth} <CurrentCurrency>ETH</CurrentCurrency>
        </CurrentContainer>
      </SectionHeader>
      <div style={{ height: "240px" }} />
    </Section>
  )
}

export default TokenLockHistory
