import React from "react"
import {
  useGetTraderProfileData,
  useTraderProfile,
} from "@state/singlePoolData/hooks"
import styled from "styled-components"
import moment from "moment"
import _ from "lodash"
import Buttons from "@components/Button"
import { useUnlockPosition } from "@hooks/vaultFunc"
import { Stat, StatTitle, TicketContainer } from "./CurrentState.styles"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const CurrentPosition = () => {
  const { onUnlockPosition, isPending: isUnlockPending } = useUnlockPosition()
  const traderData = useTraderProfile()
  const getTraderProfileData = useGetTraderProfileData()

  if (!traderData) {
    return <div>Loading...</div>
  }
  console.log("tickets", Object.keys(traderData.ticketsOwned))
  return (
    <Container>
      <Stat title="Number of Tokens Locked:" value={traderData.tokensLocked} />
      <Stat title="Tickets Opened:" value={traderData.ticketsOpen} />
      <Stat title="Credits Purchased:" value={traderData.creditsPurchased} />
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
      {Number(traderData.timeUnlock) <= moment().unix() && (
        <Buttons
          style={{ marginTop: 20 }}
          onClick={() =>
            onUnlockPosition(Object.keys(traderData.ticketsOwned), () =>
              getTraderProfileData()
            )
          }
          disabled={isUnlockPending || Number(traderData.ticketsOpen) === 0}
        >
          Unlock Tickets
        </Buttons>
      )}
    </Container>
  )
}

export default CurrentPosition
