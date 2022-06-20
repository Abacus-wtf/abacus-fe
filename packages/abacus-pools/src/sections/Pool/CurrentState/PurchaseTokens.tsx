import { useOnPurchaseTokens } from "@hooks/vaultFunc"
import { useEthToUSD } from "@state/application/hooks"
import { useBribeData, useGetPoolData } from "@state/singlePoolData/hooks"
import {
  Button,
  ButtonType,
  Checkbox,
  Exa,
  Input,
  Kilo,
  ProgressBar,
  Tera,
} from "abacus-ui"
import { formatEther } from "ethers/lib/utils"

import React, { FunctionComponent, useMemo, useState } from "react"
import styled from "styled-components"
import { LoadingOverlay, LockTimeSelector } from "@components/index"
import { useOnAddToBribe, useWithdrawBribe } from "@hooks/bribeFunc"
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

const PageContainer = styled.div`
  display: flex;
  grid-gap: 8px;
`

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

enum Page {
  Market = "Market",
  Bribe = "Bribe",
}

type PurchaseTokensProps = {
  refreshPoolData: () => void
}

const PurchaseTokens: FunctionComponent<PurchaseTokensProps> = ({
  refreshPoolData,
}) => {
  const bribeData = useBribeData()
  const [bribeAmount, setBribeAmount] = useState("")
  const [eth, setEth] = useState("")
  const [page, setPage] = useState(Page.Market)
  const [lockDuration, setLockDuration] = useState<number>(null)
  const ethUSD = useEthToUSD(Number(eth))
  const { tokenPrice, name, size } = useGetPoolData()
  const { onPurchaseTokens, isPending } = useOnPurchaseTokens()
  const { onAddToBribe, isPending: isPendingBribe } = useOnAddToBribe()
  const { onWithdrawBribe, isPending: isPendingWithdrawBribe } =
    useWithdrawBribe()

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
      <LoadingOverlay
        loading={isPending || isPendingBribe || isPendingWithdrawBribe}
      />
      <UpperContainer>
        <TitleContainer>
          <CurrentTicket>
            Current Ticket:
            <CurrentTicketValue>#{currentTicket}</CurrentTicketValue>
          </CurrentTicket>
          <Title>Purchase Tokens</Title>
        </TitleContainer>
        <ProgressBar progress={percentTicketsSold} label={progressLabel} />
        <PageContainer>
          <Checkbox
            key={Page.Market}
            type="radio"
            name="lock_duration"
            label={Page.Market}
            id={Page.Market}
            value={Page.Market}
            checked={page === Page.Market}
            onChange={() => setPage(Page.Market)}
          />
          <Checkbox
            key={Page.Bribe}
            type="radio"
            name="lock_duration"
            label={Page.Bribe}
            id={Page.Bribe}
            value={Page.Bribe}
            checked={page === Page.Bribe}
            onChange={() => setPage(Page.Bribe)}
          />
        </PageContainer>
      </UpperContainer>
      {page === Page.Market ? (
        <>
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
            pill={name}
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
      ) : (
        <>
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
      )}
    </>
  )
}

export default PurchaseTokens
