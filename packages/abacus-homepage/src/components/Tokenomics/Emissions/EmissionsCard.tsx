import { Exa, Giga, Media } from "abacus-ui"
import React, { FunctionComponent } from "react"
import styled from "styled-components"

const Emission = styled(Exa)`
  font-size: 30px;

  ${Media.md`
    font-size: 40px;
  `}
`

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.utility.white};
  border-radius: ${({ theme }) => theme.borderRadius.section};
  box-shadow: ${({ theme }) => theme.boxShadow.section};
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  text-align: center;
  width: 100%;
  position: relative;

  ${Media.sm`
    width: 20%;
    flex: 0 1 auto;
  `}

  &::after {
    content: "";
    position: absolute;
    width: 100px;
    height: 100px;
    top: -10px;
    border-radius: ${({ theme }) => theme.borderRadius.main};
    background-color: ${({ theme }) => theme.colors.utility.lightGreen};
    z-index: -1;
    left: 50%;
    transform: translateX(-50%);
  }

  &:last-of-type {
    background: #e9e8fa;
    border: 1px solid ${({ theme }) => theme.colors.utility.blue};

    &::after {
      background: #c5d5ff;
    }

    & ${Emission} {
      color: ${({ theme }) => theme.colors.utility.blue};
    }
  }
`

const Timeframe = styled(Giga)`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.core[900]};

  ${Media.md`
    font-size: 25px;
  `}
`

export type EmissionsCardProps = {
  emission: string
  timeframe: string
}

const EmissionsCard: FunctionComponent<EmissionsCardProps> = ({
  emission,
  timeframe,
}) => (
  <Container>
    <Emission>{emission}</Emission>
    <Timeframe>{timeframe}</Timeframe>
  </Container>
)

export { EmissionsCard }
