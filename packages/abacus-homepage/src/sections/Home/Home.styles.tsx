import React, {useState} from 'react'
import {Tooltip} from 'shards-react'
import { Title } from "@components/global.styles"
import TitleBG from "../../images/title_bg.png"
import { ButtonsWhite } from "@components/Button"
import styled from 'styled-components'
import { Info } from "react-feather"

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem 0px;
`

export const UpperContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  @media ${({ theme }) => theme.media.phone} {
    flex-direction: row;
  }
`

export const LowerContainer = styled.div`
  display: flex;
  margin: 2rem 0;
  justify-content: center;
  grid-gap: 16px;
  @media ${({ theme }) => theme.media.phone} {
    justify-content: flex-start;
    position: unset;
  }
`

export const MassiveTitle = styled(Title)`
  font-family: "TerminaW05-Bold";
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.accent} !important;
  line-height: 150%;
  text-align: left;
  max-width: 65%;
  z-index: 1;
  @media ${({ theme }) => theme.media.phone} {
    font-size: 5rem;
  }
`

export const TitleBackground = styled.img.attrs({
  src: TitleBG,
})`
  width: calc(100% - 2rem);
  position: absolute;
  z-index: 0;
  max-height: 420px;
  opacity: 0.4;
  @media ${({ theme }) => theme.media.phone} {
    width: auto;
  }
`

export const DataContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media ${({ theme }) => theme.media.phone} {
    flex-direction: column;
    grid-gap: 40px;
  }
`

export const DataPairContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const DataTitle = styled(Title)`
  color: ${({ theme }) => theme.colors.text2} !important;
  font-size: 1rem;
  text-align: left;
  font-weight: normal;
  margin: 0px !important;
`

export const DataValue = styled(Title)`
  font-size: 2rem;
  display: flex;
  grid-gap: 8px;
  margin: 0px !important;
  margin-right: 8px !important;
`

export const DataValueBlue = styled(DataValue)`
  color: ${({ theme }) => theme.colors.accent} !important;
  font-size: 1.8rem;
`

export const SocialButton = styled(ButtonsWhite)`
  padding: 14px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 0 5px;
  @media ${({ theme }) => theme.media.phone} {
    margin: 0;
  }
`

export const SocialIMG = styled.img`
  width: 23px;
  height: 23px;
  margin-top: -6px;
  margin-left: -1px;
`

export const LaunchButtonContainer = styled.div`
  display: none;
  @media ${({ theme }) => theme.media.phone} {
    display: flex;
  }
`

interface EthValuePair {
  value: string
  title: string
  symbol: any
  tooltipText?: string
  tooltipId?: string
}

export const DataPair = ({ value, title, symbol, tooltipText, tooltipId }: EthValuePair) => {
  const [isToolTipOpen, setIsToolTipOpen] = useState(false)
  return (
    <DataPairContainer>
      <div style={{ display: "flex" }}>
        <DataValue>{value}</DataValue>
        {symbol} {tooltipText && 
        <>
          <Info id={tooltipId} style={{ height: 15, marginTop: 5 }} />
          <Tooltip
            open={isToolTipOpen}
            target={`#${tooltipId}`}
            toggle={() => setIsToolTipOpen(!isToolTipOpen)}
            placement="right"
            trigger="hover"
          >
            {tooltipText}
          </Tooltip>
        </>}
      </div>
      <DataTitle>{title}</DataTitle>
    </DataPairContainer>
  )
}