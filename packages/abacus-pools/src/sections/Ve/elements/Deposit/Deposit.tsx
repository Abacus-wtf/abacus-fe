import { LoadingOverlay } from "@components/index"
import { useOnDepoistAbc } from "@hooks/veFunc"
import { useVeData } from "@sections/Ve/useVeData"
import { Input } from "abacus-ui"
import { parseEther } from "ethers/lib/utils"
import React, { useState } from "react"
import {
  SectionTitle,
  StyledSection,
  MaxButton,
  FullWidthButton,
} from "../Ve.styles"

type DepositProps = {
  refreshVeState: () => void
}

const Deposit = ({ refreshVeState }: DepositProps) => {
  const { abcMaxBalance } = useVeData()
  const [abc, setAbc] = useState("")
  const { onDepoistAbc, isPending: isPendingDeposit } = useOnDepoistAbc()

  const onClick = async () => {
    if (!isPendingDeposit) {
      onDepoistAbc(parseEther(abc).toString(), () => {
        setAbc("")
        refreshVeState()
      })
    }
  }

  const buttonDisabled = isPendingDeposit || !abc
  return (
    <StyledSection order={3} style={{ rowGap: "32px", height: "max-content" }}>
      <LoadingOverlay loading={isPendingDeposit} />
      <SectionTitle>Deposit</SectionTitle>
      <Input
        label="ABC amount you want to deposit"
        type="number"
        name="deposit_abc"
        value={abc}
        onChange={setAbc}
        placeholder="0.00"
        pill={<MaxButton onClick={() => setAbc(abcMaxBalance)}>Max</MaxButton>}
      />
      <FullWidthButton onClick={onClick} disabled={buttonDisabled}>
        {isPendingDeposit ? "Depositing..." : "Deposit Tokens"}
      </FullWidthButton>
    </StyledSection>
  )
}

export { Deposit }
