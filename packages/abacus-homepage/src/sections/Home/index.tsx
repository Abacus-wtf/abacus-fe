import {
  Superhero,
  Statistics,
  HotPools,
  HowItWorks,
  Tokenomics,
  JoinUs,
  CurrentAuctions,
} from "@components/index"
import React from "react"

const Home: React.FC = () => (
  <>
    <Superhero />
    <Statistics />
    <HotPools />
    <HowItWorks />
    <Tokenomics />
    <JoinUs />
    <CurrentAuctions />
  </>
)

export default Home
