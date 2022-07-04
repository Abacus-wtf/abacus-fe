import GlobalLayout from "@layouts/index"
import { PageProps } from "gatsby"
import { ClosePool } from "@sections/index"
import React from "react"

const ClosePoolPage = ({ params, location }: PageProps) => (
  <GlobalLayout location={location}>
    <ClosePool vaultAddress={params.id} />
  </GlobalLayout>
)

export default ClosePoolPage
