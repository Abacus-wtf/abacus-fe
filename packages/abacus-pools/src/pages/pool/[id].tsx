import GlobalLayout from "@layouts/index"
import { Pool } from "@sections/index"
import { PageProps } from "gatsby"
import React from "react"

function PoolPage(props: PageProps) {
  const { params } = props
  const vaultId = params.id
  return (
    <GlobalLayout {...props}>
      <Pool vaultId={vaultId} />
    </GlobalLayout>
  )
}

export default PoolPage
