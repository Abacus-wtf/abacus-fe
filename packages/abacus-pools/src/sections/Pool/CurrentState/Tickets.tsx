import React, { useEffect, useState } from "react"
import { useActiveWeb3React } from "@hooks/index"
import {
  useGetPoolData,
  useGetTickets,
  useTickets,
  useTraderProfile,
} from "@state/singlePoolData/hooks"
import styled from "styled-components"
import _ from "lodash"
import { Ticket as ITicket } from "@state/singlePoolData/reducer"
import { Modal, ModalBody } from "shards-react"
import { ButtonsWhite } from "@components/Button"
import { useOnSellToken } from "@hooks/vaultFunc"
import { TICKET_SIZE } from "@config/constants"
import AMM from "./AMM"
import { StateComponent } from "."
import { ButtonContainer, Tab } from "../Pool.styles"
import FutureOrder from "./FutureOrder"

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
    #{order}. {TICKET_SIZE - amount} space available
  </Button>
)

enum Tabs {
  Buy = "Purchase",
  Sell = "Sell",
  FutureOrder = "Create Bid",
  PendingOrders = "View Pending Orders",
}

const Tickets = ({ refresh }: StateComponent) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTicket, setCurrentTicket] = useState<ITicket>(null)
  const [tab, setTab] = useState<Tabs>(Tabs.Buy)
  const { account } = useActiveWeb3React()
  const getTickets = useGetTickets()
  const tickets = useTickets()
  const poolData = useGetPoolData()
  const traderData = useTraderProfile()
  const { onSellToken, isPending: isPendingSell } = useOnSellToken()

  useEffect(() => {
    getTickets()
  }, [account, getTickets, poolData])

  if (!tickets || !traderData) {
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
        <ModalBody>
          <ButtonContainer style={{ marginBottom: 20 }}>
            <Tab disabled={tab === Tabs.Buy} onClick={() => setTab(Tabs.Buy)}>
              Buy
            </Tab>
            {(currentTicket && !currentTicket.ownToken) ||
            Number(traderData.ticketsOpen) === 0 ? (
              <></>
            ) : (
              <Tab
                disabled={tab === Tabs.Sell}
                onClick={() => setTab(Tabs.Sell)}
              >
                Sell
              </Tab>
            )}
            {currentTicket && currentTicket.amount === TICKET_SIZE ? (
              <></>
            ) : (
              <Tab
                disabled={tab === Tabs.FutureOrder}
                onClick={() => setTab(Tabs.FutureOrder)}
              >
                Future Order
              </Tab>
            )}
          </ButtonContainer>
          {tab === Tabs.Buy ? (
            <AMM
              refresh={async () => {
                await refresh()
                await getTickets()
                setIsModalOpen(false)
              }}
              currentTicket={currentTicket}
            />
          ) : tab === Tabs.Sell ? (
            <>
              <Button
                onClick={() => {
                  onSellToken(currentTicket.order, async () => {
                    await refresh()
                    await getTickets()
                    setIsModalOpen(false)
                  })
                }}
              >
                {isPendingSell ? "Loading..." : "Sell Ticket"}
              </Button>
            </>
          ) : (
            <FutureOrder
              currentTicket={currentTicket}
              refresh={async () => {
                await refresh()
                await getTickets()
                setIsModalOpen(false)
              }}
            />
          )}
        </ModalBody>
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
