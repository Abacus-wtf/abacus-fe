import React from "react"
import { UniversalContainer } from "@components/global.styles"
import Buttons from "@components/Button"
import { useOnFaucet } from "@hooks/faucetFunc"

const FaucetPage: React.FC = () => {
  const { onFaucet, isPending } = useOnFaucet()

  return (
    <UniversalContainer style={{ gridGap: 30, alignItems: "center" }}>
      <Buttons
        style={{ fontSize: 24, padding: "16px 28px" }}
        disabled={isPending}
        onClick={() => onFaucet(() => {})}
      >
        {isPending ? "Loading..." : "Mint ABC"}
      </Buttons>
    </UniversalContainer>
  )
}

export default FaucetPage
