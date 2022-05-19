import { LockTimeSelector } from "@components/index"
import { Input } from "abacus-ui"
import React, { useState } from "react"
import {
  SectionTitle,
  StyledSection,
  MaxButton,
  FullWidthButton,
} from "../Ve.styles"
import { durations, customDurationConfig } from "./config"

const Lock = () => {
  const [eth, setEth] = useState("")
  const [lockDuration, setLockDuration] = useState<number>(null)
  return (
    <StyledSection order={3} style={{ rowGap: "32px", height: "max-content" }}>
      <SectionTitle>Lock</SectionTitle>
      <Input
        label="ETH amount you want bond"
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
      <FullWidthButton>Lock Tokens</FullWidthButton>
    </StyledSection>
  )
}

export { Lock }
