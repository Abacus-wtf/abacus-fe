import { LockTimeSelector, LoadingOverlay } from "@components/index"
import { useOnLockTokens } from "@hooks/veFunc"
import { Input } from "abacus-ui"
import React, { useState } from "react"
import {
  SectionTitle,
  StyledSection,
  MaxButton,
  FullWidthButton,
} from "../Ve.styles"
import { durations, customDurationConfig } from "./config"

type LockProps = {
  refreshVeState: () => void
}

const Lock = ({ refreshVeState }: LockProps) => {
  const [eth, setEth] = useState("")
  const [lockDuration, setLockDuration] = useState<number>(null)
  const { onLockTokens, isPending } = useOnLockTokens()

  const onClick = async () => {
    if (!isPending) {
      const duration = Math.round(lockDuration * 24 * 60 * 60)
      onLockTokens(eth, duration, () => {
        setEth("")
        setLockDuration(null)
        refreshVeState()
      })
    }
  }

  const buttonDisabled = isPending || !(eth && lockDuration)

  return (
    <StyledSection order={3} style={{ rowGap: "32px", height: "max-content" }}>
      <LoadingOverlay loading={isPending} />
      <SectionTitle>Lock</SectionTitle>
      <Input
        label="ABC amount you want to lock"
        type="number"
        name="lock_eth"
        value={eth}
        onChange={setEth}
        placeholder="0.00"
        pill={<MaxButton>Max</MaxButton>}
      />
      <LockTimeSelector
        label="How long do you want to lock your ABC Tokens?"
        learnMoreLink="/learn-more"
        lockDuration={lockDuration}
        setLockDuration={setLockDuration}
        durations={durations}
        customDurationConfig={customDurationConfig}
      />
      <FullWidthButton onClick={onClick} disabled={buttonDisabled}>
        {isPending ? "Locking..." : "Lock Tokens"}
      </FullWidthButton>
    </StyledSection>
  )
}

export { Lock }
