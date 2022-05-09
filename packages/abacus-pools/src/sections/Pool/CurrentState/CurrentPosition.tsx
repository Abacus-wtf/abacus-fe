import React, { useState } from "react"
import {
  useGetPoolData,
  useGetTraderProfileData,
  useTraderProfile,
} from "@state/singlePoolData/hooks"
import styled from "styled-components"
import moment from "moment"
import _ from "lodash"
import Buttons from "@components/Button"
import { usePurchaseCredits, useUnlockPosition } from "@hooks/vaultFunc"
import { NumericalInput } from "@components/Input"
import { formatEther } from "ethers/lib/utils"
import { Stat, StatTitle, TicketContainer } from "./CurrentState.styles"
import {
  InputContainer,
  BORDER,
  LabelRow,
  BalanceContainer,
  MaxButton,
} from "./AMM.styles"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const CurrentPosition = () => {
  const { onUnlockPosition, isPending: isUnlockPending } = useUnlockPosition()
  const traderData = useTraderProfile()
  const getTraderProfileData = useGetTraderProfileData()
  const poolData = useGetPoolData()
  const [inputAvailableCredits, setInputsAvailableCredits] = useState("")
  const { onPurchaseCredits, isPending: isPendingPurchaseCredits } =
    usePurchaseCredits()

  if (!traderData) {
    return <div>Loading...</div>
  }
  return (
    <Container>
      <Stat title="Number of Tokens Locked:" value={traderData.tokensLocked} />
      <Stat title="Tickets Opened:" value={traderData.ticketsOpen} />
      <Stat title="Credits Purchased:" value={traderData.creditsPurchased} />
      <Stat
        title="Current Payout Ratio:"
        value={`${traderData.creditPurchasePercentage}%`}
      />
      {Number(traderData.timeUnlock) !== 0 && (
        <Stat
          title="Unlock Time:"
          value={moment(Number(traderData.timeUnlock) * 1000).fromNow()}
        />
      )}
      <TicketContainer>
        {traderData.ticketsOwned &&
          _.map(Object.entries(traderData.ticketsOwned), ([ticket, amount]) => (
            <StatTitle>
              Ticket #{ticket}: <b>{amount}</b>
            </StatTitle>
          ))}
      </TicketContainer>
      {poolData.emissionsStarted &&
        Number(traderData.timeUnlock) > moment().unix() && (
          <>
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
                    placeholder="0.0"
                    value={inputAvailableCredits}
                    onChange={(e) => setInputsAvailableCredits(e.target.value)}
                  />
                  <MaxButton
                    onClick={() => {
                      setInputsAvailableCredits(
                        formatEther(poolData.creditsAvailable)
                      )
                    }}
                  >
                    MAX
                  </MaxButton>
                </BalanceContainer>
              </LabelRow>
            </InputContainer>
            <Buttons
              style={{ marginTop: 20, marginBottom: 20 }}
              onClick={() =>
                onPurchaseCredits(inputAvailableCredits, () =>
                  getTraderProfileData()
                )
              }
              disabled={
                isPendingPurchaseCredits || inputAvailableCredits === ""
              }
            >
              {isPendingPurchaseCredits
                ? "Loading..."
                : "Purchase Available Credits"}
            </Buttons>
          </>
        )}
      {Number(traderData.timeUnlock) <= moment().unix() * 1000 &&
        Number(traderData.tokensLocked) !== 0 && (
          <Buttons
            style={{ marginTop: 20 }}
            onClick={() => {
              console.log(Object.keys(traderData.ticketsOwned))
              onUnlockPosition(() => getTraderProfileData())
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
