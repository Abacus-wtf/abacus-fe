import * as React from 'react';
import styled from 'styled-components'
import {Title} from '../../components/global.styles'
import TitleBG from '../../images/title_bg.png'
import EthSymbol from '../../images/eth.svg'
import Discord from '../../images/discord.svg'
import Twitter from '../../images/twitter.svg'
import { faMediumM } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button, {ButtonsWhite} from '@components/Button';
import {
    ArrowUpRight
} from 'react-feather'
import Link from 'gatsby-link'

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 4rem 0px;
`

const UpperContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`

const LowerContainer = styled.div`
    display: flex;
    grid-gap: 16px;
`

const MassiveTitle = styled(Title)`
    font-family: 'TerminaW05-Bold';
    font-size: 5rem;
    color: ${({theme}) => theme.colors.accent} !important;
    line-height: 150%;
    text-align: left;
    max-width: 65%;
    z-index: 1;
`

const TitleBackground = styled.img.attrs({
    src: TitleBG
})`
    position: absolute;
    z-index: 0;
    max-height: 420px;
    opacity: 0.6; 
`

const DataContainer = styled.div`
    grid-gap: 40px;
    display: flex;
    flex-direction: column
`

const DataPairContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const DataTitle = styled(Title)`
    color: ${({theme}) => theme.colors.text2} !important;
    font-size: 1rem;
    text-align: left;
    font-weight: normal;
    margin: 0px !important;
`

const DataValue = styled(Title)`
    font-size: 2rem;
    display: flex;
    grid-gap: 8px;
    margin: 0px !important;
`

const DataValueBlue = styled(DataValue)`
    color: ${({theme}) => theme.colors.accent} !important;
    font-size: 1.8rem;
`

const SocialButton = styled(ButtonsWhite)`
    padding: 14px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
`

const SocialIMG = styled.img`
    width: 23px;
    height: 23px;
    margin-top: -6px;
    margin-left: -1px;
`

interface EthValuePair {
    value: string
    title: string
    symbol: any
}

const DataPair = ({value, title, symbol}: EthValuePair) => {
    return (
        <DataPairContainer>
            <div style={{display: 'flex', gridGap: 8}}>
                <DataValue>{value}</DataValue>
                {symbol}
            </div>
            <DataTitle>{title}</DataTitle>
        </DataPairContainer>
    )
}

const Home: React.FC = () => {
    return (
        <HomeContainer>
            <UpperContainer>
                <MassiveTitle>Decentralized appraisal tool for NFTs</MassiveTitle>
                <TitleBackground />
                <DataContainer>
                    <DataPair value={'-'} title={'Earned'} symbol={<img src={EthSymbol}/>}/>
                    <DataPair value={'-'} title={'NFTs Priced'} symbol={<DataValueBlue>+</DataValueBlue>}/>
                    <DataPair value={'-'} title={'Issued'} symbol={<DataValueBlue>$ABC</DataValueBlue>}/>
                    <React.Fragment>
                        <Button data-tip={'Launch App'}  as={Link} to="/" style={{borderRadius: '50%', height: 65, width: 65, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <ArrowUpRight />
                        </Button>
                    </React.Fragment>
                </DataContainer>
            </UpperContainer>
            <LowerContainer>
                <SocialButton target={'_blank'} to="https://medium.com/abacus-wtf" as={Link}><FontAwesomeIcon style={{fontSize: 20, marginTop: -2}} icon={faMediumM} /></SocialButton>
                <SocialButton target={'_blank'} to="https://twitter.com/abacus_wtf" as={Link}><SocialIMG src={Twitter} /></SocialButton>
                <SocialButton target={'_blank'} to="https://discord.com/invite/WZUv4y5rPd" as={Link}><SocialIMG src={Discord} /></SocialButton>
            </LowerContainer>
        </HomeContainer>
    )
}

export default Home
