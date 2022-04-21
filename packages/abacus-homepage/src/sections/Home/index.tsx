import React, { useCallback, useEffect, useState } from "react"
import {
  ABC_TREASURY_ADDRESS,
  useWeb3Contract,
  // SUBGRAPH,
} from "@components/useWeb3Contract"
import { formatEther } from "ethers/lib/utils"
import ABC_TREASURY from "@components/contracts/ABC_TREASURY.json"
// import { request, gql } from "graphql-request"
import Superhero from "@components/Superhero"
import styled from "styled-components"
import { StatInfo, Media } from "abacus-ui"
import Navbar from "@components/Navbar"
import Infographics from "@components/Infographics"
// import PreviousSessions from "@components/PreviousSessions"
import JoinUs from "@components/JoinUs"
import OpenAppModal from "@components/OpenAppModal"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Session, SubgraphPricingSession } from "@models/index"
// import { mapSessions } from "./mapSessions"

// const GET_NFT_PRICE_DATA = gql`
//   query {
//     nftsPriced(id: "0") {
//       total
//     }
//   }
// `

// const GET_PREVIOUS_SESSIONS = gql`
//   query {
//     pricingSessions(
//       first: 20
//       orderBy: createdAt
//       orderDirection: desc
//       where: { sessionStatus: 5 }
//     ) {
//       id
//       nftAddress
//       tokenId
//       nonce
//       finalAppraisalValue
//       totalStaked
//       bounty
//       numParticipants
//       maxAppraisal
//     }
//   }
// `

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nftsPriced, setNftsPriced] = React.useState("-")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [previousSessions, setPreviousSessions] = React.useState<Session[]>([])
  const [earned, setEarned] = React.useState("-")
  const [defender, setDefender] = React.useState("-")

  useEffect(() => {
    const loadData = async () => {
      const [
        profitGenerated,
        // nftsPricedContract,
        // pricingSessions,
        defenderContract,
      ] = await Promise.all([
        treasuryContract(ABC_TREASURY_ADDRESS).methods.profitGenerated().call(),
        // request(SUBGRAPH, GET_NFT_PRICE_DATA, {}),
        // request<{ pricingSessions: SubgraphPricingSession[] }>(
        //   SUBGRAPH,
        //   GET_PREVIOUS_SESSIONS,
        //   {}
        // ),
        treasuryContract(ABC_TREASURY_ADDRESS).methods.defender().call(),
      ])
      setEarned(
        Number(formatEther(profitGenerated)).toLocaleString("en-us", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      )
      setDefender(defenderContract)
      // setNftsPriced(
      //   nftsPricedContract.nftsPriced ? nftsPricedContract.nftsPriced.total : 0
      // )
      // const sessions = await mapSessions(pricingSessions.pricingSessions)
      // setPreviousSessions(sessions)
    }
    loadData()
  }, [treasuryContract])

  const openModal = useCallback(() => setModalOpen(true), [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  return (
    <>
      <Navbar openModal={openModal} />
      <Superhero openModal={openModal} previousSessions={previousSessions} />
      {/* <StatInfoContainer>
        <StyledStatInfo stat={earned} title="Earned" showEthIcon />
        <StyledStatInfo stat={nftsPriced} title="NFTs appraised" />
        <StyledStatInfo stat={defender} title="Defender" />
  </StatInfoContainer> */}
      <Infographics />
      {/* <PreviousSessions previousSessions={previousSessions} /> */}
      <JoinUs />
      <Navbar footer openModal={openModal} />
      <div style={{ paddingBottom: "15px" }} />

      <OpenAppModal isOpen={modalOpen} toggle={closeModal} />
    </>
  )
}

export default Home
