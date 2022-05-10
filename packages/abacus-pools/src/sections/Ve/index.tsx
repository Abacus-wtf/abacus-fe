/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from "react"
import { UniversalContainer } from "@components/global.styles"
import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  Modal,
  ModalBody,
} from "shards-react"
import {
  ABC_EPOCH,
  ABC_TOKEN,
  VE_ABC_TOKEN,
  ZERO_ADDRESS,
} from "@config/constants"
import _ from "lodash"
import { useActiveWeb3React, useMultiCall, useWeb3Contract } from "@hooks/index"
import { formatEther, parseEther } from "ethers/lib/utils"
// import { Stat } from "@sections/Pool/CurrentState/CurrentState.styles"
import { BigNumber } from "@ethersproject/bignumber"
import moment from "moment"
// import { SplitContainer, ButtonContainer } from "@sections/Pool/Pool.styles"
import Button from "@components/Button"
import {
  useOnAddAutoAllocation,
  useOnAddTokens,
  useOnAllocateTokens,
  useOnChangeAllocation,
  useOnClaimReward,
  useOnLockTokens,
  useOnUnlockTokens,
} from "@hooks/veFunc"
import styled from "styled-components"
import { InputWithTitle, InputWithTitleAndButton } from "@components/Input"
// import {
//   InfoSectionContainer,
//   InputContainer,
//   BORDER,
// } from "@sections/Pool/CurrentState/AMM.styles"
// import { DatePickerStyled } from "@sections/Pool/CurrentState/AMM"
import { DropdownMenuStyled } from "../Claim/index"
import ABC_EPOCH_ABI from "../../config/contracts/ABC_EPOCH_ABI.json"
import VE_ABC_ABI from "../../config/contracts/VE_ABC_TOKEN_ABI.json"
import ABC_ABI from "../../config/contracts/ABC_TOKEN_ABI.json"
import { getAllocs, SubgraphAllocs } from "./queries"

export const Card = styled.div`
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
}

const FullWidthButton = styled(Button)`
  width: 100%;
