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
  bidAmount: number
  address: string
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
`

const HistoryItem = ({
  bidAmount,
  address,
  timestamp,
  etherscanLink,
}: HistoryItemProps) => {
  const addressLink = address
    ? `https://${
        IS_PRODUCTION ? "" : "testnets."
      }opensea.io/${address.toLowerCase()}`
    : ""
  const bidAmountUSD = useEthToUSD(bidAmount)
  return (
    <Container>
      <InfoContainer>
        <InfoRow>
          Bid&nbsp;<strong>{bidAmount} ETH</strong>&nbsp;-&nbsp;
          <strong>${bidAmountUSD}</strong>
        </InfoRow>
        <InfoRow>
          by&nbsp;
          <a href={addressLink} target="_blank" rel="noopener noreferrer">
            {shortenAddress(address)}
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
