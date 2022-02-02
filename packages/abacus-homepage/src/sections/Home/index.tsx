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
import styled from "styled-components"
import { Infographic, AbacusCrowdsIcon, AbacusSpotIcon } from "abacus-ui"

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
`

const InfographicDivider = styled.span`
  background: linear-gradient(180deg, #3e74ff 0%, rgba(147, 62, 255, 0) 100%);
  border-radius: 100px;
  width: 4px;
  margin: 50px 0;
`

const InfographicContainer = styled.div`
  display: flex;
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

  console.table({ nftsPriced, earned, riskFactor, spread, defender })

  return (
    <>
      <Superhero />
      <CalloutContainer>
        <Callout copy={`${defender} Ξ`} label="Treasury Size" />
        <Callout copy={nftsPriced} label="NFTs appraised" />
        <Callout copy={`${earned} Ξ`} label="NFTs appraised" />
      </CalloutContainer>
      <InfographicContainer>
        <Infographic
          imgSrc="/abacus_crowds_bg.png"
          icon={<AbacusCrowdsIcon />}
          title="Abacus Crowds"
          description="A short description about how Abacus Crowd works in a simple way."
          onClick={() => {
            console.log("click")
          }}
        />
        <InfographicDivider />
        <Infographic
          imgSrc="/abacus_spot_bg.png"
          icon={<AbacusSpotIcon />}
          title="Abacus Spot"
          description="A short description about how Abacus Spot works in a simple way."
          onClick={() => {
            console.log("click")
          }}
        />
      </InfographicContainer>
    </>
  )
}

export default Home
