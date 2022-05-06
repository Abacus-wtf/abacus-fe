import React from "react"
import ReactCountdown from "react-countdown"
import styled from "styled-components"
import { InfoData } from "./AuctionInfo.styled"

const StyledInfoData = styled(InfoData)`
  font-family: monospace;
`

type CountdownProps = {
  endTime: number
}

const Countdown = ({ endTime }: CountdownProps) => (
  <ReactCountdown
    date={endTime}
    renderer={({ hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return <StyledInfoData>Completed</StyledInfoData>
      }
      // Render a countdown
      return (
        <StyledInfoData>
          {hours}h {minutes}m {seconds}s
        </StyledInfoData>
      )
    }}
  />
)

export default React.memo(Countdown)
