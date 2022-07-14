import GlobalLayout from "@layouts/index"
import { LendingNFT } from "@sections/index"
import { PageProps } from "gatsby"
import React from "react"

function PoolPage({ params, location }: PageProps) {
  let address,
    tokenId = ""
  try {
    const paths = params.id.split("/")
    address = paths[0]
    tokenId = paths[1]
  } catch {
    console.error("couldn't parse address or tokenId")
  }
  return (
    <GlobalLayout location={location}>
      <LendingNFT address={address} tokenId={tokenId} />
    </GlobalLayout>
  )
}

export default PoolPage
