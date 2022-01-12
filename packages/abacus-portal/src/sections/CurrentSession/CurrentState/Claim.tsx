import React, { FunctionComponent, useContext, useState } from "react"
import { ThemeContext } from "styled-components"
import { Label } from "@components/global.styles"
import Button from "@components/Button"
import {
  HorizontalListGroup,
  ListGroupHeader,
  ListGroupSubtext,
} from "@components/ListGroupMods"
import { ListGroupItem, Tooltip } from "shards-react"
import {
  VerticalContainer,
  SubText,
  ListGroupItemMinWidth,
} from "../CurrentSession.styles"
import SessionCountdown from "./SessionCountdown"
import { useSelector } from "react-redux"
import { AppState } from "@state/index"
import { UserState } from "@state/sessionData/reducer"
import { useCanUserInteract } from "@state/sessionData/hooks"
import { InputWithTitle } from "@components/Input"
import { User } from "react-feather"
import { useOnClaim } from "@hooks/current-session"
import { useIsTxOccurring } from "@state/transactions/hooks"
import _ from "lodash"

const Claim: FunctionComponent = () => {
  const [ethPayout, setEthPayout] = useState(0)
  const [abcPayout, setAbcPayout] = useState(0)
  const sessionData = useSelector<
    AppState,
    AppState["sessionData"]["currentSessionData"]["sessionData"]
  >(state => state.sessionData.currentSessionData.sessionData)
  const userStatus = useSelector<
    AppState,
    AppState["sessionData"]["currentSessionData"]["userStatus"]
  >(state => state.sessionData.currentSessionData.userStatus)

  const canUserInteract = useCanUserInteract()
  const [isEthToolTipOpen, setIsEthToolTipOpen] = useState(false)
  const [isAbcToolTipOpen, setIsAbcToolTipOpen] = useState(false)

  const onClaim = useOnClaim()
  const [txHash, setTxHash] = useState("")
  const isTxOccurring = useIsTxOccurring(txHash)

  const theme = useContext(ThemeContext)
  return (
    <>
      <HorizontalListGroup>
        <ListGroupItemMinWidth>
          <Label>Total Staked</Label>
          <ListGroupHeader style={{ color: theme.colors.accent }}>
            {sessionData.totalStaked} ETH
          </ListGroupHeader>
          <ListGroupSubtext>
            ($
            {sessionData.totalStakedInUSD.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            )
          </ListGroupSubtext>
        </ListGroupItemMinWidth>
        <SessionCountdown />
      </HorizontalListGroup>

      <ListGroupItem>
        <InputWithTitle
          title={"Final Appraisal Value"}
          id={"stake"}
          value={sessionData.finalAppraisalValue}
          disabled
        />
      </ListGroupItem>
      <HorizontalListGroup>
        <ListGroupItem>
          <InputWithTitle
            title={"ETH Payout"}
            id={"ethPayout"}
            placeholder="0"
            value={ethPayout}
            onChange={setEthPayout}
          />
        </ListGroupItem>
        <ListGroupItem>
          <InputWithTitle
            title={"ABC Payout"}
            id={"password"}
            placeholder="0"
            value={abcPayout}
            onChange={setAbcPayout}
          />
        </ListGroupItem>
      </HorizontalListGroup>
      <VerticalContainer style={{ marginTop: 35, alignItems: "center" }}>
        <HorizontalListGroup>
          <div
            style={{ padding: "0 8px", width: "100%" }}
            id={"claimEthButton"}
          >
            <Button
              disabled={!canUserInteract || isTxOccurring}
              style={{ width: "100%" }}
              type="button"
              onClick={() => {
                const cb = (hash: string) => {
                  setTxHash(hash)
                }
                onClaim(true, cb)
              }}
            >
              {isTxOccurring ? "Pending..." : "Claim ETH"}
            </Button>
            <Tooltip
              open={isEthToolTipOpen}
              target="#claimEthButton"
              disabled={canUserInteract || isTxOccurring}
              toggle={() => setIsEthToolTipOpen(!isEthToolTipOpen)}
              placement={"right"}
            >
              {userStatus === UserState.CompletedClaim
                ? "You already claimed"
                : "You missed a previous step so you cannot participate in this part of the session"}
            </Tooltip>
          </div>
          <div
            style={{ padding: "0 8px", width: "100%" }}
            id={"claimAbcButton"}
          >
            <Button
              disabled={!canUserInteract || isTxOccurring}
              style={{ width: "100%" }}
              type="button"
              onClick={() => {
                const cb = (hash: string) => {
                  setTxHash(hash)
                }
                onClaim(false, cb)
              }}
            >
              {isTxOccurring ? "Pending..." : "Claim ABC"}
            </Button>
            <Tooltip
              open={isAbcToolTipOpen}
              target="#claimAbcButton"
              disabled={canUserInteract || isTxOccurring}
              toggle={() => setIsAbcToolTipOpen(!isAbcToolTipOpen)}
              placement={"right"}
            >
              {userStatus === UserState.CompletedClaim
                ? "You already claimed"
                : "You missed a previous step so you cannot participate in this part of the session"}
            </Tooltip>
          </div>
        </HorizontalListGroup>
        <SubText style={{ display: "flex", alignItems: "center" }}>
          <User style={{ height: 14 }} /> {sessionData.numPpl} participants
        </SubText>
      </VerticalContainer>
    </>
  )
}

export default Claim
