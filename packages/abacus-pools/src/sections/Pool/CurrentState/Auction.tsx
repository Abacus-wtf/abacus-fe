/* eslint-disable no-nested-ternary */
import React, {
  FormEvent,
  FunctionComponent,
  useContext,
  useState,
} from "react"
import { ThemeContext } from "styled-components"
import { Label } from "@components/global.styles"
import Button from "@components/Button"
import { HorizontalListGroup, ListGroupHeader } from "@components/ListGroupMods"
import { ListGroupItem, ListGroup, Form, Tooltip } from "shards-react"
import { InputWithTitle } from "@components/Input"
import { useGetCurrentNetwork } from "@state/application/hooks"
import { NetworkSymbolEnum } from "@config/constants"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import AuctionCountdown from "./AuctionCountdown"
import { VerticalContainer, ListGroupItemMinWidth } from "../Pool.styles"

const Auction: FunctionComponent = () => {
  const [isToolTipOpen, setIsToolTipOpen] = useState(false)
  const poolData = useGetPoolData()

  const theme = useContext(ThemeContext)
  const [purchaseAmount, setPurchaseAmount] = useState("")
  const networkSymbol = useGetCurrentNetwork()
  const isNetworkSymbolNone = networkSymbol === NetworkSymbolEnum.NONE

  return (
    <>
      <HorizontalListGroup>
        <ListGroupItemMinWidth>
          <Label>Tokens Left</Label>
          <ListGroupHeader style={{ color: theme.colors.accent }}>
            {poolData.tokensLeft} {poolData.symbol}
          </ListGroupHeader>
        </ListGroupItemMinWidth>
        <ListGroupItemMinWidth>
          <Label>Tokens Claimed</Label>
          <ListGroupHeader style={{ color: theme.colors.accent }}>
            {poolData.tokensClaimed} {poolData.symbol}
          </ListGroupHeader>
        </ListGroupItemMinWidth>
        <ListGroupItemMinWidth>
          <Label>Price Per Token</Label>
          <ListGroupHeader style={{ color: theme.colors.accent }}>
            {poolData.tokenPrice} ETH
          </ListGroupHeader>
        </ListGroupItemMinWidth>
      </HorizontalListGroup>
      <AuctionCountdown />
      <Form
        disabled={isNetworkSymbolNone}
        onSubmit={async (e: FormEvent<HTMLDivElement>) => {
          e.preventDefault()
        }}
      >
        <ListGroup>
          <ListGroupItem>
            <InputWithTitle
              title="Purchase Amount"
              id="purchaseAmount"
              placeholder="0"
              value={purchaseAmount}
              onChange={(e) => setPurchaseAmount(e.target.value)}
              infoText="Input how much you would like to purchase"
            />
          </ListGroupItem>
        </ListGroup>
        <VerticalContainer style={{ marginTop: 35, alignItems: "center" }}>
          <div style={{ width: "100%" }} id="submitWeighButton">
            <Button
              disabled={isNetworkSymbolNone}
              style={{ width: "100%" }}
              type="submit"
            >
              Purchase
            </Button>
          </div>
          <Tooltip
            open={isToolTipOpen}
            target="#submitWeighButton"
            disabled={isNetworkSymbolNone}
            toggle={() => setIsToolTipOpen(!isToolTipOpen)}
            placement="right"
          >
            {isNetworkSymbolNone &&
              "Your wallet is not connected or you are on the wrong network!"}
          </Tooltip>
        </VerticalContainer>
      </Form>
    </>
  )
}

export default Auction
