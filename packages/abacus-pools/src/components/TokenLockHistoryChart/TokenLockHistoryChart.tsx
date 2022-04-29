import React from "react"
import { BarChart, Bar, ResponsiveContainer, YAxis, Tooltip } from "recharts"
import { CustomTooltip } from "./Tooltip"

type TokenLockHistoryChartProps = {
  data: {
    date: number
    uv: number
  }[]
}

const TokenLockHistoryChart = ({ data }: TokenLockHistoryChartProps) => (
  <ResponsiveContainer width="100%" height="100%" minHeight="200px">
    <BarChart data={data}>
      <YAxis axisLine={false} tickLine={false} />
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="uv" fill="#C5D5FF" radius={2} width="4px" />
    </BarChart>
  </ResponsiveContainer>
)

export { TokenLockHistoryChart }