`

interface AllocInterface extends SubgraphAllocs {
  onChange: () => void
}

const Allocation = (props: AllocInterface) => (
  /* const { onRemoveAllocation, isPending: isPendingRemoveAllocation } =
    useOnRemoveAllocation() */
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    }}
  >
    <div>
      {props.collection} - {formatEther(props.amount)}
    </div>
    <div style={{ display: "flex", flexDirection: "row", gridGap: 8 }}>
      <Button onClick={() => props.onChange()}>Change</Button>
      {/* <Button
          disabled={isPendingRemoveAllocation}
          onClick={() =>
            onRemoveAllocation(
              props.collection,
              Number(formatEther(props.amount)),
              () => props.reset()
            )
          }
        >
          {isPendingRemoveAllocation ? "Loading..." : "Remove"}
        </Button> */}
    </div>
  </div>
)

const Ve: React.FC = () => {
  const { account } = useActiveWeb3React()

  const [amountToChange, setAmountToChange] = useState("")
  const [addressToChange, setAddressToChange] = useState("")
  const [currentAllocation, setCurrentAllocation] =
    useState<SubgraphAllocs | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [open, setOpen] = useState(false)
  const [epoch, setEpoch] = useState(0)
  const [abcMaxBalance, setABCMaxBalance] = useState("")
  const [veAbcBalance, setVeAbcBalance] = useState("")
  const [abcInput, setABCInput] = useState("")
  const [holderData, setHolderData] = useState<Holder | null>(null)
  const [allocateAddress, setAllocateAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [allocs, setAllocs] = useState<SubgraphAllocs[]>([])
  const [startDate, setStartDate] = useState(new Date())
  const [showClaimButton, setShowClaimButton] = useState(false)
  const [showUnlockTokensButton, setShowUnlockTokensButton] = useState(false)

  const veAbcCall = useMultiCall(VE_ABC_ABI)
  const abcCall = useWeb3Contract(ABC_ABI)
  const epochCall = useWeb3Contract(ABC_EPOCH_ABI)
  const { onAddAutoAllocation, isPending: isPendingAddAuto } =
    useOnAddAutoAllocation()
  const { onAddTokens, isPending: isPendingAddTokens } = useOnAddTokens()
  const { onLockTokens, isPending: isPendingLockTokens } = useOnLockTokens()
  const { onAllocateTokens, isPending: isPendingAddAllocation } =
    useOnAllocateTokens()
  const { onUnlockTokens, isPending: isPendingUnlockTokens } =
    useOnUnlockTokens()
  const { onChangeAllocation, isPending: isPendingChangeAllocation } =
    useOnChangeAllocation()
  const { onClaimReward, isPending: isPendingClaimReward } = useOnClaimReward()

  const getClaimData = async () => {
    const currentEpoch = await epochCall(ABC_EPOCH)
      .methods.currentEpoch()
      .call()
    const [
      [veHolderHistory, veBalance, getAmountAllocated, getAmountAutoAllocated],
      balance,
      allocs,
    ] = await Promise.all([
      veAbcCall(
        VE_ABC_TOKEN,
        [
          "veHolderHistory",
          "balanceOf",
          "getAmountAllocated",
          "getAmountAutoAllocated",
        ],
        [[account], [account], [account], [account, currentEpoch]]
      ),
      abcCall(ABC_TOKEN).methods.balanceOf(account).call(),
      getAllocs(account),
    ])
    console.log("allocs", allocs)
    console.log("veholder", veHolderHistory)
    if (allocs !== undefined && allocs.length > 0) {
      setCurrentAllocation(allocs[0])
      setAllocs(allocs)
    }
    setShowUnlockTokensButton(
      Number(formatEther(veHolderHistory[3])) === 0 &&
        BigNumber.from(veHolderHistory[0]).toNumber() < moment().unix()
    )
    setVeAbcBalance(formatEther(veBalance[0]))
    setABCMaxBalance(BigNumber.from(balance).sub(parseEther("10")).toString())
    console.log("here1")
    setHolderData({
      timeUnlock: BigNumber.from(veHolderHistory[0]).mul(1000).toNumber(),
      amountLocked: Number(formatEther(veHolderHistory[1])),
      multiplier: BigNumber.from(veHolderHistory[2]).toNumber(),
      amountAllocated: Number(formatEther(getAmountAllocated[0])),
      amountAutoAllocated: Number(formatEther(getAmountAutoAllocated[0])),
    })
    console.log("here")
    setShowClaimButton(
      BigNumber.from(veHolderHistory[0]).toNumber() < currentEpoch
    )
    console.log("here2")

    setEpoch(currentEpoch)
  }

  useEffect(() => {
    if (account) {
      try {
        getClaimData()
      } catch (e) {
        console.error(e)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  if (holderData === null) {
    return (
      <UniversalContainer style={{ textAlign: "center" }}>
        Loading...
      </UniversalContainer>
    )
  }

  return (
    <UniversalContainer style={{ gridGap: 30, alignItems: "center" }}>
      {/* <Modal
        size="md"
        open={openModal}
        toggle={() => setOpenModal(!openModal)}
        centered
      >
        <ModalBody
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <InfoSectionContainer>
            <InputContainer
              style={{
                border: BORDER,
                borderRadius: 15,
              }}
            >
              <InputWithTitleAndButton
                title="Amount to Change"
                placeholder="0"
                type="number"
                name="amount"
                value={amountToChange}
                onChange={(e) => setAmountToChange(e.target.value)}
                disabled={!account}
                buttonText="Max"
                onClick={() =>
                  setAmountToChange(`${formatEther(currentAllocation.amount)}`)
                }
                id="amountToChange"
              />
            </InputContainer>
            <InputContainer
              style={{
                border: BORDER,
                borderRadius: 15,
              }}
            >
              <InputWithTitle
                title="Address to Change"
                placeholder={ZERO_ADDRESS}
                type="text"
                name="amount"
                value={addressToChange}
                onChange={(e) => setAddressToChange(e.target.value)}
                disabled={!account}
                id="addressToChange"
              />
            </InputContainer>
          </InfoSectionContainer>
          <FullWidthButton
            disabled={
              !amountToChange || !addressToChange || isPendingChangeAllocation
            }
            onClick={() =>
              onChangeAllocation(
                currentAllocation.collection,
                addressToChange,
                Number(amountToChange),
                async () => {
                  await getClaimData()
                  setOpenModal(false)
                }
              )
            }
          >
            {isPendingChangeAllocation ? "Loading..." : "Change Allocation"}
          </FullWidthButton>
        </ModalBody>
      </Modal>
      <div style={{ display: "flex", gridGap: 30 }}>
        <Dropdown open={open} toggle={() => setOpen(!open)}>
          <DropdownToggle style={{ minWidth: 130 }}>
            Epoch #{epoch}
          </DropdownToggle>
          <DropdownMenuStyled>
            {_.map(_.range(0, 100), (i) => (
              <DropdownItem onClick={() => setEpoch(i)}>
                Epoch #{i}
              </DropdownItem>
            ))}
          </DropdownMenuStyled>
        </Dropdown>
        {showUnlockTokensButton && (
          <FullWidthButton
            disabled={isPendingUnlockTokens}
            onClick={() => onUnlockTokens(() => getClaimData())}
          >
            {isPendingUnlockTokens ? "Loading..." : "Unlock Tokens"}
          </FullWidthButton>
        )}
        {showClaimButton && (
          <FullWidthButton
            onClick={() => {
              onClaimReward(() => getClaimData())
            }}
            disabled={isPendingClaimReward}
          >
            {isPendingClaimReward ? "Loading..." : "Claim Rewards"}
          </FullWidthButton>
        )}
      </div>
      <StyledSplitContainer>
        <Stat
          title="Unlock Time:"
          value={
            holderData.timeUnlock === 0
              ? "N/A"
              : moment(holderData.timeUnlock).format("MMMM Do YYYY")
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
      {allocs !== null && allocs.length > 0 && (
        <Card style={{ width: "100%" }}>
          <h4>Allocations</h4>
          {_.map(allocs, (alloc) => (
            <Allocation
              {...alloc}
              onChange={() => {
                setCurrentAllocation(alloc)
                setOpenModal(true)
              }}
            />
          ))}
        </Card>
      )}
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
                onChange={(e) => setABCInput(e.target.value)}
                disabled={!account}
                buttonText="Max"
                onClick={() => setABCInput(formatEther(`${abcMaxBalance}`))}
                id="abcAmount"
              />
            </InputContainer>
          </InfoSectionContainer>
          {Number(veAbcBalance) === 0 && (
            <DatePickerStyled
              showTimeSelect
              timeIntervals={5}
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
            />
          )}
          <FullWidthButton
            disabled={!abcInput || isPendingAddTokens || isPendingLockTokens}
            onClick={() =>
              Number(veAbcBalance) === 0
                ? onLockTokens(
                    abcInput,
                    moment(startDate).unix() - moment().unix(),
                    () => getClaimData()
                  )
                : onAddTokens(Number(abcInput), () => getClaimData())
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
                onChange={(e) => setAmount(e.target.value)}
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
                onChange={(e) => setAllocateAddress(e.target.value)}
                disabled={!account}
                id="collection"
              />
            </InputContainer>
          </InfoSectionContainer>
          <ButtonContainer style={{ gridTemplateColumns: "1fr 1fr" }}>
            <FullWidthButton
              disabled={!amount || !allocateAddress || isPendingAddAllocation}
              onClick={() =>
                onAllocateTokens(allocateAddress, Number(amount), () =>
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
            {/* <FullWidthButton
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
              </FullWidthButton> */}
      {/* </ButtonContainer>
        </Card>
      </StyledSplitContainer> */}
    </UniversalContainer>
  )
}

export default Ve
