import { Button, ButtonType, H4, Media, P } from "abacus-ui"
import React from "react"
import styled from "styled-components"
import { LoadingOverlay } from "@components/index"
import { useOnWithdrawTokens } from "@hooks/veFunc"
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

type YourDepositsProps = {
  holder: Holder | null
  refreshVeState: () => void
}

const YourDeposits = ({ holder, refreshVeState }: YourDepositsProps) => {
  const { onWithdrawTokens, isPending } = useOnWithdrawTokens()
  return (
    <StyledSection order={1}>
      <LoadingOverlay loading={isPending} />
      <SectionTitle>Your Deposits</SectionTitle>
      <GridContainer>
        <InfoItem order={1}>
          <InfoTitle>Deposited $ABC</InfoTitle>
          <InfoContent>
            {holder?.depositedAbc ?? "-"} <span>ABC</span>
          </InfoContent>
        </InfoItem>
        <InfoItem order={2}>
          <InfoTitle>Allocated $ABC</InfoTitle>
          <InfoContent>
            {holder?.amountAllocated ?? "-"} <span>ABC</span>
          </InfoContent>
        </InfoItem>
        <InfoItem order={4}>
          <InfoTitle>Available ABC</InfoTitle>
          <InfoContent>
            {holder?.availableAbc ?? "-"} <span>ABC</span>
          </InfoContent>
        </InfoItem>
        <InfoItem order={3}>
          <StyledButton
            onClick={() =>
              onWithdrawTokens(() => {
                refreshVeState()
              })
            }
            disabled={holder?.amountAllocated !== 0}
            buttonType={ButtonType.Gray}
          >
            Withdraw Tokens
          </StyledButton>
        </InfoItem>
      </GridContainer>
    </StyledSection>
  )
}

export { YourDeposits }
