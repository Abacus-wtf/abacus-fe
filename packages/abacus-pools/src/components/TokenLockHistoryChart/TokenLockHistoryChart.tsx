import React from "react"
import { BarChart, Bar, ResponsiveContainer, YAxis, Tooltip } from "recharts"
import styled from "styled-components"
import { CustomTooltip } from "./Tooltip"

const Container = styled.div<{ empty?: boolean }>`
  display: flex;
  flex-direction: column;
  height: ${({ empty }) => (empty ? "auto" : "150px")};
  width: 100%;
`

type TokenLockHistoryChartProps = {
  data: {
    date: number
    uv: number
  }[]
  showYAxis?: boolean
  className?: string
}

const TokenLockHistoryChart = ({
  data,
  showYAxis = false,
  className,
}: TokenLockHistoryChartProps) => {
  const hasData = data.some((value) => value.uv > 0)
  if (!hasData) {
    return <Container empty>No purchases in the last 4 weeks</Container>
  }
  return (
    <Container className={className}>
      <ResponsiveContainer width="100%">
        <BarChart data={data}>
          {showYAxis && (
            <YAxis
              axisLine={false}
              tickLine={false}
              domain={[0, "dataMax"]}
              tickCount={16}
            />
          )}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="uv" fill="#C5D5FF" radius={2} width="4px" />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  )
}

export { TokenLockHistoryChart }
