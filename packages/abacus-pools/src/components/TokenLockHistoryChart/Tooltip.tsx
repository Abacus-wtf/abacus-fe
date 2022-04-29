import { H3, P } from "abacus-ui"
import moment from "moment"
import React from "react"
import styled from "styled-components"

const Container = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.utility.white};
  box-shadow: ${({ theme }) => theme.boxShadow.section};
  border-radius: ${({ theme }) => theme.borderRadius.section};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  column-gap: 24px;
`

const Title = styled(H3)`
  font-size: 14px;
  font-weight: bold;
`

const DataLabel = styled(P)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.core[900]};
`

const DataValue = styled(DataLabel)`
  color: ${({ theme }) => theme.colors.core.primary};
`

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { date, uv } = payload[0].payload
    return (
      <Container>
        <Title>{moment(date).format("MMM DD, yyyy")}</Title>
        <Wrapper>
          <DataLabel>Locked</DataLabel>
          <DataValue>{uv} ETH</DataValue>
        </Wrapper>
      </Container>
    )
  }

  return null
}

export { CustomTooltip }
