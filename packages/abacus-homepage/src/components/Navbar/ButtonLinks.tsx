import React, { FunctionComponent } from "react"
import { Button, ButtonType } from "abacus-ui"

type ButtonLinkProps = {
  openModal: () => void
}

const ButtonLinks: FunctionComponent<ButtonLinkProps> = ({ openModal }) => (
  <>
    <Button
      as="a"
      href="https://docs.google.com/document/d/1VriJSb1yBap3IoMckADAx60V582dYdSqa0Ihtpgx8Fs/edit#"
      buttonType={ButtonType.Clear}
    >
      Whitepaper
    </Button>
    <Button buttonType={ButtonType.White} onClick={openModal}>
      Launch App
    </Button>
  </>
)

export default ButtonLinks
