import { IS_PRODUCTION } from "@config/constants"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { Exa, Section } from "abacus-ui"
import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { HistoryItem } from "./HistoryItem"

const Container = styled(Section)`
  row-gap: 40px;
`

const Title = styled(Exa)`
  font-family: "Bluu next";
  font-weight: bold;
`

const HistoryContainer = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  width: 100%;
`

const getEtherscanLink = (id: string) =>
  `https://${IS_PRODUCTION ? "" : "rinkeby."}etherscan.io/tx/${id}`

const BiddingHistory: FunctionComponent = () => {
  const { auction } = useGetPoolData()

  const history =
    auction?.bids.map((bid) => ({
      ...bid,
      etherscanLink: getEtherscanLink(bid.id),
    })) ?? []

  return (
    <Container>
      <Title>Bidding History</Title>
      <HistoryContainer>
        {history.map((historyItem, index) => (
          <React.Fragment key={historyItem.id}>
            <HistoryItem {...historyItem} />
            {index !== history.length - 1 ? <hr /> : null}
          </React.Fragment>
        ))}
      </HistoryContainer>
    </Container>
  )
}

export { BiddingHistory }
