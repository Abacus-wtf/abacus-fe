import React, { useState } from "react"
import { Button, ButtonType, Checkbox, Font, Input, Media } from "abacus-ui"
import styled from "styled-components"
import { ZERO_ADDRESS } from "@config/constants"
import { defaultCollections } from "./constants"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 20px;
`

const RadioLabel = styled.label`
  ${Font("kilo")}
  font-size: 20px;
`

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${Media.xs`
    row-gap: 20px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, max-content));
  `}
`

const CustomAddressButton = styled(Button)`
  display: block;
  border: 2px solid rgba(28, 35, 51, 0.04);
  border-radius: 70px;
  padding: 8px 14px;
  text-align: center;
  margin-right: 6px;
  margin-bottom: 12px;
`

const CollectionCheckbox = styled(Checkbox)`
  margin: 0;
  width: 100%;

  & label {
    display: flex;
    padding: 0;
    overflow: hidden;
  }
`
const CollectionCheckboxImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex: 0 0 auto;
`

const CollectionCheckboxText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 14px;
  flex: 1 0 auto;
`

const CustomCheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${Media.xs`
    row-gap: 20px;
    flex-direction: row;
    grid-column: span 2;
  `}
`

type CollectionRadioButtonsProps = {
  selectedCollection: string
  setSelectedCollection: React.Dispatch<string>
}

const RADIO_NAME = "selected_collection"
export const AUTO_ALLOCATION = "AUTO_ALLOCATION"

const CollectionRadioButtons = ({
  selectedCollection,
  setSelectedCollection,
}: CollectionRadioButtonsProps) => {
  const [showCustomCollection, setIsShowCustomCollection] = useState(false)
  return (
    <Container>
      <RadioLabel>Choose or specify a custom collection</RadioLabel>
      <RadioContainer>
        {defaultCollections.map(({ name, address, imgSrc }) => (
          <CollectionCheckbox
            key={address}
            type="radio"
            name={RADIO_NAME}
            label={
              <>
                <CollectionCheckboxImage src={imgSrc} />
                <CollectionCheckboxText>{name}</CollectionCheckboxText>
              </>
            }
            id={address}
            value={address}
            checked={selectedCollection === address}
            onChange={() => {
              setSelectedCollection(address)
              setIsShowCustomCollection(false)
            }}
          />
        ))}
        <CustomCheckboxContainer>
          <Checkbox
            type="radio"
            name={RADIO_NAME}
            label="Auto Allocation"
            id={AUTO_ALLOCATION}
            value={AUTO_ALLOCATION}
            checked={selectedCollection === AUTO_ALLOCATION}
            onChange={() => setSelectedCollection(AUTO_ALLOCATION)}
          />
          <CustomAddressButton
            buttonType={ButtonType.Clear}
            onClick={() => setIsShowCustomCollection(true)}
          >
            Input Custom Address
          </CustomAddressButton>
        </CustomCheckboxContainer>
      </RadioContainer>
      {showCustomCollection && (
        <Input
          label="Custom address"
          type="text"
          name="custom_address"
          value={selectedCollection}
          onChange={setSelectedCollection}
          placeholder={ZERO_ADDRESS}
        />
      )}
    </Container>
  )
}

export { CollectionRadioButtons }
