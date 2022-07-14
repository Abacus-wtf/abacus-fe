import React from "react"

type LendingNFTProps = {
  address: string
  tokenId: string
}

const LendingNFT = ({ address, tokenId }: LendingNFTProps) => {
  console.table({ address, tokenId })
  return <></>
}

export { LendingNFT }
