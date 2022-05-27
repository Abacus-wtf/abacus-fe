import React from "react"
import ReactCountdown from "react-countdown"

type CountdownProps = {
  endTime: number
  key?: React.Key
  onComplete?: () => void
}

const Countdown = ({ endTime, key, onComplete }: CountdownProps) => (
  <ReactCountdown
    key={key}
    date={endTime}
    onComplete={onComplete}
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
