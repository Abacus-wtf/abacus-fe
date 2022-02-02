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

  console.table({ nftsPriced, earned, riskFactor, spread, defender })

  return (
    <>
      <Superhero />
    </>
  )
}

export default Home
