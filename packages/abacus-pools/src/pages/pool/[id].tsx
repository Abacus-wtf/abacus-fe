import GlobalLayout from "@layouts/index"
import { Pool } from "@sections/index"
import { PageProps } from "gatsby"
import React from "react"

function PoolPage({ params, location }: PageProps) {
  return (
    <GlobalLayout location={location}>
      <Pool vaultId={params.id} />
    </GlobalLayout>
  )
}

export default PoolPage
