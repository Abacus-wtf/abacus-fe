import React, { useCallback, useContext, useEffect, useState } from "react"
import { UniversalContainer } from "@components/global.styles"
import Buttons from "@components/Button"
import { useOnDNFaucet, useOnFaucet } from "@hooks/faucetFunc"
import { useActiveWeb3React, useWeb3Contract } from "@hooks/index"
import { ListGroupHeader, ListGroupSubtext } from "@components/ListGroupMods"
import { DN_TOKEN } from "@config/constants"
import Countdown from "react-countdown"
import { ThemeContext } from "styled-components"
import moment from "moment"
import ABC_DN_ABI from "../../config/contracts/DN_TOKEN_ABI.json"

const FaucetPage: React.FC = () => {
  const { account } = useActiveWeb3React()
  const theme = useContext(ThemeContext)
  const { onFaucet, isPending } = useOnFaucet()
  const { onDNFaucet, isPending: isPendingDN } = useOnDNFaucet()
  const dnContract = useWeb3Contract(ABC_DN_ABI)
  const [dnTime, setDNTime] = useState(moment().unix())

  const getDNTime = useCallback(async () => {
    const nextTime = await dnContract(DN_TOKEN)
      .methods.counterForNextClaim(account)
      .call()
    console.log("dn", nextTime)
    console.log("now", moment().unix())
    setDNTime(nextTime)
  }, [account, dnContract])

  useEffect(() => {
    if (account) {
      getDNTime()
    }
  }, [account, dnContract, getDNTime])

  return (
    <UniversalContainer style={{ gridGap: 30, alignItems: "center" }}>
      <Countdown
        date={Number(dnTime) * 1000}
        renderer={({ hours, minutes, seconds, completed }) => {
          if (completed) {
            return <div>Mint Some DN!</div>
          }
          const colon = (
            <ListGroupHeader
              style={{
                color: theme.colors.text2,
                margin: "0px 10px",
              }}
            >
              :
            </ListGroupHeader>
          )
          return (
            <div style={{ display: "flex" }}>
              <div>
                <ListGroupHeader>{hours}</ListGroupHeader>
                <ListGroupSubtext>Hr</ListGroupSubtext>
              </div>
              {colon}
              <div>
                <ListGroupHeader>{minutes}</ListGroupHeader>
                <ListGroupSubtext>Min</ListGroupSubtext>
              </div>
              {colon}
              <div>
                <ListGroupHeader>{seconds}</ListGroupHeader>
                <ListGroupSubtext>Sec</ListGroupSubtext>
              </div>
            </div>
          )
        }}
      />
      <Buttons
        style={{ fontSize: 24, padding: "16px 28px" }}
        disabled={isPendingDN || moment().unix() > Number(dnTime)}
        onClick={() =>
          onDNFaucet(async () => {
            await getDNTime()
          })
        }
      >
        {isPendingDN ? "Loading..." : "Mint DN"}
      </Buttons>
      <Buttons
        style={{ fontSize: 24, padding: "16px 28px" }}
        disabled={isPending}
        onClick={() => onFaucet(() => {})}
      >
        {isPending ? "Loading..." : "Mint ABC"}
      </Buttons>
    </UniversalContainer>
  )
}

export default FaucetPage
