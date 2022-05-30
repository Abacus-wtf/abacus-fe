import { RoundImage } from "@components/RoundImage"
import { VeAllocation } from "@sections/Ve/models"
import { Checkbox, Checkmark, Font, Media, VisuallyHidden } from "abacus-ui"
import { formatEther } from "ethers/lib/utils"
import React from "react"
import styled from "styled-components"
import { TR } from "./EpochAllocations.styled"

interface EpochAllocationRowProps extends VeAllocation {
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
  background-color: ${({ theme, checked }) =>
    checked ? theme.colors.utility.green : theme.colors.utility.gray};

  & label {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 4px;
  }
`

const CollectionInfo = styled.td`
  display: flex;
  align-items: center;
  column-gap: 6px;
  flex-wrap: wrap;
`

const TD = styled.td`
  ${Font("kilo")}

  & span {
    color: ${({ theme }) => theme.colors.core[900]};
  }

  ${Media.lg`
    ${Font("giga")}
  `}
`

const RowNumber = styled(TD)`
  color: ${({ theme }) => theme.colors.core[800]};
`

const RADIO_NAME = "Epoch_allocation_row_radio_group"

const EpochAllocationRow = ({
  address,
  amount,
  name,
  imgSrc,
  percent,
  index,
  editMode,
  selectedAllocation,
  setSelectedAllocation,
}: EpochAllocationRowProps) => {
  const checked = selectedAllocation === address
  return (
    <TR>
      {editMode ? (
        <StyledCheckbox
          type="radio"
          name={RADIO_NAME}
          label={
            checked ? (
              <Checkmark stroke="#FFF" />
            ) : (
              <VisuallyHidden>{name}</VisuallyHidden>
            )
          }
          id={address}
          value={address}
          checked={checked}
          onChange={() => setSelectedAllocation(address)}
        />
      ) : (
        <RowNumber>{index + 1}.</RowNumber>
      )}

      <CollectionInfo>
        <RoundImage src={imgSrc} size={27} />
        <TD as="span">{name}</TD>
      </CollectionInfo>
      <TD>
        {formatEther(amount)} <span>veABC</span>
      </TD>
      <TD style={{ width: "max-content" }}>
        {percent}
        <span>%</span>
      </TD>
    </TR>
  )
}

export { EpochAllocationRow }
