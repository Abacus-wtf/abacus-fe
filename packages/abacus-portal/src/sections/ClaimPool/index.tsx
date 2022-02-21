import React, { FunctionComponent, useState, useEffect } from "react"
import {
  Button,
  InputWithTitle,
  InputWithTitleAndButton,
  SmallUniversalContainer,
  Title,
} from "abacus-components"
import { HorizontalListGroup } from "@components/ListGroupMods"
import { ListGroupItem } from "shards-react"
import {
  useOnClaimPayout,
  useOnDepositPrincipal,
  useOnClaimPrincipalAmount,
} from "@hooks/claim-pool"
import { useSetPayoutData, useClaimPayoutData } from "@state/miscData/hooks"
import { useActiveWeb3React } from "@hooks/index"
import ConnectWalletAlert from "@components/ConnectWalletAlert"
import styled from "styled-components"
import { useGetCurrentNetwork } from "@state/application/hooks"
import { FundCard, Yotta, AbacusBalance } from "abacus-ui"
import { Container, SplitContainer } from "@layouts/styles"
import { VerticalContainer } from "../CurrentSession_dep/CurrentSession.styles"

const ClaimPool: FunctionComponent = () => {
  const { account } = useActiveWeb3React()
  const [ethWithdrawalVal, setEthWithdrawalVal] = useState("")
  const [abcWithdrawalVal, setAbcWithdrawalVal] = useState("")
  const [ethDepositVal, setEthDepositVal] = useState("")
  const [claimPrincipalVal, setClaimPrincipalVal] = useState("")
  const [isEthButtonTrigger, setIsEthButtonTrigger] = useState(true)
  const [isLoading, setLoading] = useState(false)
  const networkSymbol = useGetCurrentNetwork()

  const claimData = useClaimPayoutData()
  const setPayoutData = useSetPayoutData()

  const { onClaim, isPending } = useOnClaimPayout()
  const { onDeposit, isPending: isPendingDeposit } = useOnDepositPrincipal()
  const { onClaimPrincipal, isPending: isPendingClaimPrincipal } =
    useOnClaimPrincipalAmount()

  const isEthPending = isPending && isEthButtonTrigger
  const isAbcPending = isPending && !isEthButtonTrigger

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await setPayoutData(account)
      setLoading(false)
    }
    if (
      account !== null &&
      account !== undefined &&
      claimData === null &&
      networkSymbol !== null
    ) {
      loadData()
    }
  }, [account, networkSymbol, claimData, setPayoutData])

  if (!account) {
    return (
      <SmallUniversalContainer
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <ConnectWalletAlert />
      </SmallUniversalContainer>
    )
  }

  if (isLoading || claimData === null) {
    return (
      <SmallUniversalContainer
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        Loading... {/* TODO: find a loader */}
      </SmallUniversalContainer>
    )
  }

  return (
    <Container style={{ maxWidth: 1080 }}>
      <Yotta style={{ fontFamily: "Bluu Next", textAlign: "center" }}>
        Abacus Credits
      </Yotta>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <AbacusBalance balance={1} />{" "}
      </div>
      <SplitContainer>
        <FundCard
          title="Deposit Funds"
          buttonTitle="Deposit Funds"
          onClick={() => {}}
        />
        <FundCard
          title="Withdraw Funds"
          buttonTitle="Transfer to Wallet"
          onClick={() => {}}
        />
      </SplitContainer>
    </Container>
  )
}

export default ClaimPool
