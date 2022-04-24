import {
  Superhero,
  Statistics,
  HotPools,
  HowItWorks,
  Tokenomics,
  JoinUs,
} from "@components/index"

import React, { useState } from "react"

const Home: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <Superhero openModal={() => setModalOpen(true)} />
      <Statistics />
      <HotPools />
      <HowItWorks />
      <Tokenomics />
      <JoinUs />
    </>
  )
}

export default Home
