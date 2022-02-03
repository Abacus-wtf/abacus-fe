import React, { useEffect } from "react"
import {
  ABC_TREASURY_ADDRESS,
  useWeb3Contract,
  SUBGRAPH,
} from "@components/useWeb3Contract"
import { formatEther } from "ethers/lib/utils"
import ABC_TREASURY from "@components/contracts/ABC_TREASURY.json"
import { request, gql } from "graphql-request"
import Superhero from "@components/Superhero"
import styled from "styled-components"
import { H2, SocialLinks, StatInfo, Media } from "abacus-ui"
import Navbar from "@components/Navbar"
import Infographics from "@components/Infographics"
import PreviousSessions from "@components/PreviousSessions"
import { StaticImage } from "gatsby-plugin-image"

const GET_NFT_PRICE_DATA = gql`
  query {
    nftsPriced(id: "0") {
      total
    }
  }
`

const StatInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 200px;

  ${Media.sm`
    flex-direction: row;
    justify-content: space-between;
    max-width: 800px;
    margin-right: auto;
    margin-left: auto;
  `}
`

const StyledStatInfo = styled(StatInfo)`
  margin-top: 1rem;

  &:first-of-type {
    margin-top: 0;
  }

  ${Media.sm`
    margin: 0;
  `}
`

const JoinUsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 300px 0;
  position: relative;
  overflow: hidden;
`

const JoinUsHeader = styled(H2)`
  font-size: 62;
  line-height: 120%;
  margin-bottom: 30px;
`

const JoinUsCubeContainer = styled.div<{ right?: string; left?: string }>`
  position: absolute;
  z-index: 0;
  right: ${({ right }) => right};
  left: ${({ left }) => left};
`

const social = {
  twitter: "https://twitter.com/abacus_wtf",
  discord: "https://discord.com/channels/861936155494842368/871084437306220564",
  medium: "https://medium.com/abacus-wtf",
}

const Home: React.FC = () => {
  const treasuryContract = useWeb3Contract(ABC_TREASURY)
  const [nftsPriced, setNftsPriced] = React.useState("-")
  const [earned, setEarned] = React.useState("-")
  // const [riskFactor, setRiskFactor] = React.useState("-")
  // const [spread, setSpread] = React.useState("-")
  const [defender, setDefender] = React.useState("-")

  useEffect(() => {
    const loadData = async () => {
      const [
        profitGenerated,
        nftsPricedContract,
        // riskFactorContract,
        // spreadContract,
        defenderContract,
      ] = await Promise.all([
        treasuryContract(ABC_TREASURY_ADDRESS).methods.profitGenerated().call(),
        request(SUBGRAPH, GET_NFT_PRICE_DATA, {}),
        treasuryContract(ABC_TREASURY_ADDRESS).methods.riskFactor().call(),
        treasuryContract(ABC_TREASURY_ADDRESS).methods.spread().call(),
        treasuryContract(ABC_TREASURY_ADDRESS).methods.defender().call(),
      ])
      setEarned(
        Number(formatEther(profitGenerated)).toLocaleString("en-us", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      )
      setNftsPriced(
        nftsPricedContract.nftsPriced ? nftsPricedContract.nftsPriced.total : 0
      )
      // setRiskFactor(riskFactorContract)
      // setSpread(spreadContract)
      setDefender(defenderContract)
    }
    loadData()
  }, [treasuryContract])

  return (
    <>
      <Superhero />
      <StatInfoContainer>
        <StyledStatInfo stat={defender} title="Treasury Size" showEthIcon />
        <StyledStatInfo stat={nftsPriced} title="NFTs appraised" />
        <StyledStatInfo stat={earned} title="NFTs appraised" showEthIcon />
      </StatInfoContainer>
      <Infographics />
      <PreviousSessions />
      <JoinUsContainer>
        <div style={{ zIndex: 1 }}>
          <JoinUsHeader>Join Our Community</JoinUsHeader>
          <SocialLinks {...social} size="30px" />
        </div>
        <JoinUsCubeContainer left="-25%">
          <StaticImage
            alt=""
            // style={{ height: 15 }}
            src="../../images/dark-cube-1.png"
          />
        </JoinUsCubeContainer>
        <JoinUsCubeContainer right="-15%">
          <StaticImage
            alt=""
            // style={{ height: 15 }}
            src="../../images/dark-cube-3.png"
          />
        </JoinUsCubeContainer>
      </JoinUsContainer>
      <Navbar footer />
      <div style={{ paddingBottom: "15px" }} />
    </>
  )
}

export default Home
