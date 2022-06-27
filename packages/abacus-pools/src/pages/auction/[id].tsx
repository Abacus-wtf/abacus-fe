import GlobalLayout from "@layouts/index"
import { Auction } from "@sections/index"
import { PageProps } from "gatsby"
import React from "react"

const AuctionsPage = ({ params, location }: PageProps) => (
  <GlobalLayout location={location}>
    <Auction vaultAddress={params.id} />
  </GlobalLayout>
)

export default AuctionsPage
