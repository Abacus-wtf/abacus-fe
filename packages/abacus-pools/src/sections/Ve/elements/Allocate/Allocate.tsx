import { Input } from "abacus-ui"
import React, { useState } from "react"
import {
  SectionTitle,
  StyledSection,
  MaxButton,
  FullWidthButton,
} from "../Ve.styles"
import { CollectionRadioButtons } from "./CollectionRadioButtons"

const Allocate = () => {
  const [abc, setAbc] = useState("")
  const [selectedCollection, setSelectedCollection] = useState("")
  return (
    <StyledSection order={4} style={{ rowGap: "32px" }}>
      <SectionTitle>Allocate</SectionTitle>
      <Input
        label="ABC amount you want to allocate "
        type="number"
        name="allocate_abc"
        value={abc}
        onChange={setAbc}
        placeholder="0.00"
        pill={<MaxButton>Max</MaxButton>}
      />
      <CollectionRadioButtons
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
      />
      <FullWidthButton>Allocate to Collection</FullWidthButton>
    </StyledSection>
  )
}

export { Allocate }
