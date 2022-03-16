import React, { useEffect, useState, useCallback } from "react"
import Button from "@components/Button"
import { NumericalInput } from "@components/Input"
import { web3 } from "@config/constants"
import { useGetCurrentNetwork } from "@state/application/hooks"
import { formatEther } from "ethers/lib/utils"
import { useActiveWeb3React } from "@hooks/index"
import DatePicker from "react-datepicker"
import moment from "moment"
import { useOnFutureOrder } from "@hooks/vaultFunc"
import styled from "styled-components"
import { FormSelect } from "shards-react"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { getTicketOwners } from "@state/singlePoolData/queries"
import { Ticket } from "@state/singlePoolData/reducer"
import _ from "lodash"
import { shortenAddress } from "@config/utils"
import {
  InputContainer,
  BORDER,
  LabelRow,
  BalanceContainer,
  TinyTitles,
  MaxButton,
  CardContainer,
} from "./AMM.styles"
import "react-datepicker/dist/react-datepicker.css"
import { StateComponent } from "./index"

const DatePickerStyled = styled(DatePicker)`
  padding: 10px 15px;
  width: 100%;
  margin: 0px 0px 15px 0px;
  border-radius: 10px;
  border: 0.5px solid rgb(196, 196, 196);
  font-weight: 400;
`

interface FutureOrderProps extends StateComponent {
  currentTicket: Ticket
}

const FutureOrder = (props: FutureOrderProps) => {
  const { account } = useActiveWeb3React()
  const networkSymbol = useGetCurrentNetwork()
  const [inputAmount, setInputAmount] = useState("")
  const [ethBalance, setEthBalance] = useState<number | null>(null)
  const [startDate, setStartDate] = useState(new Date())
  const [ticketOwners, setTicketOwners] = useState([])
  const [selectedTicketOwner, setTicketOwner] = useState(null)
  const { onFutureOrder, isPending } = useOnFutureOrder()
  const poolData = useGetPoolData()

  const getBalance = useCallback(async () => {
    const provider = web3(networkSymbol)
    const balance = await provider.eth.getBalance(account)
    setEthBalance(parseFloat(formatEther(balance)))
  }, [account, networkSymbol])

  const getOwners = useCallback(async () => {
    const tickets = await getTicketOwners(
      poolData.vaultAddress,
      props.currentTicket.order
    )
    if (tickets.length === 0) {
      return
    }
    setTicketOwners(_.uniq(tickets.map((ticket) => ticket.owner)))
    setTicketOwner(tickets[0].owner)
  }, [poolData.vaultAddress, props.currentTicket.order])

  useEffect(() => {
    if (ethBalance === null) {
      getBalance()
    }
  }, [account, ethBalance, networkSymbol, getBalance])

  useEffect(() => {
    getOwners()
  }, [account, getOwners])

  const handleButtonClick = async () => {
    await onFutureOrder(
      selectedTicketOwner,
      props.currentTicket.order,
      moment(startDate).unix() - moment().unix(),
      parseFloat(inputAmount),
      async () => {
        await getBalance()
        await props.refresh()
        setInputAmount("")
      }
    )
  }

  const cardData = (
    <CardContainer style={{ padding: 0 }}>
      <InputContainer
        style={{
          border: BORDER,
          borderRadius: 15,
          marginBottom: 20,
        }}
      >
        <LabelRow>
          <BalanceContainer>
            <TinyTitles>Balance: {ethBalance}</TinyTitles>
          </BalanceContainer>
        </LabelRow>
        <LabelRow>
          <BalanceContainer>
            <NumericalInput
              placeholder="Incentive"
              value={inputAmount}
              onChange={(e) => {
                setInputAmount(e.target.value)
              }}
            />
            <MaxButton
              onClick={() => {
                setInputAmount(`${ethBalance}`)
              }}
            >
              MAX
            </MaxButton>
          </BalanceContainer>
        </LabelRow>
      </InputContainer>
      <DatePickerStyled
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
      />
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
        {isPending ? "Loading..." : "Create Future Order"}
      </Button>
    </CardContainer>
  )
  return cardData
}

export default FutureOrder
