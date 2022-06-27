import { useOnPurchaseTokens } from "@hooks/vaultFunc"
import {
  useCurrentEpoch,
  useEpochLength,
  useEthToUSD,
} from "@state/application/hooks"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { Checkbox, Flex, Input } from "abacus-ui"

import React, { FunctionComponent, useEffect, useState } from "react"

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
  const [startEpoch, setStartEpoch] = useState<number>(null)
  const currentEpoch = useCurrentEpoch()
  const epochLength = useEpochLength()

  const numTokens = String(Number(eth) / Number(tokenPrice))

  useEffect(() => {
    setStartEpoch(currentEpoch)
  }, [currentEpoch])

  const purchaseTokens = async () => {
    await onPurchaseTokens(numTokens, startEpoch, finalEpoch, async () => {
      // await getBalance()
      await refreshPoolData()
      setEth("")
    })
  }

  const confirmDisabled = !eth || !finalEpoch || isPending || !startEpoch

  const durations = Array.from({ length: 3 }).map((_, i) => {
    const next = i + 1
    const nextEpoch = startEpoch + next
    const nextDate = moment(+new Date() + epochLength * i).format("MMM DD")
    return {
      label: `#${nextEpoch} ${nextDate}`,
      id: `epoch_${nextEpoch}`,
      value: `${nextEpoch}`,
    }
  })

  const customDurationConfig = {
    min: startEpoch + 1,
    max: startEpoch + 10,
  }
  const customDurationFormatter = (value: number) =>
    `#${value} - ${moment(
      +new Date() + epochLength * (value - startEpoch)
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
      <Flex style={{ gap: "8px" }}>
        <Checkbox
          type="radio"
          name="start_epoch"
          label={`Epoch #${currentEpoch} (current)`}
          id={`start_epoch${currentEpoch}`}
          value={`${currentEpoch}`}
          checked={startEpoch === currentEpoch}
          onChange={() => setStartEpoch(currentEpoch)}
        />
        <Checkbox
          type="radio"
          name="start_epoch"
          label={`Epoch #${currentEpoch + 1} (next)`}
          id={`start_epoch${currentEpoch + 1}`}
          value={`${currentEpoch + 1}`}
          checked={startEpoch === currentEpoch + 1}
          onChange={() => setStartEpoch(currentEpoch + 1)}
        />
      </Flex>
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
