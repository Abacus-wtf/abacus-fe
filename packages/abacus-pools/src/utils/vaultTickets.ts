import { BigNumber } from "ethers"
import { formatEther } from "ethers/lib.esm/utils"
import { range } from "lodash"

type AggregateVaultTokenLockHistoryParams = {
  tokenPurchasesLength: number
  tokenPurchases: {
    timestamp: string
    soldAt?: string
    amount: string
  }[]
}[]

export const aggregateVaultTokenLockHistory = (
  tickets: AggregateVaultTokenLockHistoryParams
) => {
  const pastDateRange = range(28)
    .reverse()
    .map((offset) => {
      const date = new Date()
      date.setDate(date.getDate() - offset)

      return date
    })
  return pastDateRange.map((day) => {
    const thisDay = day.getTime()
    const valuation = {
      date: thisDay,
      uv: tickets?.reduce((acc, ticket) => {
        if (!ticket.tokenPurchasesLength) {
          return acc
        }
        const thisDayValue = ticket.tokenPurchases.reduce((value, token) => {
          // eslint-disable-next-line no-underscore-dangle
          const _timestamp = Number(token.timestamp) * 1000
          // eslint-disable-next-line no-underscore-dangle
          const _soldAt = Number(token.soldAt ?? Infinity) * 1000
          if (_timestamp <= thisDay && _soldAt > thisDay) {
            return value.add(BigNumber.from(token.amount))
          }
          return value
        }, BigNumber.from("0"))
        return acc + Number(formatEther(thisDayValue)) / 1000
      }, 0),
    }
    return valuation
  })
}
