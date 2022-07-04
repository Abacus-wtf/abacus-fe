import { useActiveWeb3React } from "@hooks/index"
import { useOnSellTokens } from "@hooks/vaultFunc"
import { Button, P, Range } from "abacus-ui"
import React, { useState } from "react"
import styled from "styled-components"

type SellablePositionProps = {
  amount: number
  startEpoch: number
  finalEpoch: number
  nonce: number
  onSellTokens: ReturnType<typeof useOnSellTokens>["onSellTokens"]
  refreshPoolData: () => void
}

const Container = styled.div`
  display: flex;
  border-radius: ${({ theme }) => theme.borderRadius.section};
  box-shadow: ${({ theme }) => theme.boxShadow.section};
  border-color: ${({ theme }) => theme.colors.utility.blue};
  padding: 16px;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
`

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const SellablePosition = ({
  amount,
  startEpoch,
  finalEpoch,
  nonce,
  onSellTokens,
  refreshPoolData,
}: SellablePositionProps) => {
  const [payoutRatio, setPayoutRatio] = useState(100)
  const { account } = useActiveWeb3React()
  const onClick = async () => {
    await onSellTokens(account, nonce, payoutRatio, () => {
      refreshPoolData()
    })
  }
  const ID = `sellable_position_range_${nonce}`
  return (
    <Container>
      <InfoContainer>
        <P>
          <b>{amount} tokens</b> - locked from Epoch #{startEpoch} to #
          {finalEpoch}
        </P>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor={ID}>
          Payout Ratio
          <Range
            id={ID}
            value={payoutRatio}
            setValue={setPayoutRatio}
            outputFormatter={(value) => `${value}%`}
            min={0}
            max={100}
            step={0.5}
          />
        </label>
      </InfoContainer>
      <Button onClick={onClick}>Sell Tokens</Button>
    </Container>
  )
}

export { SellablePosition }
