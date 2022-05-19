import { VeAllocation } from "@sections/Ve/models"
import { Button, P, ButtonType, Media } from "abacus-ui"
import { formatEther } from "ethers/lib/utils"
import React from "react"
import styled from "styled-components"

const CollectionName = styled(P)`
  font-size: 22px;

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

const StyledButton = styled(Button)`
  width: 100%;
  grid-column: span 2;
  margin-bottom: 8px;

  ${Media.sm`
    width: max-content;
    grid-column: 3;
    margin-bottom: 0;
  `}
`

const Amount = styled(P)`
  font-size: 22px;
  flex: 0 1 auto;

  & span {
    color: ${({ theme }) => theme.colors.core[900]};
  }
`

interface AllocationProps extends VeAllocation {
  setAllocationToChange: React.Dispatch<string>
}

const Allocation = ({
  collection,
  imgSrc,
  address,
  amount,
  setAllocationToChange,
}: AllocationProps) => (
  <>
    <CollectionContainer>
      <CollectionImage src={imgSrc} alt="" />
      <CollectionName>{collection}</CollectionName>
    </CollectionContainer>
    <Amount>
      {formatEther(amount)} <span>ABC</span>
    </Amount>

    <StyledButton
      buttonType={ButtonType.Gray}
      onClick={() => setAllocationToChange(address)}
    >
      Change
    </StyledButton>
  </>
)

export { Allocation }
