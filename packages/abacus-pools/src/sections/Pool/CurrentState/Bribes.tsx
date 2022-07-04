import { LoadingOverlay } from "@components/LoadingOverlay"
import { useOnAddToBribe, useWithdrawBribe } from "@hooks/bribeFunc"
import { useBribeData } from "@state/singlePoolData/hooks"
import { Button, ButtonType, Input, Kilo, Tera } from "abacus-ui"
import React, { useState } from "react"
import styled from "styled-components"
import { ConfirmButton } from "./CurrentState.styled"

const BribeCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;
  width: 100%;
`

const BribeContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  border: 1px solid #23ce7c;
  padding: 16px 25px;
  grid-gap: 8px;
  width: 100%;
  height: 110px;
`

const BribeRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 8px;
  width: 100%;
`

type BribesProps = {
  refreshPoolData: () => void
}

const Bribes = ({ refreshPoolData }: BribesProps) => {
  const { onAddToBribe, isPending: isPendingBribe } = useOnAddToBribe()
  const { onWithdrawBribe, isPending: isPendingWithdrawBribe } =
    useWithdrawBribe()
  const bribeData = useBribeData()
  const [bribeAmount, setBribeAmount] = useState("")
  return (
    <>
      <LoadingOverlay loading={isPendingBribe || isPendingWithdrawBribe} />
      <BribeCardContainer>
        <BribeContainer>
          <Kilo>Current Total Bribe</Kilo>
          <Tera>{bribeData ? bribeData.offeredBribeSize : 0} ETH</Tera>
        </BribeContainer>
        <BribeRightContainer>
          <BribeContainer style={{ border: "1px solid #3E74FF" }}>
            <Kilo>Your Bribe Submitted</Kilo>
            <Tera>{bribeData ? bribeData.bribeOfferedByUser : 0} ETH</Tera>
          </BribeContainer>
          {bribeData.bribeOfferedByUser !== 0 ? (
            <Button
              onClick={() =>
                onWithdrawBribe(
                  bribeData ? bribeData.bribeOfferedByUser : 0,
                  async () => {
                    await refreshPoolData()
                    setBribeAmount("")
                  }
                )
              }
              buttonType={ButtonType.Gray}
            >
              {isPendingWithdrawBribe ? "Pending..." : "Withdraw Bribe"}
            </Button>
          ) : (
            <></>
          )}
        </BribeRightContainer>
      </BribeCardContainer>
      <Input
        type="number"
        name="from_eth_bribe"
        value={bribeAmount}
        onChange={setBribeAmount}
        label="Amount to Bribe:"
        placeholder="0.00"
        pill="ETH"
      />
      <ConfirmButton
        disabled={isPendingBribe || bribeAmount === ""}
        onClick={() =>
          onAddToBribe(bribeAmount, async () => {
            await refreshPoolData()
            setBribeAmount("")
          })
        }
      >
        {isPendingBribe ? "Pending..." : "Add to Bribe"}
      </ConfirmButton>
    </>
  )
}

export { Bribes }
