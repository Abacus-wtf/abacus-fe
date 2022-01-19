import React, { useContext } from "react"
import Countdown from "react-countdown"
import { ThemeContext } from "styled-components"
import { ListGroupItem } from "shards-react"
import { ListGroupHeader, ListGroupSubtext } from "@components/ListGroupMods"
import { Label } from "@components/global.styles"
import { useGetPoolData } from "@state/singlePoolData/hooks"

const AuctionCountdown = () => {
  const poolData = useGetPoolData()
  const theme = useContext(ThemeContext)
  const endTime = poolData.endTime
  return (
    <ListGroupItem style={{ width: "100%", borderRadius: "0.375rem" }}>
      <Label>Auction ends in</Label>
      <Countdown
        date={Number(endTime)}
        renderer={({ hours, minutes, seconds, completed }) => {
          if (completed) {
            return <ListGroupHeader>Completed</ListGroupHeader>
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
    </ListGroupItem>
  )
}

AuctionCountdown.defaultProps = {
  overrideOnComplete: null,
  overrideEndTime: null,
  overrideTitle: null,
}

export default AuctionCountdown
