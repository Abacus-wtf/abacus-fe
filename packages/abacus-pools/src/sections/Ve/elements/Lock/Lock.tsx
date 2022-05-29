import { LockTimeSelector, LoadingOverlay } from "@components/index"
import { useOnAddTokens, useOnLockTokens } from "@hooks/veFunc"
import { useVeData } from "@sections/Ve/useVeData"
import { Input } from "abacus-ui"
import { formatEther } from "ethers/lib/utils"
import React, { useEffect, useState } from "react"
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
  const { abcMaxBalance, holderData } = useVeData()
  const [eth, setEth] = useState("")
  const [lockDuration, setLockDuration] = useState<number>(null)
  const { onLockTokens, isPending: isPendingLock } = useOnLockTokens()
  const { onAddTokens, isPending: isPendingAdd } = useOnAddTokens()
  const timeUnlock = holderData?.timeUnlock ?? NaN
  const [unlocked, setUnlocked] = useState(timeUnlock < new Date().getTime())

  useEffect(() => {
    if (timeUnlock < new Date().getTime()) {
      setUnlocked(true)
    }
  }, [timeUnlock])

  const onClick = async () => {
    if (!isPendingLock && !isPendingAdd) {
      if (unlocked) {
        const duration = Math.round(lockDuration * 24 * 60 * 60)
        onLockTokens(eth, duration, () => {
          setEth("")
          setLockDuration(null)
          refreshVeState()
        })
        setUnlocked(false)
      } else {
        onAddTokens(eth, () => {
          setEth("")
          setLockDuration(null)
          refreshVeState()
        })
      }
    }
  }

  const buttonDisabled =
    isPendingLock ||
    isPendingAdd ||
    (!eth && !lockDuration && unlocked) ||
    (!eth && !unlocked)
  const disabledPage = unlocked && holderData?.amountLocked !== 0
  return (
    <StyledSection order={3} style={{ rowGap: "32px", height: "max-content" }}>
      <LoadingOverlay loading={isPendingAdd || isPendingLock} />
      <SectionTitle>{unlocked ? "Lock" : "Add"}</SectionTitle>
      <Input
        label={`ABC amount you want to ${unlocked ? "lock" : "add"}`}
        type="number"
        name="lock_eth"
        value={eth}
        onChange={setEth}
        placeholder="0.00"
        pill={
          <MaxButton
            disable={disabledPage}
            onClick={() => setEth(formatEther(abcMaxBalance))}
          >
            Max
          </MaxButton>
        }
      />
      {unlocked ? (
        <LockTimeSelector
          label="How long do you want to lock your ABC Tokens?"
          learnMoreLink="/learn-more"
          lockDuration={lockDuration}
          setLockDuration={setLockDuration}
          durations={durations}
          customDurationConfig={customDurationConfig}
        />
      ) : (
        <></>
      )}
      <FullWidthButton
        onClick={onClick}
        disabled={buttonDisabled || disabledPage}
      >
        {isPendingLock
          ? "Locking..."
          : isPendingAdd
          ? "Adding..."
          : unlocked
          ? "Lock Tokens"
          : "Add Tokens"}
      </FullWidthButton>
    </StyledSection>
  )
}

export { Lock }
