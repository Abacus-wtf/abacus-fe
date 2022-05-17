import { Button, ButtonType, H4, Media, P } from "abacus-ui"
import React from "react"
import styled from "styled-components"
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

const YourLocks = () => (
  <StyledSection order={1}>
    <SectionTitle>Your Locks</SectionTitle>
    <GridContainer>
      <InfoItem order={1}>
        <InfoTitle>Unlocked $ABC</InfoTitle>
        <InfoContent>
          113,124.75 <span>ABC</span>
        </InfoContent>
      </InfoItem>
      <InfoItem order={2}>
        <InfoTitle>Locked $ABC</InfoTitle>
        <InfoContent>
          1234.45 <span>veABC</span>
        </InfoContent>
      </InfoItem>
      <InfoItem order={4}>
        <InfoTitle>Unlock TIme</InfoTitle>
        <InfoContent>21d 32m</InfoContent>
      </InfoItem>
      <InfoItem order={3}>
        <StyledButton buttonType={ButtonType.Gray}>Unlock Tokens</StyledButton>
      </InfoItem>
    </GridContainer>
  </StyledSection>
)

export { YourLocks }
