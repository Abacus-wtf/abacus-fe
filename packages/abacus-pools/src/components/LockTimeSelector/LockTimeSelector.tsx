import React, { useState } from "react"
import { Button, Checkbox, Flex, Font, ButtonType, Range } from "abacus-ui"
import { Link } from "gatsby"
import styled from "styled-components"

const LockRadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`

const LockRadioLabel = styled.label`
  ${Font("kilo")}
  font-size: 20px;
`

const LockRadioGroup = styled(Flex)`
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 6px;
`

const CustomDurationButton = styled(Button)`
  display: block;
  border: 2px solid rgba(28, 35, 51, 0.04);
  border-radius: 70px;
  padding: 8px 14px;
  text-align: center;
  margin: 0;
`

type LockTimeSelectorProps = {
  label: string
  learnMoreLink: string
  lockDuration: number
  setLockDuration: React.Dispatch<number>
  customDurationConfig: {
    min: number
    max: number
  }
  formatter?: (value: number) => string
  durations: {
    label: string
    id: string
    value: string
  }[]
}

const LockTimeSelector = ({
  lockDuration,
  setLockDuration,
  customDurationConfig,
  durations,
  label,
  learnMoreLink,
  formatter = (value: number) => `${value}d`,
}: LockTimeSelectorProps) => {
  const [isCustomDuration, setIsCustomDuration] = useState(false)
  return (
    <LockRadioContainer>
      <Flex
        style={{
          justifyContent: "space-between",
          flexWrap: "wrap",
          columnGap: "8px",
          rowGap: "16px",
        }}
      >
        <LockRadioLabel htmlFor="lock_duration">{label}</LockRadioLabel>
        <Link to={learnMoreLink}>{"Learn More >"}</Link>
      </Flex>
      {isCustomDuration ? (
        <Range
          id="lock_duration"
          value={lockDuration}
          setValue={setLockDuration}
          min={customDurationConfig.min}
          max={customDurationConfig.max}
          outputFormatter={formatter}
          step={1}
        />
      ) : (
        <LockRadioGroup>
          {durations.map((duration) => (
            <Checkbox
              key={duration.id}
              type="radio"
              name="lock_duration"
              label={duration.label}
              id={duration.id}
              value={duration.value}
              checked={lockDuration === Number(duration.value)}
              onChange={() => setLockDuration(Number(duration.value))}
            />
          ))}

          <CustomDurationButton
            buttonType={ButtonType.Clear}
            onClick={() => setIsCustomDuration(true)}
          >
            Custom
          </CustomDurationButton>
        </LockRadioGroup>
      )}
    </LockRadioContainer>
  )
}

export { LockTimeSelector }
