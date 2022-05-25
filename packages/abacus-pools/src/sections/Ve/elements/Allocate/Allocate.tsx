import { Input } from "abacus-ui"
import { formatEther } from "ethers/lib.esm/utils"
import React, { useState } from "react"
import { useOnAddAutoAllocation, useOnAllocateTokens } from "@hooks/veFunc"
import {
  SectionTitle,
  StyledSection,
  MaxButton,
  FullWidthButton,
} from "../Ve.styles"
import {
  AUTO_ALLOCATION,
  CollectionRadioButtons,
} from "./CollectionRadioButtons"

type AllocateProps = {
  veAbcBalance: string
  getVeData: () => void
}

const Allocate = ({ veAbcBalance, getVeData }: AllocateProps) => {
  const [abc, setAbc] = useState("")
  const [selectedCollection, setSelectedCollection] = useState("")
  const { onAddAutoAllocation, isPending: isPendingAddAuto } =
    useOnAddAutoAllocation()
  const { onAllocateTokens, isPending: isPendingAddAllocation } =
    useOnAllocateTokens()
  const isPending = isPendingAddAuto || isPendingAddAllocation
  const isAuto = selectedCollection === AUTO_ALLOCATION
  const onClick = isAuto
    ? () => onAddAutoAllocation(Number(abc), getVeData)
    : () => onAllocateTokens(selectedCollection, Number(abc), getVeData)

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
        pill={<MaxButton onClick={() => setAbc(veAbcBalance)}>Max</MaxButton>}
      />
      <CollectionRadioButtons
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
      />
      <FullWidthButton
        disabled={!selectedCollection || isPending}
        onClick={onClick}
      >
        {isPending ? "Allocating..." : "Allocate to Collection"}
      </FullWidthButton>
    </StyledSection>
  )
}

export { Allocate }
