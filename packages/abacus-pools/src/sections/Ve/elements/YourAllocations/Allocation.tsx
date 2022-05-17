import { Button, P, ButtonType, Media } from "abacus-ui"
import { BigNumber } from "ethers"
import { formatEther } from "ethers/lib/utils"
import React from "react"
import styled from "styled-components"

type AllocationProps = {
  collection: string
  imgSrc: string
  address: string
  amount: BigNumber
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 16px;
  align-items: center;

  ${Media.sm`
    flex-direction: row;
  `}
`

const InfoContainer = styled.div`
  width: 100%;
  display: flex;

  column-gap: 16px;
`

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

  ${Media.sm`
    width: max-content;
  `}
`

const Amount = styled(P)`
  font-size: 22px;
  text-align: right;

  & span {
    color: ${({ theme }) => theme.colors.core[900]};
  }

  ${Media.sm`
    text-align: left;
  `}
`

const Allocation = ({
  collection,
  imgSrc,
  address,
  amount,
}: AllocationProps) => (
  <Container>
    <InfoContainer>
      <CollectionContainer>
        <CollectionImage src={imgSrc} alt="" />
        <CollectionName>{collection}</CollectionName>
      </CollectionContainer>
      <Amount>
        {formatEther(amount)} <span>ABC</span>
      </Amount>
    </InfoContainer>
    <StyledButton
      buttonType={ButtonType.Gray}
      onClick={console.log("change", address)}
    >
      Change
    </StyledButton>
  </Container>
)

export { Allocation }
