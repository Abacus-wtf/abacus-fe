import GlobalLayout from "@layouts/index"
import MyPools from "@sections/MyPools"
import React from "react"

const MyPoolsPage = (props: any) => (
  <GlobalLayout {...props}>
    <MyPools />
  </GlobalLayout>
)

export default MyPoolsPage
