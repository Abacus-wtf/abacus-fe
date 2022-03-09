import React, { useEffect } from "react"
import { useActiveWeb3React } from "@hooks/index"
import {
  useGetPoolData,
  useGetTraderProfileData,
  useTraderProfile,
} from "@state/singlePoolData/hooks"
import styled from "styled-components"
import moment from "moment"
import _ from "lodash"
import Buttons from "@components/Button"
import { useUnlockPosition } from "@hooks/vaultFunc"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const StatTitle = styled.div`
  font-weight: 400;
  font-size: 20px;
  padding: 10px 0px;
`

const TicketContainer = styled.div`
  max-height: 200px;
  overflow: scroll;
`

const StatContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  border-bottom: 0.5px solid rgb(196, 196, 196);
`

const CurrentPosition = () => {
  const { account } = useActiveWeb3React()
  const getTraderProfileData = useGetTraderProfileData()
  const traderData = useTraderProfile()
  const poolData = useGetPoolData()
  const { onUnlockPosition, isPending: isUnlockPending } = useUnlockPosition()

  useEffect(() => {
    getTraderProfileData()
  }, [account, getTraderProfileData, poolData])

  if (!traderData) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <StatContainer>
        <StatTitle>Number of Tokens Locked:</StatTitle>
        <StatTitle>
          <b>{traderData.tokensLocked}</b>
        </StatTitle>
      </StatContainer>
      <StatContainer>
        <StatTitle>Tickets Opened:</StatTitle>
        <StatTitle>
          <b>{traderData.ticketsOpen}</b>
        </StatTitle>
      </StatContainer>
      <StatContainer>
        <StatTitle>Credits Available on Unlock:</StatTitle>
        <StatTitle>
          <b>{traderData.finalCreditCount}</b>
        </StatTitle>
      </StatContainer>
      <StatContainer>
        <StatTitle>Credits Purchased:</StatTitle>
        <StatTitle>
          <b>{traderData.creditsPurchased}</b>
        </StatTitle>
      </StatContainer>
      <StatContainer>
        <StatTitle>Unlock Time:</StatTitle>
        <StatTitle style={{ textAlign: "right" }}>
          <b>{moment().add(traderData.timeUnlock).fromNow()}</b>
        </StatTitle>
      </StatContainer>
      <TicketContainer>
        {traderData.ticketsOwned &&
          _.map(Object.entries(traderData.ticketsOwned), ([ticket, amount]) => (
            <StatTitle>
              Ticket #{ticket}: <b>{amount}</b>
            </StatTitle>
          ))}
      </TicketContainer>
      {traderData.timeUnlock <= 0 && (
        <Buttons
          onClick={() =>
            onUnlockPosition(Object.keys(traderData.ticketsOwned), () =>
              getTraderProfileData()
            )
          }
          disabled={isUnlockPending}
        >
          Unlock Tickets
        </Buttons>
      )}
    </Container>
  )
}

export default CurrentPosition
