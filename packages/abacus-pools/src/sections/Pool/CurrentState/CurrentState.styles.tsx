import React from "react"
import styled from "styled-components"

export const StatTitle = styled.div`
  font-weight: 400;
  font-size: 20px;
  padding: 10px 0px;
`

export const TicketContainer = styled.div`
  max-height: 200px;
  overflow: scroll;
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
