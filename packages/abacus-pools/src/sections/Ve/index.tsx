import React, { useEffect, useState } from "react"
import { UniversalContainer } from "@components/global.styles"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "shards-react"
import { ABC_TOKEN, VE_ABC_TOKEN, ZERO_ADDRESS } from "@config/constants"
import _ from "lodash"
import { useActiveWeb3React, useMultiCall, useWeb3Contract } from "@hooks/index"
import { formatEther } from "ethers/lib/utils"
import { Stat } from "@sections/Pool/CurrentState/CurrentState.styles"
import { BigNumber } from "@ethersproject/bignumber"
import moment from "moment"
import { SplitContainer, ButtonContainer } from "@sections/Pool/Pool.styles"
import Button from "@components/Button"
import {
  useOnAddAllocation,
  useOnAddAutoAllocation,
  useOnAddTokens,
  // useOnChangeAllocation,
  useOnLockTokens,
  useOnRemoveAllocation,
  useOnRemoveAutoAllocation,
  useOnUnlockTokens,
} from "@hooks/veFunc"
import styled from "styled-components"
import { InputWithTitle, InputWithTitleAndButton } from "@components/Input"
import {
  InfoSectionContainer,
  InputContainer,
  BORDER,
} from "@sections/Pool/CurrentState/AMM.styles"
import { DatePickerStyled } from "@sections/Pool/CurrentState/AMM"
import VE_ABC_ABI from "../../config/contracts/VE_ABC_TOKEN_ABI.json"
import ABC_ABI from "../../config/contracts/ABC_TOKEN_ABI.json"

const Card = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 10px;
  border-radius: 20px;
  border: 0.5px solid rgb(196, 196, 196);
  align-items: center;
  justify-content: center;
  padding: 26px;
`

const StyledSplitContainer = styled(SplitContainer)`
  grid-template-columns: 1fr 1fr;
`

interface Holder {
  timeUnlock: number
  amountLocked: number
  multiplier: number
  amountAllocated: number
  amountAutoAllocated: number
  veBalanceUpdates: number
  autoUpdates: number
}

interface EpochData {
  epochClaimedVe: boolean
  epochClaimedAuto: boolean
  veStartEpoch: number
  veStartEpochAmount: number
  autoStartEpoch: number
  autoStartEpochAmount: number
}

const FullWidthButton = styled(Button)`
  width: 100%;
