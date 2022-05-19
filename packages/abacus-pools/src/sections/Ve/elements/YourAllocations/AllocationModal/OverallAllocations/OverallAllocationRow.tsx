import { RoundImage } from "@components/RoundImage"
import { VeAllocation } from "@sections/Ve/models"
import { Checkbox, Font, Media } from "abacus-ui"
import { formatEther } from "ethers/lib/utils"
import React from "react"
import styled from "styled-components"
import { TR } from "./OverallAllocations.styled"

interface OverallAllocationRowProps extends VeAllocation {
  percent: number
  index: number
  editMode: boolean
  selectedAllocation: string
  setSelectedAllocation: React.Dispatch<string>
}

const StyledCheckbox = styled(Checkbox)`
  width: 27px;
  height: 27px;
  padding: 0;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.utility.gray};
`

const CollectionInfo = styled.td`
  display: flex;
  align-items: center;
  column-gap: 6px;
`

const TD = styled.td`
  ${Font("kilo")}

  & span {
    color: ${({ theme }) => theme.colors.core[900]};
  }

  ${Media.md`
    ${Font("giga")}
  `}
`

const RowNumber = styled(TD)`
  color: ${({ theme }) => theme.colors.core[800]};
`

const RADIO_NAME = "overall_allocation_row_radio_group"

const OverallAllocationRow = ({
  address,
  amount,
  collection,
  imgSrc,
  percent,
  index,
  editMode,
  selectedAllocation,
  setSelectedAllocation,
}: OverallAllocationRowProps) => (
  <TR>
    {editMode ? (
      <StyledCheckbox
        type="radio"
        name={RADIO_NAME}
        label=""
        id={address}
        value={address}
        checked={selectedAllocation === address}
        onChange={() => setSelectedAllocation(address)}
      />
    ) : (
      <RowNumber>{index + 1}.</RowNumber>
    )}

    <CollectionInfo>
      <RoundImage src={imgSrc} size={27} />
      <TD as="span">{collection}</TD>
    </CollectionInfo>
    <TD>
      {formatEther(amount)} <span>veABC</span>
    </TD>
    <TD style={{ width: "max-content" }}>
      {percent} <span>%</span>
    </TD>
  </TR>
)

export { OverallAllocationRow }
