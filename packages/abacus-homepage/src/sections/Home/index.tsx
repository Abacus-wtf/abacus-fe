import React, { useEffect } from "react"
import {
  ABC_TREASURY_ADDRESS,
  useWeb3Contract,
  SUBGRAPH,
} from "@components/useWeb3Contract"
import { formatEther } from "ethers/lib/utils"
import ABC_TREASURY from "@components/contracts/ABC_TREASURY.json"
import { request, gql } from "graphql-request"
// import EthSymbol from "../../images/eth.svg"
import Superhero from "@components/Superhero"
import Callout from "@components/Callout"
import styled, { keyframes } from "styled-components"
import { H2, SessionCard, SocialLinks } from "abacus-ui"
import Navbar from "@components/Navbar"
import Infographics from "@components/Infographics"
import { StaticImage } from "gatsby-plugin-image"

const GET_NFT_PRICE_DATA = gql`
  query {
    nftsPriced(id: "0") {
      total
    }
  }
`

const CalloutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 200px;
  /* background: linear-gradient(black, transparent); */
`

const PreviousSessionsHeader = styled(H2)`
  font-size: 62px;
  line-height: 120px;
  font-family: "Bluu Next", serif;
  display: flex;
  justify-content: center;
  margin-top: 180px;
  margin-bottom: 60px;
`

const PreviousSessionsCarousel = styled.div`
  overflow: hidden;
  position: relative;
  height: 480px;
`

const slide = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
`

const PreviousSessionsWrapper = styled.div`
  position: absolute;
  display: flex;
  animation: ${slide} 100s linear infinite alternate;
`

const PreviousSessionContainer = styled.div`
  margin: 0 20px;
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

const previousSessions = [
  {
    imgSrc: "/img_example.png",
    title: "NFT Name",
    bounty: 0,
    participants: 0,
    appraisal: 0,
    id: 1,
  },
  {
    imgSrc: "/img_example.png",
    title: "NFT Name",
    bounty: 0,
    participants: 0,
    appraisal: 0,
    id: 2,
  },
  {
    imgSrc: "/img_example.png",
    title: "NFT Name",
    bounty: 0,
    participants: 0,
    appraisal: 0,
    id: 3,
  },
  {
    imgSrc: "/img_example.png",
    title: "NFT Name",
    bounty: 0,
    participants: 0,
    appraisal: 0,
    id: 4,
  },
  {
    imgSrc: "/img_example.png",
    title: "NFT Name",
    bounty: 0,
    participants: 0,
    appraisal: 0,
    id: 5,
  },
  {
    imgSrc: "/img_example.png",
    title: "NFT Name",
    bounty: 0,
    participants: 0,
    appraisal: 0,
    id: 6,
  },
  {
    imgSrc: "/img_example.png",
    title: "NFT Name",
    bounty: 0,
    participants: 0,
    appraisal: 0,
    id: 7,
  },
  {
    imgSrc: "/img_example.png",
    title: "NFT Name",
    bounty: 0,
    participants: 0,
    appraisal: 0,
    id: 8,
  },
  {
    imgSrc: "/img_example.png",
    title: "NFT Name",
    bounty: 0,
    participants: 0,
    appraisal: 0,
    id: 9,
  },
]

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
        riskFactorContract,
        spreadContract,
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
      setRiskFactor(riskFactorContract)
      setSpread(spreadContract)
      setDefender(defenderContract)
    }
    loadData()
  }, [treasuryContract])

  return (
    <>
      <Superhero />
      <CalloutContainer>
        <Callout copy={`${defender} Ξ`} label="Treasury Size" />
        <Callout copy={nftsPriced} label="NFTs appraised" />
        <Callout copy={`${earned} Ξ`} label="NFTs appraised" />
      </CalloutContainer>
      <Infographics />
      <PreviousSessionsHeader>Previous Sessions</PreviousSessionsHeader>
      <PreviousSessionsCarousel>
        <PreviousSessionsWrapper>
          {previousSessions.map((session) => (
            <PreviousSessionContainer key={session.id}>
              <SessionCard {...session} />
            </PreviousSessionContainer>
          ))}
        </PreviousSessionsWrapper>
      </PreviousSessionsCarousel>
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
      <Navbar />
      <div style={{ paddingBottom: "15px" }} />
    </>
  )
}

export default Home
