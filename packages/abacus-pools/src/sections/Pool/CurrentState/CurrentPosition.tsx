import React, { useState } from "react"
import {
  useGetTraderProfileData,
  useTraderProfile,
} from "@state/singlePoolData/hooks"
import styled from "styled-components"
import moment from "moment"
import _ from "lodash"
import Buttons from "@components/Button"
import { useChangePayoutRatio, useUnlockPosition } from "@hooks/vaultFunc"
import { NumericalInput } from "@components/Input"
import { Stat, StatTitle, TicketContainer } from "./CurrentState.styles"
import {
  InputContainer,
  BORDER,
  LabelRow,
  BalanceContainer,
} from "./AMM.styles"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const CurrentPosition = () => {
  const { onUnlockPosition, isPending: isUnlockPending } = useUnlockPosition()
  const traderData = useTraderProfile()
  const getTraderProfileData = useGetTraderProfileData()
  const [payoutRatioInput, setPayoutRatio] = useState("")
  const { onChangePayoutRatio, isPending: isPendingPayoutRatio } =
    useChangePayoutRatio()

  if (!traderData) {
    return <div>Loading...</div>
  }
  console.log("ticketsopened", traderData.ticketsOwned)
  return (
    <Container>
      <Stat title="Number of Tokens Locked:" value={traderData.tokensLocked} />
      <Stat title="Tickets Opened:" value={traderData.ticketsOpen} />
      <Stat title="Credits Purchased:" value={traderData.creditsPurchased} />
      <Stat
        title="Current Payout Ratio:"
        value={`${traderData.creditPurchasePercentage}%`}
      />
      <Stat
        title="Unlock Time:"
        value={moment(traderData.timeUnlock * 1000).fromNow()}
      />
      <TicketContainer>
        {traderData.ticketsOwned &&
          _.map(Object.entries(traderData.ticketsOwned), ([ticket, amount]) => (
            <StatTitle>
              Ticket #{ticket}: <b>{amount}</b>
            </StatTitle>
          ))}
      </TicketContainer>
      <InputContainer
        style={{
          border: BORDER,
          borderRadius: 15,
          marginTop: 20,
        }}
      >
        <LabelRow>
          <BalanceContainer>
            <NumericalInput
              placeholder="10"
              value={payoutRatioInput}
              onChange={(e) => setPayoutRatio(e.target.value)}
            />
          </BalanceContainer>
        </LabelRow>
      </InputContainer>
      <Buttons
        style={{ marginTop: 20, marginBottom: 20 }}
        onClick={() =>
          onChangePayoutRatio(payoutRatioInput, () => getTraderProfileData())
        }
        disabled={
          isPendingPayoutRatio ||
          payoutRatioInput === "" ||
          Number(payoutRatioInput) > 100
        }
      >
        {isPendingPayoutRatio ? "Loading..." : "Adjust Payout Ratio"}
      </Buttons>
      {Number(traderData.timeUnlock) <= moment().unix() &&
        Number(traderData.tokensLocked) !== 0 && (
          <Buttons
            style={{ marginTop: 20 }}
            onClick={() => {
              console.log(Object.keys(traderData.ticketsOwned))
              onUnlockPosition(Object.keys(traderData.ticketsOwned), () =>
                getTraderProfileData()
              )
            }}
            disabled={isUnlockPending}
          >
            {isUnlockPending ? "Loading..." : "Unlock Tickets"}
          </Buttons>
        )}
    </Container>
  )
}

export default CurrentPosition
