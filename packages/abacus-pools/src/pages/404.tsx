import NotFound from "@sections/NotFound"
import React from "react"

import { PageProps } from "gatsby"
import GlobalLayout from "@layouts/index"

const NotFoundPage = ({ location }: PageProps) => (
  <GlobalLayout location={location}>
    <NotFound />
  </GlobalLayout>
)

export default NotFoundPage
