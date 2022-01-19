import GlobalLayout from "@layouts/index"
import Pool from "@sections/Pool"
import React from "react"

function PoolPage(props: any) {
  const { location } = props
  return (
    <GlobalLayout {...props}>
      <Pool location={location} />
    </GlobalLayout>
  )
}

export default PoolPage
