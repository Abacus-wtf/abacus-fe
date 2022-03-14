import React, { useEffect, useState } from "react"
import { useActiveWeb3React } from "@hooks/index"
import {
  useGetPoolData,
  useGetTickets,
  useTickets,
} from "@state/singlePoolData/hooks"
import styled from "styled-components"
import _ from "lodash"
import { Ticket as ITicket } from "@state/singlePoolData/reducer"
import { Modal, ModalBody } from "shards-react"
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

interface TicketProps extends ITicket {
  onClick: () => void
}

const Ticket = ({ order, amount, onClick }: TicketProps) => (
  <Button onClick={onClick} style={{ borderRadius: 8 }}>
    #{order}. {3000 - amount} space available
  </Button>
)

const Tickets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTicket, setCurrentTicket] = useState<ITicket>(null)
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
      <Modal
        size="md"
        open={isModalOpen}
        toggle={() => setIsModalOpen(!isModalOpen)}
        centered
      >
        <ModalBody
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: 10,
          }}
        />
      </Modal>
      {_.map(tickets, (ticket) => (
        <Ticket
          {...ticket}
          onClick={() => {
            setIsModalOpen(true)
            setCurrentTicket(ticket)
          }}
        />
      ))}
    </Container>
  )
}

export default Tickets
