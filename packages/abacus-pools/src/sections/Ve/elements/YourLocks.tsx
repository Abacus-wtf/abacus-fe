import { Button, ButtonType, H4, Media, P } from "abacus-ui"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Countdown } from "@components/index"
import { Holder } from "../useVeData"
import { SectionTitle, StyledSection } from "./Ve.styles"

const GridContainer = styled.div`
  display: grid;
  column-gap: 50px;
  width: 100%;
  justify-content: space-between;
  row-gap: 24px;

  ${Media.md`
    grid-template-columns: repeat(2, calc(50% - 25px));
  `}
`

const InfoItem = styled.div<{ order: number }>`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  width: 100%;

  ${Media.md`
    order: ${({ order }: { order: number }) => order};
  `}
`

const InfoTitle = styled(H4)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.core[900]};
`

const InfoContent = styled(P)`
  font-size: 22px;
  & span {
    color: ${({ theme }) => theme.colors.core[900]};
  }
`

const StyledButton = styled(Button)`
  width: 100%;

  ${Media.md`
    width: max-content;
  `}
`

type YourLocksProps = {
  veBalance: string
  holder: Holder | null
}

const YourLocks = ({ veBalance, holder }: YourLocksProps) => {
  const timeUnlock = holder?.timeUnlock ?? NaN
  const [unlocked, setUnlocked] = useState(timeUnlock < new Date().getTime())

  useEffect(() => {
    if (timeUnlock < new Date().getTime()) {
      setUnlocked(true)
    }
  }, [timeUnlock])

  const unlockedABC = unlocked ? holder?.amountLocked ?? "-" : "0"
  const lockedABC = holder?.amountLocked ?? "-"
  const lockedVeABC = veBalance

  return (
    <StyledSection order={1}>
      <SectionTitle>Your Locks</SectionTitle>
      <GridContainer>
        <InfoItem order={1}>
          <InfoTitle>Unlocked $ABC</InfoTitle>
          <InfoContent>
            {unlockedABC} <span>ABC</span>
          </InfoContent>
        </InfoItem>
        <InfoItem order={2}>
          <InfoTitle>Locked $ABC</InfoTitle>
          <InfoContent>
            {lockedVeABC} <span>veABC</span> ({lockedABC} <span>ABC</span>)
          </InfoContent>
        </InfoItem>
        <InfoItem order={4}>
          <InfoTitle>Unlock TIme</InfoTitle>
          <InfoContent>
            {/* 21d 32m */}
            {holder?.timeUnlock && (
              <Countdown
                endTime={holder.timeUnlock}
                onComplete={() => setUnlocked(true)}
              />
            )}
          </InfoContent>
        </InfoItem>
        <InfoItem order={3}>
          <StyledButton buttonType={ButtonType.Gray}>
            Unlock Tokens
          </StyledButton>
        </InfoItem>
      </GridContainer>
    </StyledSection>
  )
}

export { YourLocks }
