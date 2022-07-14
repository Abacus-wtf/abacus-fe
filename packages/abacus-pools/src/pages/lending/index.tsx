import GlobalLayout from "@layouts/index"
import { Lending } from "@sections/index"
import React from "react"

const IndexPage = (props: any) => (
  <GlobalLayout {...props}>
    <Lending />
  </GlobalLayout>
)

export default IndexPage
