import { IS_PRODUCTION } from "@config/constants"
import { shortenAddress } from "@config/utils"
import { useEthToUSD } from "@state/application/hooks"
import {
  Button,
  ButtonType,
  Kilo,
  OutboundLink,
  VisuallyHidden,
} from "abacus-ui"
import moment from "moment"
import React from "react"
import styled from "styled-components"

const Container = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 16px 0;
`

type HistoryItemProps = {
  amount: number
  bidder: string
  timestamp: number
  etherscanLink: string
}

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`

const InfoRow = styled(Kilo)`
  display: flex;
  flex-wrap: wrap;
`

const HistoryItem = ({
  amount,
  bidder,
  timestamp,
  etherscanLink,
}: HistoryItemProps) => {
  const addressLink = bidder
    ? `https://${
        IS_PRODUCTION ? "" : "testnets."
      }opensea.io/${bidder.toLowerCase()}`
    : ""
  const amountUSD = useEthToUSD(amount)
  return (
    <Container>
      <InfoContainer>
        <InfoRow>
          Bid&nbsp;<strong>{amount} ETH</strong>&nbsp;-&nbsp;
          <strong>${amountUSD}</strong>
        </InfoRow>
        <InfoRow>
          by&nbsp;
          <a href={addressLink} target="_blank" rel="noopener noreferrer">
            {shortenAddress(bidder)}
          </a>
          &nbsp;
          {moment(timestamp).format("DD/MM/YYYY, HH:MM A")}
        </InfoRow>
      </InfoContainer>
      <Button
        as="a"
        buttonType={ButtonType.Gray}
        href={etherscanLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <OutboundLink />
        <VisuallyHidden>View on etherscan</VisuallyHidden>
      </Button>
    </Container>
  )
}

export { HistoryItem }
