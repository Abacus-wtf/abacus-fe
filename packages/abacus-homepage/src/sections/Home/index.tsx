import { Superhero, Statistics } from "@components/index"

import React, { useState } from "react"

const Home: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <Superhero openModal={() => setModalOpen(true)} />
      <Statistics />
    </>
  )
}

export default Home
