import React, { useEffect, useState } from "react"
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
import { StatInfo, Media } from "abacus-ui"
import Navbar from "@components/Navbar"
import Infographics from "@components/Infographics"
import PreviousSessions from "@components/PreviousSessions"
import JoinUs from "@components/JoinUs"
import OpenAppModal from "@components/OpenAppModal"

const GET_NFT_PRICE_DATA = gql`
  query {
    nftsPriced(id: "0") {
      total
    }
  }
`

const HomeContainer = styled.div<{ modalOpen: boolean }>`
  ${({ modalOpen }) => (modalOpen ? "position: fixed;" : "")}
`

const StatInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;

  ${Media.sm`
    flex-direction: row;
    justify-content: space-between;
    max-width: 800px;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 200px;
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

const Home: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
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
      <HomeContainer modalOpen={modalOpen}>
        <Navbar openModal={() => setModalOpen(true)} />
        <Superhero openModal={() => setModalOpen(true)} />
        <StatInfoContainer>
          <StyledStatInfo stat={defender} title="Treasury Size" showEthIcon />
          <StyledStatInfo stat={nftsPriced} title="NFTs appraised" />
          <StyledStatInfo stat={earned} title="NFTs appraised" showEthIcon />
        </StatInfoContainer>
        <Infographics />
        <PreviousSessions />
        <JoinUs />
        <Navbar footer openModal={() => setModalOpen(true)} />
        <div style={{ paddingBottom: "15px" }} />
      </HomeContainer>
      <OpenAppModal isOpen={modalOpen} toggle={() => setModalOpen(false)} />
    </>
  )
}

export default Home
