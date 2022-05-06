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

const BiddingHistory: FunctionComponent = () => {
  const history = [
    {
      id: 1,
      bidAmount: 0.01,
      address: "0xd365Ae104DA3E86EA36f268050D6e5212a42e360",
      timestamp: 1651862054000,
      etherscanLink:
        "https://rinkeby.etherscan.io/tx/0x0a1e5c3c6670c098c13406bc2707727a85fc36d395682aac0c00726a0b9fb572",
    },
    {
      id: 2,
      bidAmount: 0.01,
      address: "0xd365Ae104DA3E86EA36f268050D6e5212a42e360",
      timestamp: 1651862054000,
      etherscanLink:
        "https://rinkeby.etherscan.io/tx/0x0a1e5c3c6670c098c13406bc2707727a85fc36d395682aac0c00726a0b9fb572",
    },
    {
      id: 3,
      bidAmount: 0.01,
      address: "0xd365Ae104DA3E86EA36f268050D6e5212a42e360",
      timestamp: 1651862054000,
      etherscanLink:
        "https://rinkeby.etherscan.io/tx/0x0a1e5c3c6670c098c13406bc2707727a85fc36d395682aac0c00726a0b9fb572",
    },
    {
      id: 4,
      bidAmount: 0.01,
      address: "0xd365Ae104DA3E86EA36f268050D6e5212a42e360",
      timestamp: 1651862054000,
      etherscanLink:
        "https://rinkeby.etherscan.io/tx/0x0a1e5c3c6670c098c13406bc2707727a85fc36d395682aac0c00726a0b9fb572",
    },
  ]
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
