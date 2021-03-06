import React, { FormEvent, useContext, useState } from "react"
import { ThemeContext } from "styled-components"
import { Label } from "@components/global.styles"
import Button from "@components/Button"
import { HorizontalListGroup, ListGroupHeader } from "@components/ListGroupMods"
import { Form, Tooltip, ListGroupItem } from "shards-react"
import { InputWithTitle, NumericalInput } from "@components/Input"
import { useGetCurrentNetwork } from "@state/application/hooks"
import { NetworkSymbolEnum } from "@config/constants"
import {
  useOnBid,
  useOnCalculatePrincipal,
  useOnClaimPreviousBid,
  useOnCloseAccount,
  useOnEndAuction,
} from "@hooks/auctionFunc"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { shortenAddress } from "@config/utils"
import { useActiveWeb3React } from "@hooks/index"
import moment from "moment"
import AuctionCountdown from "./AuctionCountdown"
import { VerticalContainer } from "../Pool.styles"
import { StateComponent } from "./index"
import {
  LabelRow,
  BalanceContainer,
  MaxButton,
  BORDER,
  InfoSectionContainer,
  InputContainer,
} from "./AMM.styles"

const Auction = ({ refresh }: StateComponent) => {
  const { account } = useActiveWeb3React()
  const [isToolTipOpen, setIsToolTipOpen] = useState(false)
  const poolData = useGetPoolData()
  const { onBid, isPending } = useOnBid()
  const { onClaimPreviousBid, isPending: isClaimPreviousPending } =
    useOnClaimPreviousBid()
  const { onEndAuction, isPending: isPendingAuction } = useOnEndAuction()
  const { onCalculatePrincipal, isPending: isPendingProfit } =
    useOnCalculatePrincipal()
  const { onCloseAccount, isPending: isPendingClose } = useOnCloseAccount()
  const [amountCredits, setAmountCredits] = useState("")
  const [amountOfProfitToUse, setAmountOfProfitToUse] = useState("")
  const theme = useContext(ThemeContext)
  const [purchaseAmount, setPurchaseAmount] = useState("")
  const networkSymbol = useGetCurrentNetwork()
  const isNetworkSymbolETH = networkSymbol === NetworkSymbolEnum.ETH
  const isHighestBidderOwner =
    poolData.auction.highestBidder.toLowerCase() === account.toLowerCase()

  if (
    poolData.auction.auctionEndTime * 1000 >= moment().unix() &&
    isHighestBidderOwner &&
    !poolData.auction.isNFTClaimed
  ) {
    return (
      <>
        <Label>
          The auction for this pool has ended and you are the highest bidder!
          End the auction to retrieve your new NFT.
        </Label>
        <Button
          disabled={isPendingAuction}
          onClick={() => onEndAuction(() => refresh())}
        >
          {isPendingAuction ? "Loading..." : "Claim NFT"}
        </Button>
      </>
    )
  }

  if (poolData.auction.hasTickets && !poolData.auction.isAccountClaimed) {
    return (
      <div>
        {poolData.auction.principalCalculated && (
          <LabelRow
            style={{
              display: "flex",
              flexDirection: "column",
              gridGap: 20,
              marginBottom: 20,
            }}
          >
            <InfoSectionContainer>
              <InputContainer
                style={{
                  border: BORDER,
                  borderRadius: 15,
                }}
              >
                <BalanceContainer>
                  <NumericalInput
                    placeholder="Specify Amount of Existing Profit to Purchase Credits"
                    value={amountOfProfitToUse}
                    onChange={(e) => {
                      setAmountOfProfitToUse(e.target.value)
                    }}
                  />
                  <MaxButton
                    onClick={() => {
                      setAmountOfProfitToUse(`${poolData.auction.profit}`)
                    }}
                  >
                    MAX
                  </MaxButton>
                </BalanceContainer>
              </InputContainer>
            </InfoSectionContainer>
            <InfoSectionContainer>
              <InputContainer
                style={{
                  border: BORDER,
                  borderRadius: 15,
                }}
              >
                <BalanceContainer>
                  <NumericalInput
                    placeholder="Specify Credits to Purchase"
                    value={amountCredits}
                    onChange={(e) => {
                      setAmountCredits(e.target.value)
                    }}
                  />
                  <MaxButton
                    onClick={() => {
                      setAmountCredits(
                        `${
                          amountOfProfitToUse !== ""
                            ? amountOfProfitToUse
                            : poolData.auction.profit
                        }`
                      )
                    }}
                  >
                    MAX
                  </MaxButton>
                </BalanceContainer>
              </InputContainer>
            </InfoSectionContainer>
          </LabelRow>
        )}
        <Button
          disabled={isPendingProfit || isPendingClose}
          onClick={() => {
            if (poolData.auction.principalCalculated) {
              onCloseAccount(amountCredits, amountOfProfitToUse, async () => {
                await refresh()
              })
            } else {
              onCalculatePrincipal(async () => {
                await refresh()
              })
            }
          }}
        >
          {isPendingProfit || isPendingClose
            ? "Loading..."
            : poolData.auction.principalCalculated
            ? "Close Account"
            : "Calculate Principal"}
        </Button>
      </div>
    )
  }

  if (poolData.auction.auctionComplete) {
    return <Label>The auction for this pool has ended.</Label>
  }

  return (
    <>
      <HorizontalListGroup style={{ width: "100%" }}>
        <ListGroupItem style={{ width: "100%" }}>
          <Label style={{ marginBottom: 10 }}>Highest Bid</Label>
          <ListGroupHeader style={{ color: theme.colors.accent }}>
            {poolData.auction.highestBid} ETH by{" "}
            {isHighestBidderOwner
              ? "you"
              : shortenAddress(poolData.auction.highestBidder)}
          </ListGroupHeader>
        </ListGroupItem>
      </HorizontalListGroup>
      <AuctionCountdown />
      <Form
        disabled={!isNetworkSymbolETH}
        onSubmit={async (e: FormEvent<HTMLDivElement>) => {
          e.preventDefault()
          if (poolData.auction.claimPreviousBid) {
            onClaimPreviousBid(() => refresh())
          } else {
            onBid(purchaseAmount, () => refresh())
          }
        }}
      >
        {!poolData.auction.claimPreviousBid && (
          <HorizontalListGroup style={{ width: "100%" }}>
            <ListGroupItem style={{ width: "100%" }}>
              <InputWithTitle
                title="Bid"
                id="bid"
                placeholder="0"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(e.target.value)}
                infoText="Input a bid amount"
              />
            </ListGroupItem>
          </HorizontalListGroup>
        )}
        <VerticalContainer style={{ marginTop: 35, alignItems: "center" }}>
          <div style={{ width: "100%" }} id="submitBid">
            <Button
              disabled={
                isPending ||
                isClaimPreviousPending ||
                !isNetworkSymbolETH ||
                Number.isNaN(purchaseAmount) ||
                Number(purchaseAmount) < poolData.auction.highestBid ||
                purchaseAmount === "" ||
                (poolData.auction.claimPreviousBid &&
                  poolData.auction.highestBidder.toLowerCase() ===
                    account.toLowerCase())
              }
              style={{ width: "100%" }}
              type="submit"
            >
              {isPending || isClaimPreviousPending
                ? "Loading..."
                : poolData.auction.claimPreviousBid
                ? "Claim Previous Bid"
                : "Bid"}
            </Button>
          </div>
          <Tooltip
            open={isToolTipOpen}
            target="#submitBid"
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
