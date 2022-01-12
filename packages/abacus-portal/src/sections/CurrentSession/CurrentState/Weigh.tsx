import React, {
  FormEvent,
  FunctionComponent,
  useContext,
  useState,
  useEffect,
  useMemo
} from "react"
import { ThemeContext } from "styled-components"
import { Label } from "@components/global.styles"
import Button from "@components/Button"
import {
  HorizontalListGroup,
  ListGroupHeader,
  ListGroupSubtext,
} from "@components/ListGroupMods"
import { ListGroupItem, ListGroup, Form } from "shards-react"
import { InputWithTitle } from "@components/Input"
import { User } from "react-feather"
import { VerticalContainer, SubText, ListGroupItemMinWidth } from "../CurrentSession.styles"
import SessionCountdown from "./SessionCountdown"
import { useSelector } from "react-redux"
import { AppState } from "@state/index"
import {web3} from '@config/constants'
import { useActiveWeb3React } from "@hooks/index"
import {useOnWeightVote} from '@hooks/current-session'
import {
  useAllTransactions,
  isTransactionRecent,
} from "@state/transactions/hooks"
import { UserState } from "@state/sessionData/reducer"
import _ from 'lodash'

const Weigh: FunctionComponent = () => {
  const { account } = useActiveWeb3React()
  const weightVote = useOnWeightVote()

  const userStatus = useSelector<
    AppState,
    AppState["sessionData"]["currentSessionData"]["userStatus"]
  >(state => state.sessionData.currentSessionData.userStatus)
  const sessionData = useSelector<
    AppState,
    AppState["sessionData"]["currentSessionData"]["sessionData"]
  >(state => state.sessionData.currentSessionData.sessionData)
  const theme = useContext(ThemeContext)
  const [appraisalValue, setAppraisalValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [txHash, setTxHash] = useState('')

  const allTransactions = useAllTransactions()
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent)
  }, [allTransactions])
  const pending = sortedRecentTransactions
    .filter(tx => !tx.receipt)
    .map(tx => tx.hash)
  const isTxOccurring = _.includes(pending, txHash ? txHash : "")

  useEffect(() => {
    const hash = web3.eth.abi.encodeParameters(
      ["address", "uint256", "uint256"],
      [sessionData.address, Number(sessionData.tokenId), sessionData.nonce]
    )
    const itemsString = localStorage.getItem(hash)
    if (itemsString !== null && account) {
      const items = JSON.parse(itemsString)
      setPasswordValue(items.password)
      setAppraisalValue(items.appraisal)
    }
  }, [account])

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
      <Form
        onSubmit={async (e: FormEvent<HTMLDivElement>) => {
          e.preventDefault()
          await weightVote(appraisalValue, passwordValue, (hash) => {
            setTxHash(hash)
          })
        }}
      >
        <ListGroup>
          <HorizontalListGroup>
            <ListGroupItem>
              <InputWithTitle
                title={"Appraisal Value"}
                id={"appraisalValue"}
                placeholder="0"
                value={appraisalValue}
                onChange={e => setAppraisalValue(e.target.value)}
              />
            </ListGroupItem>
            <ListGroupItem>
              <InputWithTitle
                title={"Seed"}
                id={"password"}
                placeholder="Input"
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
              />
            </ListGroupItem>
          </HorizontalListGroup>
        </ListGroup>
        <VerticalContainer style={{ marginTop: 35, alignItems: "center" }}>
          <Button disabled={
            isTxOccurring ||
            appraisalValue === "" ||
            passwordValue === "" || 
            isNaN(Number(appraisalValue)) ||
            isNaN(Number(passwordValue)) ||
            userStatus === UserState.CompletedWeigh ||
            userStatus === UserState.NotLoggedIn
          } style={{ width: "100%" }} type="submit">
            {isTxOccurring ? 'Pending...' : userStatus === UserState.CompletedWeigh ? 'Vote Weighed' : 'Weigh'}
          </Button>
          <SubText style={{ display: "flex", alignItems: "center" }}>
            <User style={{ height: 14 }} /> {sessionData.numPpl} participants
          </SubText>
        </VerticalContainer>
      </Form>
    </>
  )
}

export default Weigh
