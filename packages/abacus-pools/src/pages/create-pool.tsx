import GlobalLayout from "@layouts/index"
import { PageProps } from "gatsby"
import { CreatePool } from "@sections/index"
import React from "react"

const CreatePoolPage = ({ location }: PageProps) => (
  <GlobalLayout location={location}>
    <CreatePool />
  </GlobalLayout>
)

export default CreatePoolPage
