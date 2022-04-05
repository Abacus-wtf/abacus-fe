import GlobalLayout from "@layouts/index"
import { Pool } from "@sections/index"
import { PageProps } from "gatsby"
import React from "react"

function PoolPage(props: PageProps) {
  const { location } = props
  return (
    <GlobalLayout {...props}>
      <Pool location={location} />
    </GlobalLayout>
  )
}

export default PoolPage
