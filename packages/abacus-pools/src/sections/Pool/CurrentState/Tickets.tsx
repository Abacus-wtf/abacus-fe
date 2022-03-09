import React, { useEffect } from "react"
import { useActiveWeb3React } from "@hooks/index"
import {
  useGetPoolData,
  useGetTickets,
  useTickets,
} from "@state/singlePoolData/hooks"
import styled from "styled-components"
import _ from "lodash"
import { Ticket as TicketProps } from "@state/singlePoolData/reducer"
import { ButtonsWhite } from "@components/Button"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 350px;
`

const Button = styled(ButtonsWhite)`
  width: 100%;
`

const Ticket = ({ order, amount }: TicketProps) => (
  <Button style={{ borderRadius: 8 }}>
    #{order}. {3000 - amount} space available
  </Button>
)

const Tickets = () => {
  const { account } = useActiveWeb3React()
  const getTickets = useGetTickets()
  const tickets = useTickets()
  const poolData = useGetPoolData()

  useEffect(() => {
    getTickets()
  }, [account, getTickets, poolData])

  if (!tickets) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      {_.map(tickets, (ticket) => (
        <Ticket {...ticket} />
      ))}
    </Container>
  )
}

export default Tickets
