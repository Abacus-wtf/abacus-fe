import React, { FunctionComponent, useState, useEffect } from "react"
import {
  useOnClaimPayout,
  useOnDepositPrincipal,
  useOnClaimPrincipalAmount,
} from "@hooks/claim-pool"
import { useSetPayoutData, useClaimPayoutData } from "@state/miscData/hooks"
import { useActiveWeb3React } from "@hooks/index"
import { useGetCurrentNetwork } from "@state/application/hooks"
import {
  Yotta,
  AbacusBalance,
  Button,
  CardWithTitle,
  ButtonType,
  Input,
  H4,
} from "abacus-ui"
import { Container, SplitContainer } from "@layouts/styles"
import styled from "styled-components"

const FullWidthButton = styled(Button)`
  width: 100%;
`

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  margin-top: 40px;
`

const SectionTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
`

const Divider = styled.hr`
  height: 1px;
  width: 100%;
  border-color: ${({ theme }) => theme.colors.core.border};
`

const ClaimPool: FunctionComponent = () => {
  const { account } = useActiveWeb3React()
  const [ethWithdrawalVal, setEthWithdrawalVal] = useState("")
  const [abcWithdrawalVal, setAbcWithdrawalVal] = useState("")
  const [ethDepositVal, setEthDepositVal] = useState("")
  const [claimPrincipalVal, setClaimPrincipalVal] = useState("")
  const [isLoading, setLoading] = useState(false)
  const networkSymbol = useGetCurrentNetwork()

  const claimData = useClaimPayoutData()
  const setPayoutData = useSetPayoutData()

  const { onClaim, isPending: isPendingClaim } = useOnClaimPayout()
  const { onDeposit, isPending: isPendingDeposit } = useOnDepositPrincipal()
  const { onClaimPrincipal, isPending: isPendingClaimPrincipal } =
    useOnClaimPrincipalAmount()

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await setPayoutData(account)
      setLoading(false)
    }
    if (account && networkSymbol) {
      loadData()
    }
  }, [account, networkSymbol, setPayoutData])

  if (isLoading) {
    return (
      <div style={{ alignItems: "center", justifyContent: "center" }}>
        Loading... {/* TODO: find a loader */}
      </div>
    )
  }

  return (
    <Container>
      <Yotta style={{ fontFamily: "Bluu Next", textAlign: "center" }}>
        Abacus Credits
      </Yotta>

      <SectionTitle>
        <H4>Abacus Balance</H4>
        <AbacusBalance balance={Number(claimData?.ethCredit)} />
      </SectionTitle>
      <SplitContainer>
        <CardWithTitle
          noBorder
          style={{ justifyContent: "space-between" }}
          title="Deposit Funds"
        >
          <>
            <Input
              showEth
              placeholder="0"
              type="number"
              name="deposit_funds"
              value={ethDepositVal}
              onChange={(amount) => setEthDepositVal(amount)}
              disabled={!account}
            />
            <ButtonContainer>
              <FullWidthButton
                disabled={!ethDepositVal || !account || isPendingDeposit}
                buttonType={ButtonType.Standard}
                onClick={() => onDeposit(ethDepositVal)}
              >
                {isPendingDeposit ? "Depositing..." : "Deposit Funds"}
              </FullWidthButton>
            </ButtonContainer>
          </>
        </CardWithTitle>
        <CardWithTitle
          noBorder
          style={{ justifyContent: "space-between" }}
          title="Withdraw Funds"
        >
          <>
            <Input
              showEth
              placeholder="0"
              type="number"
              name="withdraw_funds"
              value={claimPrincipalVal}
              onChange={(amount) => setClaimPrincipalVal(amount)}
              disabled={!account}
            />
            <ButtonContainer>
              <Button
                onClick={() =>
                  setClaimPrincipalVal(String(claimData?.ethCredit))
                }
                buttonType={ButtonType.Gray}
              >
                Max
              </Button>
              <FullWidthButton
                disabled={
                  !claimPrincipalVal || !account || isPendingClaimPrincipal
                }
                buttonType={ButtonType.Standard}
                onClick={() => onClaimPrincipal(String(claimPrincipalVal))}
              >
                {isPendingClaimPrincipal
                  ? "Withdrawing..."
                  : "Transfer to Wallet"}
              </FullWidthButton>
            </ButtonContainer>
          </>
        </CardWithTitle>
      </SplitContainer>
      <Divider />
      <SectionTitle>
        <H4>Earnings</H4>
        <div style={{ display: "flex", gap: "16px" }}>
          <AbacusBalance balance={Number(claimData?.ethPayout)} />
          <AbacusBalance balance={Number(claimData?.abcPayout)} isEth={false} />
        </div>
      </SectionTitle>
      <SplitContainer>
        <CardWithTitle
          noBorder
          style={{ justifyContent: "space-between" }}
          title="Claim ETH"
        >
          <>
            <Input
              showEth
              placeholder="0"
              type="number"
              name="claim_eth"
              value={ethWithdrawalVal}
              onChange={(amount) => setEthWithdrawalVal(amount)}
              disabled={!account}
            />
            <ButtonContainer>
              <Button
                onClick={() =>
                  setEthWithdrawalVal(String(claimData?.ethPayout))
                }
                buttonType={ButtonType.Gray}
              >
                Max
              </Button>
              <FullWidthButton
                disabled={!ethWithdrawalVal || !account || isPendingClaim}
                buttonType={ButtonType.Standard}
                onClick={() => onClaim(true, ethWithdrawalVal)}
              >
                {isPendingDeposit ? "Claiming..." : "Claim ETH Payout"}
              </FullWidthButton>
            </ButtonContainer>
          </>
        </CardWithTitle>
        <CardWithTitle
          noBorder
          style={{ justifyContent: "space-between" }}
          title="Claim ABC"
        >
          <>
            <Input
              showEth
              placeholder="0"
              type="number"
              name="claim_abc"
              value={abcWithdrawalVal}
              onChange={(amount) => setAbcWithdrawalVal(amount)}
              disabled={!account}
            />
            <ButtonContainer>
              <Button
                onClick={() =>
                  setAbcWithdrawalVal(String(claimData?.abcPayout))
                }
                buttonType={ButtonType.Gray}
              >
                Max
              </Button>
              <FullWidthButton
                disabled={!abcWithdrawalVal || !account || isPendingClaim}
                buttonType={ButtonType.Standard}
                onClick={() => onClaim(false, String(abcWithdrawalVal))}
              >
                {isPendingClaimPrincipal ? "Claiming..." : "Claim ABC Payout"}
              </FullWidthButton>
            </ButtonContainer>
          </>
        </CardWithTitle>
      </SplitContainer>
    </Container>
  )
}

export default ClaimPool
