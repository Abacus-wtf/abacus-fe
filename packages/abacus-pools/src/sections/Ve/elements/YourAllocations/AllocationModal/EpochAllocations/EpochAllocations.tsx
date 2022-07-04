import {
  useEpochAllocationAggregate,
  useEpochAllocations,
} from "@state/allocations/hooks"
import { Button, ButtonType, Input } from "abacus-ui"
import { formatEther } from "ethers/lib/utils"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { UserState } from "../AllocationModal"
import {
  ColumnTitle,
  SectionContainer,
  SectionHeader,
} from "../AllocationModal.styled"
import { EpochAllocationRow } from "./EpochAllocationRow"
import { Table, TR, TBody } from "./EpochAllocations.styled"

type EpochAllocationsProps = {
  userState: UserState
  setNewAllocation: React.Dispatch<string>
}

const ViewMoreButton = styled(Button)`
  align-self: center;
  color: ${({ theme }) => theme.colors.utility.blue};
  text-decoration: underline;
`

const EpochAllocations = ({
  userState,
  setNewAllocation,
}: EpochAllocationsProps) => {
  const [selectedAllocation, setSelectedAllocation] = useState("")
  const [customAddress, setCustomAddress] = useState("")
  const editMode = userState === UserState.WRITE
  const epochAllocatons = useEpochAllocations()
  const epochAllocationAggregate = useEpochAllocationAggregate()

  const allocations = epochAllocatons.map((allocation) => {
    const aggregate = Number(
      formatEther(epochAllocationAggregate?.amount ?? "1")
    )
    const amount = Number(formatEther(allocation.amount))
    return {
      ...allocation,
      address: allocation.address,
      percent: ((amount / aggregate) * 100).toLocaleString("en-US", {
        maximumSignificantDigits: 2,
        minimumSignificantDigits: 2,
      }),
    }
  })

  useEffect(() => {
    setNewAllocation(selectedAllocation || customAddress)
  }, [customAddress, selectedAllocation, setNewAllocation])

  return (
    <SectionContainer>
      <SectionHeader>Epoch Allocations</SectionHeader>
      {editMode && (
        <>
          <Input
            type="text"
            value={customAddress}
            onChange={(s) => {
              setSelectedAllocation("")
              setCustomAddress(s)
            }}
            placeholder="0X000000000000000000000"
            name="custom_address"
            label="Input Custom Collection Address"
          />
          <div style={{ marginBottom: "24px" }} />
        </>
      )}
      <Table>
        <TBody>
          <TR>
            <ColumnTitle as="th">#</ColumnTitle>
            <ColumnTitle as="th">Collection</ColumnTitle>
            <ColumnTitle as="th">Amount</ColumnTitle>
            <ColumnTitle as="th">%</ColumnTitle>
          </TR>
          {allocations.map((allocation, index) => (
            <EpochAllocationRow
              key={allocation.address}
              {...allocation}
              index={index}
              editMode={editMode}
              selectedAllocation={selectedAllocation}
              setSelectedAllocation={(s) => {
                setCustomAddress("")
                setSelectedAllocation(s)
              }}
            />
          ))}
        </TBody>
      </Table>
      <ViewMoreButton buttonType={ButtonType.Clear}>View More</ViewMoreButton>
    </SectionContainer>
  )
}

export { EpochAllocations }
