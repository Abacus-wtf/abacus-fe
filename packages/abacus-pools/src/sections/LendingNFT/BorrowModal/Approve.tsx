import { LoadingOverlay } from "@components/LoadingOverlay"
import { useOnApproveLoan } from "@hooks/lendingFunc"
import { Button } from "abacus-ui"
import React from "react"
import { Container } from "../Modal.styled"
import { BorrowModalSteps } from "./steps"

type ApproveProps = {
  setStep: React.Dispatch<BorrowModalSteps>
  refresh: () => void
}

const Approve = ({ refresh, setStep }: ApproveProps) => {
  const { onApproveLoan, isPending } = useOnApproveLoan()

  const approve = () => {
    onApproveLoan(() => {
      setStep(BorrowModalSteps.Borrow)
      refresh()
    })
  }

  return (
    <>
      <LoadingOverlay loading={isPending} />
      <Container>
        Approve the Lending Contract to enable lending!
        <Button onClick={approve} disabled={isPending}>
          {isPending ? "tx pending..." : "Approve"}
        </Button>
      </Container>
    </>
  )
}

export { Approve }
