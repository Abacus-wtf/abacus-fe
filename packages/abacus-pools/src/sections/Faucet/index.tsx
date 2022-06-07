import React from "react"
import Buttons from "@components/Button"
import { useOnFaucet } from "@hooks/faucetFunc"
import { useGetAbcBalance } from "@state/application/hooks"
import { Container } from "../../layouts/styles"

const FaucetPage: React.FC = () => {
  const { onFaucet, isPending } = useOnFaucet()
  const getAbcBalance = useGetAbcBalance()

  return (
    <Container>
      <Buttons
        style={{ fontSize: 24, padding: "16px 28px", margin: "0 auto" }}
        disabled={isPending}
        onClick={() =>
          onFaucet(() => {
            getAbcBalance()
          })
        }
      >
        {isPending ? "Loading..." : "Mint ABC"}
      </Buttons>
    </Container>
  )
}

export default FaucetPage
