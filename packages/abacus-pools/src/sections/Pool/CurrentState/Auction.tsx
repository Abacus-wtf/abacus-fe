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
  const isNetworkSymbolETH = networkSymbol === NetworkSymbolEnum.ETH

  return (
    <>
      <HorizontalListGroup>
        <ListGroupItemMinWidth>
          <Label>Highest Bid</Label>
          <ListGroupHeader style={{ color: theme.colors.accent }}>
            {poolData.highestBid} ETH
          </ListGroupHeader>
        </ListGroupItemMinWidth>
      </HorizontalListGroup>
      <AuctionCountdown />
      <Form
        disabled={!isNetworkSymbolETH}
        onSubmit={async (e: FormEvent<HTMLDivElement>) => {
          e.preventDefault()

          // @TODO
        }}
      >
        <ListGroup>
          <ListGroupItem>
            <InputWithTitle
              title="Bid"
              id="bid"
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
              disabled={!isNetworkSymbolETH}
              style={{ width: "100%" }}
              type="submit"
            >
              Bid
            </Button>
          </div>
          <Tooltip
            open={isToolTipOpen}
            target="#submitWeighButton"
            disabled={isNetworkSymbolETH}
            toggle={() => setIsToolTipOpen(!isToolTipOpen)}
            placement="right"
          >
            {!isNetworkSymbolETH &&
              "Your wallet is not connected or you are on the wrong network!"}
          </Tooltip>
        </VerticalContainer>
      </Form>
    </>
  )
}

export default Auction
