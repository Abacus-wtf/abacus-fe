import React from "react"
import ReactCountdown from "react-countdown"

type CountdownProps = {
  endTime: number
  key?: React.Key
}

const Countdown = ({ endTime, key }: CountdownProps) => (
  <ReactCountdown
    key={key}
    date={endTime}
    renderer={({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        // Render a completed state
        return "Completed"
      }
      // Render a countdown
      return days > 0
        ? `${days}d ${hours}h ${minutes}m ${seconds}s`
        : `${hours}h ${minutes}m ${seconds}s`
    }}
  />
)

export default React.memo(Countdown)
