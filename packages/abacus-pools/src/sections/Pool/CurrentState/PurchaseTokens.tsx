import { useOnPurchaseTokens } from "@hooks/vaultFunc"
import { useEthToUSD } from "@state/application/hooks"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { Button, Exa, Input, Kilo, ProgressBar } from "abacus-ui"
import { formatEther } from "ethers/lib/utils"

import React, { FunctionComponent, useMemo, useState } from "react"
import styled from "styled-components"
import { LoadingOverlay, LockTimeSelector } from "@components/index"
import { customDurationConfig, durations } from "./constants"

const UpperContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  grid-row-gap: 16px;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`

const Title = styled(Exa)`
  justify-self: flex-start;
  width: max-content;
  font-family: "Bluu next";
  line-height: 46px;
  flex-grow: 1;
`

const CurrentTicket = styled(Kilo)`
  display: flex;
  gap: 4px;
  width: max-content;
  justify-content: flex-end;
  color: ${({ theme }) => theme.colors.core.primary};
`

const CurrentTicketValue = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core.primary}60;
`

const ProgressLabel = styled.span`
  display: flex;
  color: ${({ theme }) => theme.colors.core["900"]};
`

const ProgressValue = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.core.primary};
`

const ConfirmButton = styled(Button)`
  width: 100%;
  padding: 22px;
  border-radius: 80px;
`

type PurchaseTokensProps = {
  refreshPoolData: () => void
}

const PurchaseTokens: FunctionComponent<PurchaseTokensProps> = ({
  refreshPoolData,
}) => {
  const [eth, setEth] = useState("")
  const [lockDuration, setLockDuration] = useState<number>(null)
  const ethUSD = useEthToUSD(Number(eth))
  const { tokenPrice, nftName, size } = useGetPoolData()
  const { onPurchaseTokens, isPending } = useOnPurchaseTokens()

  const numTokensLocked = Number(formatEther(size))
  const currentTicketTokensLocked = numTokensLocked % 1000
  const currentTicket = Math.floor(numTokensLocked / 1000) + 1
  const percentTicketsSold = currentTicketTokensLocked / 1000
  const numTokens = String(Number(eth) / Number(tokenPrice))

  const progressLabel = useMemo(() => {
    const percentForDislplay = Number(
      (percentTicketsSold * 100).toLocaleString("en-US", {
        minimumSignificantDigits: 2,
        maximumSignificantDigits: 2,
      })
    )
    const numLeft = 1000 - currentTicketTokensLocked
    return (
      <ProgressLabel>
        <ProgressValue>{percentForDislplay}</ProgressValue>% filled /&nbsp;
        <ProgressValue>{numLeft}</ProgressValue>&nbsp;tokens left
      </ProgressLabel>
    )
  }, [currentTicketTokensLocked, percentTicketsSold])

  const purchaseTokens = async () => {
    const duration = Math.round(lockDuration * 24 * 60 * 60)

    await onPurchaseTokens(numTokens, duration, async () => {
      // await getBalance()
      await refreshPoolData()
      setEth("")
    })
  }

  const confirmDisabled = !eth || !lockDuration || isPending

  return (
    <>
      <LoadingOverlay loading={isPending} />
      <UpperContainer>
        <TitleContainer>
          <CurrentTicket>
            Current Ticket:
            <CurrentTicketValue>#{currentTicket}</CurrentTicketValue>
          </CurrentTicket>
          <Title>Purchase Tokens</Title>
        </TitleContainer>
        <ProgressBar progress={percentTicketsSold} label={progressLabel} />
      </UpperContainer>
      <Input
        type="number"
        name="from_eth"
        value={eth}
        onChange={setEth}
        label="From:"
        placeholder="0.00"
        pill="ETH"
      />
      <Input
        disabled
        type="number"
        name="to_eth"
        value={numTokens}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onChange={() => {}}
        label="To:"
        placeholder="0.00"
        pill={nftName}
        hint={`$${ethUSD}`}
      />
      <LockTimeSelector
        label="How long do you want to lock your deposit?"
        learnMoreLink="/learn-more"
        lockDuration={lockDuration}
        setLockDuration={setLockDuration}
        durations={durations}
        customDurationConfig={customDurationConfig}
      />
      <ConfirmButton disabled={confirmDisabled} onClick={purchaseTokens}>
        {isPending ? "Pending..." : "Confirm Purchase"}
      </ConfirmButton>
    </>
  )
}

export default PurchaseTokens
