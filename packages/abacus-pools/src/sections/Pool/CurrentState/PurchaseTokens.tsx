import { useOnPurchaseTokens } from "@hooks/vaultFunc"
import {
  useCurrentEpoch,
  useEpochLength,
  useEthToUSD,
} from "@state/application/hooks"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { Input } from "abacus-ui"

import React, { FunctionComponent, useState } from "react"

import { LoadingOverlay, LockTimeSelector } from "@components/index"
import moment from "moment"
import { ConfirmButton } from "./CurrentState.styled"

type PurchaseTokensProps = {
  refreshPoolData: () => void
}

const PurchaseTokens: FunctionComponent<PurchaseTokensProps> = ({
  refreshPoolData,
}) => {
  const [eth, setEth] = useState("")
  const [finalEpoch, setFinalEpoch] = useState<number>(null)
  const ethUSD = useEthToUSD(Number(eth))
  const { tokenPrice } = useGetPoolData()
  const { onPurchaseTokens, isPending } = useOnPurchaseTokens()
  const currentEpoch = useCurrentEpoch()
  const epochLength = useEpochLength()

  const numTokens = String(Number(eth) / Number(tokenPrice))

  const purchaseTokens = async () => {
    await onPurchaseTokens(numTokens, currentEpoch, finalEpoch, async () => {
      // await getBalance()
      await refreshPoolData()
      setEth("")
    })
  }

  const confirmDisabled = !eth || !finalEpoch || isPending

  const durations = Array.from({ length: 3 }).map((_, i) => {
    const next = i + 1
    const nextEpoch = currentEpoch + next
    const nextDate = moment(+new Date() + epochLength * i).format("MMM DD")
    return {
      label: `#${nextEpoch} ${nextDate}`,
      id: `epoch_${nextEpoch}`,
      value: `${nextEpoch}`,
    }
  })

  const customDurationConfig = {
    min: currentEpoch + 1,
    max: currentEpoch + 10,
  }
  const customDurationFormatter = (value: number) =>
    `#${value} - ${moment(
      +new Date() + epochLength * (value - currentEpoch)
    ).format("MMM DD")}`

  return (
    <>
      <LoadingOverlay loading={isPending} />

      <Input
        type="number"
        name="from_eth"
        value={eth}
        onChange={setEth}
        label="From:"
        placeholder="0.00"
        pill="ETH"
      />
      <Input
        disabled
        type="number"
        name="to_eth"
        value={numTokens}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange={() => {}}
        label="To:"
        placeholder="0.00"
        pill="Tokens"
        hint={`$${ethUSD}`}
      />
      <LockTimeSelector
        label="How long do you want to lock your deposit?"
        learnMoreLink="/learn-more"
        lockDuration={finalEpoch}
        setLockDuration={setFinalEpoch}
        durations={durations}
        customDurationConfig={customDurationConfig}
        formatter={customDurationFormatter}
      />
      <ConfirmButton disabled={confirmDisabled} onClick={purchaseTokens}>
        {isPending ? "Pending..." : "Confirm Purchase"}
      </ConfirmButton>
    </>
  )
}

export default PurchaseTokens
