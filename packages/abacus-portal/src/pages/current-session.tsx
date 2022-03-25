import GlobalLayout from "@layouts/index"
import CurrentSession from "@sections/CurrentSession"
import { PageProps } from "gatsby"

import React from "react"

const CurrentSessionPage = ({ location }: PageProps) => (
  <GlobalLayout location={location}>
    <CurrentSession location={location} />
  </GlobalLayout>
)

export default CurrentSessionPage
