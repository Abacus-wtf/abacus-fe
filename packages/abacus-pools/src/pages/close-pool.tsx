import GlobalLayout from "@layouts/index"
import { PageProps } from "gatsby"
import { ClosePool } from "@sections/index"
import React from "react"

const ClosePoolPage = ({ location }: PageProps) => (
  <GlobalLayout location={location}>
    <ClosePool location={location} />
  </GlobalLayout>
)

export default ClosePoolPage
