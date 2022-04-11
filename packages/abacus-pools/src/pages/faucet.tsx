import GlobalLayout from "@layouts/index"
import Faucet from "@sections/Faucet"
import React from "react"

const FaucetPage = (props: any) => (
  <GlobalLayout {...props}>
    <Faucet />
  </GlobalLayout>
)

export default FaucetPage
