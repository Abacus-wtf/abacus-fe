import React, { FunctionComponent, useMemo } from "react"
import styled, { keyframes } from "styled-components"
import { Kilo, Media } from "abacus-ui"
import { Session } from "@models/index"

const Container = styled.div`
  margin-top: 6rem;
  width: 100%;
  height: 120px;
  display: flex;
  overflow: visible;
  justify-content: space-around;

  ${Media.md`
    height: 280px;
    margin-top: 1rem;
  `}
`

type Indexed = {
  index: number
}

const getSize = (index: number) => {
  switch (index) {
    case 0:
      return "8.5rem"
    case 1:
      return "7.5rem"
    default:
      return "6rem"
  }
}

const getGradient = (index: number) => {
  switch (index) {
    case 0:
      return "linear-gradient(180deg, #45AAD4 0%, rgba(124, 132, 211, 0) 100%);"
    case 1:
      return "linear-gradient(180deg, #F59EE5 0%, rgba(125, 238, 204, 0) 100%);"
    case 3:
      return "linear-gradient(180deg, #FEFF78 0%, rgba(69, 0, 199, 0) 100%);"
    default:
      return "linear-gradient(180deg, #FF7878 0%, rgba(69, 0, 199, 0) 100%);"
  }
}

const getOrder = (index: number) => {
  switch (index) {
    case 0:
      return "0"
    case 1:
      return "3"
    case 3:
      return "1"
    default:
      return "2"
  }
}

const getHeight = (index: number) => {
  switch (index) {
    case 0:
      return "40px"
    case 1:
      return "80px"
    case 3:
      return "120px"
    default:
      return "200px"
  }
}

const PopUp = styled.div<Indexed>`
  position: relative;
  overflow: visible;
  display: ${({ index }) => (index < 2 ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  order: ${({ index }) => getOrder(index)};
  height: 100%;

  ${Media.md`
    display: flex;
  `}
`

const PopUpImg = styled.img<Indexed>`
  filter: drop-shadow(0px 2px 32px rgba(0, 0, 0, 0.06));
  border-radius: 8px;
  width: 6rem;
  height: 6rem;

  ${Media.md`
    width: ${({ index }) => getSize(index)};
    height: ${({ index }) => getSize(index)};
  `}
`

const TextWrapper = styled.div`
  display: flex;
  padding: 20px 0;
  align-items: center;
  flex-direction: column;

  ${Media.md`
    flex-direction: row;
  `}
`

const BoldKilo = styled(Kilo)`
  font-weight: bold;
  text-transform: uppercase;
  margin-right: 4px;
`

const TransparentKilo = styled(Kilo)`
  font-weight: 400;
  opacity: 0.6;
`

const grow = (height) => keyframes`
  from {
    min-height: 0;
  } 
  to {
    min-height: calc(100% - ${height});
  }
`

const GradientLine = styled.div<Indexed>`
  width: 2px;
  min-height: 0;
  background: ${({ index }) => getGradient(index)};

  transform: min-height 2s ease;

  animation: ${grow("20px")} 2s ease forwards;

  ${Media.md`
    animation: ${({ index }) => grow(getHeight(index))} 2s ease forwards;
  `}
`

type PopupsProps = {
  previousSessions: Session[]
}

const Popups: FunctionComponent<PopupsProps> = ({ previousSessions }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const items = useMemo<Session[]>(
    () => previousSessions.slice(0, 4),
    [previousSessions]
  )
  return (
    <Container>
      {items.map((item, index) => (
        <PopUp key={item.id} index={index}>
          <PopUpImg alt="" src={item.imgSrc} index={index} />
          <TextWrapper>
            <BoldKilo>{item.appraisal} ETH</BoldKilo>
            <TransparentKilo>@{item.owner}</TransparentKilo>
          </TextWrapper>
          <GradientLine index={index} />
        </PopUp>
      ))}
    </Container>
  )
}

export default Popups
