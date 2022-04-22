import { Superhero, Statistics, HotPools } from "@components/index"
import { PoolCardProps } from "@components/PoolCard"
import { BigNumber } from "@ethersproject/bignumber"

import React, { useState } from "react"

const TEMP_POOLS: PoolCardProps[] = [
  {
    imgSrc: "/temp_pool_src.png",
    poolName: "Doodle #2324",
    poolSize: BigNumber.from("23450000000000000000"),
  },
  {
    imgSrc: "/temp_pool_src.png",
    poolName: "Doodle #2324",
    poolSize: BigNumber.from("23450000000000000000"),
  },
  {
    imgSrc: "/temp_pool_src.png",
    poolName: "Doodle #2324",
    poolSize: BigNumber.from("23450000000000000000"),
  },
  {
    imgSrc: "/temp_pool_src.png",
    poolName: "Doodle #2324",
    poolSize: BigNumber.from("23450000000000000000"),
  },
]

const Home: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <Superhero openModal={() => setModalOpen(true)} />
      <Statistics />
      <HotPools pools={TEMP_POOLS} />
    </>
  )
}

export default Home
