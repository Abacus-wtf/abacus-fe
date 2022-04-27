import { DropdownMenuStyled } from "@sections/Claim"
import { Dropdown, DropdownToggle, DropdownItem } from "shards-react"
import _ from "lodash"
import React, { useState } from "react"
import styled from "styled-components"

export const StatTitle = styled.div`
  font-weight: 400;
  font-size: 20px;
  padding: 10px 0px;
  display: flex;
  grid-gap: 16px;
  align-items: center;
`

export const TicketContainer = styled.div`
  max-height: 200px;
  overflow-y: scroll;
`

export const StatContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  border-bottom: 0.5px solid rgb(196, 196, 196);
`

interface StatProps {
  title: string
  value: any
}

export const Stat = ({ title, value }: StatProps) => (
  <StatContainer>
    <StatTitle>{title}</StatTitle>
    <StatTitle>
      <b>{value}</b>
    </StatTitle>
  </StatContainer>
)

interface StatWithEpochProps extends StatProps {
  changeEpoch: (epoch: number) => void
  epoch: number
}

export const StatWithEpoch = ({
  title,
  value,
  changeEpoch,
  epoch,
}: StatWithEpochProps) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <StatContainer>
      <StatTitle>
        {title}
        <Dropdown open={open} toggle={() => setOpen(!open)}>
          <DropdownToggle>Epoch #{epoch}</DropdownToggle>
          <DropdownMenuStyled>
            {_.map(_.range(0, 100), (i) => (
              <DropdownItem
                onClick={() => {
                  changeEpoch(i)
                }}
              >
                Epoch #{i}
              </DropdownItem>
            ))}
          </DropdownMenuStyled>
        </Dropdown>
      </StatTitle>
      <StatTitle>
        <b>{value}</b>
      </StatTitle>
    </StatContainer>
  )
}
