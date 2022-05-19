import { Input } from "abacus-ui"
import React, { useState } from "react"
import {
  SectionTitle,
  StyledSection,
  MaxButton,
  FullWidthButton,
} from "../Ve.styles"
import { CollectionRadioButtons } from "./CollectionRadioButtons"

const collections = [
  {
    name: "Doodles",
    address: "doodles",
    imgSrc: "/vomit.png",
  },
  {
    name: "Cryptopunks",
    address: "Cryptopunks",
    imgSrc: "/vomit.png",
  },
  {
    name: "Bored Apes",
    address: "Bored Apes",
    imgSrc: "/vomit.png",
  },
  {
    name: "Azuki",
    address: "Azuki",
    imgSrc: "/vomit.png",
  },
]

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
        collections={collections}
      />
      <FullWidthButton>Allocate to Collection</FullWidthButton>
    </StyledSection>
  )
}

export { Allocate }