`

const Ve: React.FC = () => {
  const { account } = useActiveWeb3React()
  const [open, setOpen] = useState(false)
  const [epoch, setEpoch] = useState(0)
  const [abcMaxBalance, setABCMaxBalance] = useState(0)
  const [veAbcBalance, setVeAbcBalance] = useState("")
  const [abcInput, setABCInput] = useState("")
  const [holderData, setHolderData] = useState<Holder | null>(null)
  const [epochData, setEpochData] = useState<EpochData | null>(null)
  const [allocateAddress, setAllocateAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [startDate, setStartDate] = useState(new Date())
  const [showUnlockTokensButton, setShowUnlockTokensButton] = useState(false)

  const veAbcCall = useMultiCall(VE_ABC_ABI)
  const abcCall = useWeb3Contract(ABC_ABI)
  const { onAddAutoAllocation, isPending: isPendingAddAuto } =
    useOnAddAutoAllocation()
  const { onAddTokens, isPending: isPendingAddTokens } = useOnAddTokens()
  const { onLockTokens, isPending: isPendingLockTokens } = useOnLockTokens()
  const { onAddAllocation, isPending: isPendingAddAllocation } =
    useOnAddAllocation()
  const { onRemoveAutoAllocation, isPending: isPendingRemoveAutoAllocation } =
    useOnRemoveAutoAllocation()
  const { onRemoveAllocation, isPending: isPendingRemoveAllocation } =
    useOnRemoveAllocation()
  const { onUnlockTokens, isPending: isPendingUnlockTokens } =
    useOnUnlockTokens()
  // const { onChangeAllocation, isPending: isPendingChangeAllocation } =
  //  useOnChangeAllocation()

  const getClaimData = async () => {
    const [[veHolderHistory, getHolderEpochInfo, veBalance], balance] =
      await Promise.all([
        veAbcCall(
          VE_ABC_TOKEN,
          ["veHolderHistory", "getHolderEpochInfo", "balanceOf"],
          [[account], [account, epoch], [account]]
        ),
        abcCall(ABC_TOKEN).methods.balanceOf(account).call(),
      ])

    setShowUnlockTokensButton(
      Number(formatEther(veHolderHistory[3])) === 0 &&
        BigNumber.from(veHolderHistory[0]).toNumber() < moment().unix()
    )
    setVeAbcBalance(formatEther(veBalance[0]))
    setABCMaxBalance(balance)
    setHolderData({
      timeUnlock: BigNumber.from(veHolderHistory[0]).toNumber(),
      amountLocked: Number(formatEther(veHolderHistory[1])),
      multiplier: BigNumber.from(veHolderHistory[2]).toNumber(),
      amountAllocated: Number(formatEther(veHolderHistory[3])),
      amountAutoAllocated: Number(formatEther(veHolderHistory[4])),
      veBalanceUpdates: Number(formatEther(veHolderHistory[5])),
      autoUpdates: Number(formatEther(veHolderHistory[6])),
    })

    setEpochData({
      epochClaimedVe: getHolderEpochInfo[0],
      epochClaimedAuto: getHolderEpochInfo[1],
      veStartEpoch: BigNumber.from(getHolderEpochInfo[2]).toNumber(),
      veStartEpochAmount: Number(formatEther(getHolderEpochInfo[3])),
      autoStartEpoch: BigNumber.from(getHolderEpochInfo[4]).toNumber(),
      autoStartEpochAmount: Number(formatEther(getHolderEpochInfo[5])),
    })
  }

  useEffect(() => {
    if (account) {
      try {
        getClaimData()
      } catch (e) {
        console.error(e)
      }
    }
  }, [epoch, account])

  if (holderData === null || epochData === null) {
    return (
      <UniversalContainer style={{ textAlign: "center" }}>
        Loading...
      </UniversalContainer>
    )
  }

  return (
    <UniversalContainer style={{ gridGap: 30, alignItems: "center" }}>
      <div style={{ display: "flex", gridGap: 30 }}>
        <Dropdown open={open} toggle={() => setOpen(!open)}>
          <DropdownToggle style={{ minWidth: 130 }}>
            Epoch #{epoch}
          </DropdownToggle>
          <DropdownMenu>
            {_.map(_.range(0, 100), (i) => (
              <DropdownItem onClick={() => setEpoch(i)}>
                Epoch #{i}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        {showUnlockTokensButton && (
          <FullWidthButton
            disabled={isPendingUnlockTokens}
            onClick={() => onUnlockTokens(() => getClaimData())}
          >
            {isPendingUnlockTokens ? "Loading..." : "Unlock Tokens"}
          </FullWidthButton>
        )}
      </div>
      <StyledSplitContainer>
        <Stat
          title="Unlock Time:"
          value={
            holderData.timeUnlock === 0
              ? "N/A"
              : moment(holderData.timeUnlock).format()
          }
        />
        <Stat title="Amount Locked:" value={holderData.amountLocked} />
      </StyledSplitContainer>
      <StyledSplitContainer>
        <Stat
          title="Total Amount Allocated:"
          value={holderData.amountAllocated}
        />
        <Stat
          title="Total Amount Auto-Allocated:"
          value={holderData.amountAutoAllocated}
        />
      </StyledSplitContainer>
      <StyledSplitContainer>
        <Card>
          <InfoSectionContainer>
            <InputContainer
              style={{
                border: BORDER,
                borderRadius: 15,
              }}
            >
              <InputWithTitleAndButton
                title="ABC To Lock"
                placeholder="0"
                type="number"
                name="amount"
                value={abcInput}
                onChange={(change) => setABCInput(change)}
                disabled={!account}
                buttonText="Max"
                onClick={() => setABCInput(`${abcMaxBalance}`)}
                id="abcAmount"
              />
            </InputContainer>
          </InfoSectionContainer>
          {Number(veAbcBalance) === 0 && (
            <DatePickerStyled
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
            />
          )}
          <FullWidthButton
            disabled={!abcInput || isPendingAddTokens || isPendingLockTokens}
            onClick={() =>
              Number(veAbcBalance) === 0
                ? onLockTokens(
                    Number(abcInput),
                    moment(startDate).unix() - moment().unix(),
                    () => getClaimData()
                  )
                : onAddTokens(Number(amount), () => getClaimData())
            }
          >
            {isPendingAddTokens || isPendingLockTokens
              ? "Loading..."
              : Number(veAbcBalance) === 0
              ? "Lock Tokens"
              : "Lock More Tokens"}
          </FullWidthButton>
        </Card>
        <Card>
          <InfoSectionContainer>
            <InputContainer
              style={{
                border: BORDER,
                borderRadius: 15,
              }}
            >
              <InputWithTitleAndButton
                title="Allocation Amount"
                placeholder="0"
                type="number"
                name="amount"
                value={amount}
                onChange={(change) => setAmount(change)}
                disabled={!account}
                buttonText="Max"
                onClick={() => setAmount(veAbcBalance)}
                id="allocationAmount"
              />
            </InputContainer>
          </InfoSectionContainer>
          <InfoSectionContainer>
            <InputContainer
              style={{
                border: BORDER,
                borderRadius: 15,
              }}
            >
              <InputWithTitle
                title="Collection"
                placeholder={ZERO_ADDRESS}
                type="text"
                name="allocate"
                value={allocateAddress}
                onChange={(address) => setAllocateAddress(address)}
                disabled={!account}
                id="collection"
              />
            </InputContainer>
          </InfoSectionContainer>
          <ButtonContainer style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
            <FullWidthButton
              disabled={!amount || !allocateAddress || isPendingAddAllocation}
              onClick={() =>
                onAddAllocation(Number(amount), allocateAddress, () =>
                  getClaimData()
                )
              }
            >
              {isPendingAddAllocation ? "Loading..." : "Allocate to Collection"}
            </FullWidthButton>
            <FullWidthButton
              disabled={!amount || isPendingAddAuto}
              onClick={() =>
                onAddAutoAllocation(Number(amount), () => getClaimData())
              }
            >
              {isPendingAddAuto ? "Loading..." : "Add to Auto Allocation"}
            </FullWidthButton>
            <FullWidthButton
              disabled={
                !amount || !allocateAddress || isPendingRemoveAllocation
              }
              onClick={() =>
                onRemoveAllocation(allocateAddress, Number(amount), () =>
                  getClaimData()
                )
              }
            >
              {isPendingRemoveAllocation
                ? "Loading..."
                : "Remove from Collection"}
            </FullWidthButton>
            <FullWidthButton
              disabled={!amount || isPendingRemoveAutoAllocation}
              onClick={() =>
                onRemoveAutoAllocation(Number(amount), () => getClaimData())
              }
            >
              {isPendingRemoveAutoAllocation
                ? "Loading..."
                : "Remove Auto Allocation"}
            </FullWidthButton>
          </ButtonContainer>
        </Card>
      </StyledSplitContainer>
    </UniversalContainer>
  )
}

export default Ve
