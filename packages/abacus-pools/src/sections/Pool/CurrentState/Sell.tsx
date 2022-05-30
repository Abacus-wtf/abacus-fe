import React, { useEffect, useState, useCallback } from "react"
import Button from "@components/Button"
import { useActiveWeb3React } from "@hooks/index"
import { FormSelect } from "shards-react"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { getTicketOwners, SubgraphTicket } from "@state/singlePoolData/queries"
import _ from "lodash"
import { useOnSellToken } from "@hooks/vaultFunc"
import { shortenAddress } from "@config/utils"
import { CardContainer } from "./AMM.styles"
import { StateComponent } from "./index"

interface FutureOrderProps extends StateComponent {
  currentTicket: SubgraphTicket
}

const Sell = (props: FutureOrderProps) => {
  const { account } = useActiveWeb3React()
  const [ticketOwners, setTicketOwners] = useState([])
  const [selectedTicketOwner, setTicketOwner] = useState(null)
  const { onSellToken, isPending } = useOnSellToken()
  const poolData = useGetPoolData()

  const getOwners = useCallback(async () => {
    const tickets = await getTicketOwners(
      poolData.vaultAddress.toLowerCase(),
      props.currentTicket.ticketNumber
    )
    if (tickets.length === 0) {
      return
    }
    const owners = _.uniq(
      _.map(
        _.filter(
          tickets[0].tokenPurchases,
          (tokenPurchase) => tokenPurchase.soldAt === null
        ),
        (tokenPurchases) => tokenPurchases.owner
      )
    )

    setTicketOwners(owners)
    setTicketOwner(owners[0])
  }, [poolData.vaultAddress, props.currentTicket])

  useEffect(() => {
    if (selectedTicketOwner === null) {
      getOwners()
    }
  }, [account, getOwners, selectedTicketOwner])

  const handleButtonClick = async () => {
    await onSellToken(
      selectedTicketOwner,
      props.currentTicket.ticketNumber,
      async () => {
        await props.refresh()
      }
    )
  }

  const cardData = (
    <CardContainer style={{ padding: 0 }}>
      <FormSelect style={{ marginBottom: 20 }}>
        {_.map(ticketOwners, (ticket) => (
          <option onSelect={() => setTicketOwner(ticket)} value={ticket}>
            {shortenAddress(ticket)}
          </option>
        ))}
      </FormSelect>
      <Button
        style={{ width: "100%", padding: 20, fontSize: "1rem" }}
        onClick={handleButtonClick}
        disabled={isPending || selectedTicketOwner === null}
      >
        {isPending ? "Loading..." : "Sell Mature Positions"}
      </Button>
    </CardContainer>
  )
  return cardData
}

export default Sell
