import { useOnPurchaseTokens } from "@hooks/vaultFunc"
import { useEthToUSD } from "@state/application/hooks"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import {
  Button,
  Checkbox,
  Exa,
  Flex,
  Font,
  Input,
  Kilo,
  ProgressBar,
  ButtonType,
  Range,
} from "abacus-ui"
import { Link } from "gatsby"
import React, { FunctionComponent, useMemo, useState } from "react"
import styled from "styled-components"
import Loading from "../Loading"
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

const LockRadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  row-gap: 16px;
`

const LockRadioLabel = styled.label`
  ${Font("kilo")}
  font-size: 20px;
`

const LockRadioGroup = styled(Flex)`
  flex-wrap: wrap;
`

const CustomDurationButton = styled(Button)`
  display: block;
  border: 2px solid rgba(28, 35, 51, 0.04);
  border-radius: 70px;
  padding: 8px 14px;
  text-align: center;
  margin-right: 6px;
  margin-bottom: 12px;
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
  const [isCustomDuration, setIsCustomDuration] = useState(false)
  const ethUSD = useEthToUSD(Number(eth))
  const { tokenPrice, nftName, tokensLocked } = useGetPoolData()
  const { onPurchaseTokens, isPending } = useOnPurchaseTokens()

  const numTokensLocked = Number(tokensLocked ?? 0)
  const currentTicket = Math.floor(numTokensLocked / 1000) + 1
  const percentTicketsSold = numTokensLocked / 1000
  const numTokens = String(Number(eth) / Number(tokenPrice))

  const progressLabel = useMemo(() => {
    const percentForDislplay = Math.round(percentTicketsSold * 100)
    const numLeft = 1000 - numTokensLocked
    return (
      <ProgressLabel>
        <ProgressValue>{percentForDislplay}</ProgressValue>% filled /&nbsp;
        <ProgressValue>{numLeft}</ProgressValue>&nbsp;tokens left
      </ProgressLabel>
    )
  }, [numTokensLocked, percentTicketsSold])

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
      <Loading loading={isPending} />
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
      <LockRadioContainer>
        <Flex
          style={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            columnGap: "8px",
            rowGap: "16px",
          }}
        >
          <LockRadioLabel htmlFor="lock_duration">
            How long do you want to lock your deposit?
          </LockRadioLabel>
          <Link to="/learn-more">{"Learn More >"}</Link>
        </Flex>
        {isCustomDuration ? (
          <Range
            id="lock_duration"
            value={lockDuration}
            setValue={setLockDuration}
            min={customDurationConfig.min}
            max={customDurationConfig.max}
            outputFormatter={(value: number) => `${value}d`}
          />
        ) : (
          <LockRadioGroup>
            {durations.map((duration) => (
              <Checkbox
                key={duration.id}
                type="radio"
                name="lock_duration"
                label={duration.label}
                id={duration.id}
                value={duration.value}
                checked={lockDuration === Number(duration.value)}
                onChange={() => setLockDuration(Number(duration.value))}
              />
            ))}

            <CustomDurationButton
              buttonType={ButtonType.Clear}
              onClick={() => setIsCustomDuration(true)}
            >
              Custom
            </CustomDurationButton>
          </LockRadioGroup>
        )}
      </LockRadioContainer>
      <ConfirmButton disabled={confirmDisabled} onClick={purchaseTokens}>
        {isPending ? "Pending..." : "Confirm Purchase"}
      </ConfirmButton>
    </>
  )
}

export default PurchaseTokens
