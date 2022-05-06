import GlobalLayout from "@layouts/index"
import { Auction } from "@sections/index"
import { PageProps } from "gatsby"
import React from "react"

const AuctionsPage = ({ location }: PageProps) => (
  <GlobalLayout location={location}>
    <Auction location={location} />
  </GlobalLayout>
)

export default AuctionsPage
