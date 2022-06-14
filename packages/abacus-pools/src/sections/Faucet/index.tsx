import React from "react"
import { useOnFaucet } from "@hooks/faucetFunc"
import { useGetAbcBalance } from "@state/application/hooks"
import { Button } from "abacus-ui"
import { Container } from "../../layouts/styles"

const FaucetPage: React.FC = () => {
  const { onFaucet, isPending } = useOnFaucet()
  const getAbcBalance = useGetAbcBalance()

  return (
    <Container>
      <Button
        disabled={isPending}
        onClick={() =>
          onFaucet(() => {
            getAbcBalance()
          })
        }
      >
        {isPending ? "Loading..." : "Mint ABC"}
      </Button>
    </Container>
  )
}

export default FaucetPage
