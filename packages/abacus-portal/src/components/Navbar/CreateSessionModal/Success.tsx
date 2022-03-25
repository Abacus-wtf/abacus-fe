import { Kilo } from "abacus-ui"
import React, { FunctionComponent } from "react"

const Success: FunctionComponent = () => (
  <Kilo style={{ padding: "40px" }}>
    Your session was successfully created.
    <br />
    <br /> It may take a moment to propagate, so please wait a minute, and then
    refresh the page to see your new session!
  </Kilo>
)

export default Success
