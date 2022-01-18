import React, { useEffect } from "react"
import { faMediumM } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "@components/Button"
import { ArrowUpRight } from "react-feather"
import Link from "gatsby-link"
import {
  ABC_TREASURY_ADDRESS,
  useWeb3Contract,
  SUBGRAPH,
} from "@components/useWeb3Contract"
import { formatEther } from "ethers/lib/utils"
import ABC_TREASURY from "@components/contracts/ABC_TREASURY.json"
import { request, gql } from "graphql-request"
import Notion from "../../images/notion.svg"
import Twitter from "../../images/twitter.svg"
import Discord from "../../images/discord.svg"
import EthSymbol from "../../images/eth.svg"
import {
  HomeContainer,
  UpperContainer,
  MassiveTitle,
  TitleBackground,
  DataContainer,
  DataPair,
  DataValueBlue,
  LaunchButtonContainer,
  LowerContainer,
  SocialButton,
  SocialIMG,
} from "./Home.styles"

const GET_NFT_PRICE_DATA = gql`
  query {
    nftsPriced(id: "0") {
      total
    }
  }
`

const Home: React.FC = () => {
  const treasuryContract = useWeb3Contract(ABC_TREASURY)
  const [nftsPriced, setNftsPriced] = React.useState("-")
  const [earned, setEarned] = React.useState("-")
  const [riskFactor, setRiskFactor] = React.useState("-")
  const [spread, setSpread] = React.useState("-")
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
    <HomeContainer>
      <UpperContainer>
        <MassiveTitle>Decentralized appraisal tool for NFTs</MassiveTitle>
        <TitleBackground />
        <DataContainer>
          <DataPair
            value={earned}
            title="Earned"
            symbol={<img src={EthSymbol} alt="" />}
          />
          <DataPair
            value={nftsPriced}
            title="NFTs Priced"
            symbol={<DataValueBlue>+</DataValueBlue>}
          />
          <DataPair
            value={spread}
            title="Spread"
            symbol={<DataValueBlue>🎯</DataValueBlue>}
            tooltipId="spread"
            tooltipText="The acceptable margin of error in which an appraiser is considered correct"
          />
          <DataPair
            value={defender}
            title="Defender"
            symbol={<DataValueBlue>🛡️</DataValueBlue>}
            tooltipId="defender"
            tooltipText="The tightness of appraisals allowed is determined by this value"
          />
          <DataPair
            value={riskFactor}
            title="Risk Factor"
            symbol={<DataValueBlue>⚖️</DataValueBlue>}
            tooltipId="riskfactor"
            tooltipText="The multiplier applied to amount harvested and sent to the profit pool"
          />
          <LaunchButtonContainer>
            <Button
              data-tip="Launch App"
              as="a"
              href="https://app.abacus.wtf"
              style={{
                borderRadius: "50%",
                height: 65,
                width: 65,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ArrowUpRight />
            </Button>
          </LaunchButtonContainer>
        </DataContainer>
      </UpperContainer>
      <LowerContainer>
        <SocialButton
          target="_blank"
          to="https://medium.com/abacus-wtf"
          as={Link}
        >
          <FontAwesomeIcon
            style={{ fontSize: 20, marginTop: -2 }}
            icon={faMediumM}
          />
        </SocialButton>
        <SocialButton
          target="_blank"
          to="https://twitter.com/abacus_wtf"
          as={Link}
        >
          <SocialIMG src={Twitter} alt="" />
        </SocialButton>
        <SocialButton
          target="_blank"
          to="http://discord.com/invite/abacus"
          as={Link}
        >
          <SocialIMG src={Discord} />
        </SocialButton>
        <SocialButton
          target="_blank"
          to="https://abcdao.notion.site/Knowledge-Center-903c10f39eb24efb8e55644a992f859b"
          as={Link}
        >
          <SocialIMG src={Notion} />
        </SocialButton>
      </LowerContainer>
    </HomeContainer>
  )
}

export default Home
