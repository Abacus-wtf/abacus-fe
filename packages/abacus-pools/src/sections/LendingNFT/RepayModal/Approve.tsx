import { LoadingOverlay } from "@components/LoadingOverlay"
import { useOnApproveNETH } from "@hooks/lendingFunc"
import { useCurrentLendingNFT } from "@state/lending/hooks"

import { Button, Mega } from "abacus-ui"
import React, { useEffect } from "react"
import { Container } from "../Modal.styled"
import { RepayModalSteps } from "./steps"

type ApproveProps = {
  setStep: React.Dispatch<RepayModalSteps>
  refresh: () => void
}

const Approve = ({ refresh, setStep }: ApproveProps) => {
  const { repayApproved } = useCurrentLendingNFT()
  const { onApproveNETH, isPending } = useOnApproveNETH()

  useEffect(() => {
    if (repayApproved) {
      setStep(RepayModalSteps.Repay)
    }
  }, [repayApproved, setStep])

  const approve = () => {
    onApproveNETH(() => {
      setStep(RepayModalSteps.Repay)
      refresh()
    })
  }

  return (
    <>
      <LoadingOverlay loading={isPending} />
      <Container>
        <Mega>Set approval for your repayment!</Mega>
        <Button onClick={approve} disabled={isPending}>
          {isPending ? "tx pending..." : "Approve"}
        </Button>
      </Container>
    </>
  )
}

export { Approve }
