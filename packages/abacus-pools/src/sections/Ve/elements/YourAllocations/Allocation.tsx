import { VeAllocation } from "@sections/Ve/models"
import { Button, P, ButtonType, Media } from "abacus-ui"
import { formatEther } from "ethers/lib/utils"
import React from "react"
import styled from "styled-components"

const StyledP = styled(P)`
  font-size: 16px;

  ${Media.lg`
    font-size: 22px;
  `}

  & span {
    color: ${({ theme }) => theme.colors.core[900]};
  }
`

const CollectionContainer = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`

const CollectionImage = styled.img`
  width: 27px;
  height: 27px;
  border-radius: 50%;
  overflow: hidden;
`

const StyledButton = styled(Button)<{
  cancel: boolean
  conserveSpace: boolean
}>`
  width: 100%;
  grid-column: span 2;
  margin-bottom: 8px;
  padding: 13px 20px;
  ${({ cancel, theme }) =>
    cancel ? `background-color: ${theme.colors.utility.red}` : ""};

  ${Media.sm`
    ${({ conserveSpace }: { conserveSpace: boolean }) =>
      conserveSpace ? "padding: 5px 8px" : ""};
    width: max-content;
    grid-column: 3;
    margin-bottom: 0;
  `}
`

const Amount = styled(StyledP)`
  flex: 0 1 auto;
`

interface AllocationProps extends VeAllocation {
  changeAction: () => void
  changeDisabled?: boolean
  isSelected?: boolean
  conserveSpace?: boolean
}

const Allocation = ({
  collection,
  imgSrc,
  amount,
  changeAction,
  changeDisabled = false,
  isSelected = false,
  conserveSpace = false,
}: AllocationProps) => (
  <>
    <CollectionContainer>
      <CollectionImage src={imgSrc} alt="" />
      <StyledP>{collection}</StyledP>
    </CollectionContainer>
    <Amount>
      {formatEther(amount)} <span>ABC</span>
    </Amount>

    <StyledButton
      disabled={changeDisabled}
      buttonType={ButtonType.Gray}
      onClick={changeAction}
      cancel={isSelected}
      conserveSpace={conserveSpace}
    >
      {isSelected ? "Cancel" : "Change"}
    </StyledButton>
  </>
)

export { Allocation }
