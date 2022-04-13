import React, { useEffect, useState } from "react"
import { UniversalContainer } from "@components/global.styles"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "shards-react"
import { ABC_EPOCH } from "@config/constants"
import _ from "lodash"
import { useClaimABCReward } from "@hooks/epochFunc"
import Buttons from "@components/Button"
import { useActiveWeb3React, useMultiCall } from "@hooks/index"
import { formatEther } from "ethers/lib/utils"
import { Stat } from "@sections/Pool/CurrentState/CurrentState.styles"
import { BigNumber } from "@ethersproject/bignumber"
import VE_ABC_ABI from "../../config/contracts/VE_ABC_TOKEN_ABI.json"

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

const Ve: React.FC = () => {
  const { account } = useActiveWeb3React()
  const [open, setOpen] = useState(false)
  const [epoch, setEpoch] = useState(0)
  const [holderData, setHolderData] = useState<Holder | null>(null)
  const [epochData, setEpochData] = useState<EpochData | null>(null)
  const { onClaimABCReward, isPending } = useClaimABCReward()
  const veAbcCall = useMultiCall(VE_ABC_ABI)

  useEffect(() => {
    const getClaimData = async () => {
      const [veHolderHistory, getHolderEpochInfo] = await veAbcCall(
        ABC_EPOCH,
        ["veHolderHistory", "getHolderEpochInfo"],
        [[account], [account, epoch]]
      )

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
    if (account) {
      try {
        getClaimData()
      } catch (e) {
        console.error(e)
      }
    }
  }, [epoch, account, epochVault])

  if (userData === null) {
    return (
      <UniversalContainer style={{ textAlign: "center" }}>
        Loading...
      </UniversalContainer>
    )
  }

  return (
    <UniversalContainer style={{ gridGap: 30, alignItems: "center" }}>
      <Stat title="ABC Emissions:" value={userData.abcEmissions} />
      <Stat title="User Credits:" value={userData.userCredits} />
      <div style={{ display: "flex", gridGap: 30 }}>
        <Dropdown open={open} toggle={() => setOpen(!open)}>
          <DropdownToggle>Epoch #{epoch}</DropdownToggle>
          <DropdownMenu>
            {_.map(_.range(0, 100), (i) => (
              <DropdownItem onClick={() => setEpoch(i)}>
                Epoch #{i}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Buttons
          disabled={isPending || userData?.userCredits === 0}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClick={() => onClaimABCReward(epoch, () => {})}
        >
          {isPending ? "Loading..." : "Claim ABC Reward"}
        </Buttons>
      </div>
    </UniversalContainer>
  )
}

export default Ve
