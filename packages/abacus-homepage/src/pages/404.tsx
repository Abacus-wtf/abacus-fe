import NotFound from "@sections/NotFound"
import GlobalLayout from "@layouts/index"
import React from "react"

const NotFoundPage = (props: any) => (
  <GlobalLayout {...props}>
    <NotFound />
  </GlobalLayout>
)

export default NotFoundPage
