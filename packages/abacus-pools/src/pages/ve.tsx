import GlobalLayout from "@layouts/index"
import { Ve } from "@sections/index"
import React from "react"

function VePage(props: any) {
  return (
    <GlobalLayout {...props}>
      <Ve />
    </GlobalLayout>
  )
}

export default VePage
