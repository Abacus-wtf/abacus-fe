import React from "react"
import { Button, ButtonType, Checkbox, Font, Media } from "abacus-ui"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 30px;
`

const RadioLabel = styled.label`
  ${Font("kilo")}
  font-size: 20px;
`

const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  column-gap: 12px;

  ${Media.xs`
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

  ${Media.xs`
    flex-direction: row;
    grid-column: span 2;
  `}
`

type CollectionRadioButtonsProps = {
  collections: {
    name: string
    address: string
    imgSrc: string
  }[]
  selectedCollection: string
  setSelectedCollection: React.Dispatch<string>
}

const RADIO_NAME = "selected_collection"
export const AUTO_ALLOCATION = "AUTO_ALLOCATION"

const CollectionRadioButtons = ({
  collections,
  selectedCollection,
  setSelectedCollection,
}: CollectionRadioButtonsProps) => (
  <Container>
    <RadioLabel>Choose or specify a custom collection</RadioLabel>
    <RadioContainer>
      {collections.map(({ name, address, imgSrc }) => (
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
          onChange={() => setSelectedCollection(address)}
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
          // onClick={() => setIsCustomDuration(true)}
        >
          Input Custom Address
        </CustomAddressButton>
      </CustomCheckboxContainer>
    </RadioContainer>
  </Container>
)

export { CollectionRadioButtons }
