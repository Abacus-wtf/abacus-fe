import { AppState } from "@state/index"
import { BigNumber } from "ethers"
import { range } from "lodash"

export const aggregateVaultTokenLockHistory = (
  currentEpoch: number,
  tickets: AppState["singlePoolData"]["tickets"]
) => {
  // epoch - 10 <= R <= epoch + 10
  const offsets = range(21)
    .reverse()
    .map((_, i) => i - 10)
  return offsets.map((offset) => {
    const thisEpoch = currentEpoch + offset
    const valuation = {
      epoch: thisEpoch,
      uv: tickets?.reduce((acc, ticket) => {
        if (!ticket.tokenPurchasesLength) {
          return acc
        }
        const thisDayValue = ticket.tokenPurchases.reduce((value, token) => {
          if (token.startEpoch <= thisEpoch && token.finalEpoch > thisEpoch) {
            return value.add(BigNumber.from(token.amount))
          }
          return value
        }, BigNumber.from("0"))
        return acc + Number(thisDayValue) / 1000
      }, 0),
    }
    return valuation
  })
}

export const getPoolSize = (
  currentEpoch: number,
  tickets: AppState["singlePoolData"]["tickets"]
) =>
  tickets?.reduce((ticketAcc, ticket) => {
    const amount = ticket.tokenPurchases.reduce(
      (acc, tokenPurchase) =>
        currentEpoch >= tokenPurchase.finalEpoch
          ? acc
          : acc + Number(tokenPurchase.amount),
      0
    )
    return ticketAcc + amount
  }, 0) ?? 0
