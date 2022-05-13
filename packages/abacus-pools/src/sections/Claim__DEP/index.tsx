import React, { useEffect, useState } from "react"
import { UniversalContainer } from "@components/global.styles"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "shards-react"
import { ABC_EPOCH, ABC_FACTORY } from "@config/constants"
import _ from "lodash"
import {
  useClaimABCReward,
  useClaimEmissions,
  useEndEpoch,
} from "@hooks/epochFunc"
import Buttons from "@components/Button"
import { useActiveWeb3React, useMultiCall, useWeb3Contract } from "@hooks/index"
import { formatEther } from "ethers/lib/utils"
import { Stat } from "@sections/Pool/CurrentState/CurrentState.styles"
import { BigNumber } from "ethers"
import moment from "moment"
import styled from "styled-components"
import EPOCH_VAULT_ABI from "../../config/contracts/ABC_EPOCH_ABI.json"
import FACTORY_ABI from "../../config/contracts/ABC_FACTORY_ABI.json"

export const DropdownMenuStyled = styled(DropdownMenu)`
  max-height: 400px;
  overflow: scroll;
`

interface EpochData {
  userCredits: number
  abcEmissions: number
}

const Claim: React.FC = () => {
  const { account } = useActiveWeb3React()
  const [open, setOpen] = useState(false)
  const [epoch, setEpoch] = useState(0)
  const [showEndEpoch, setShowEndEpoch] = useState(false)
  const [userData, setUserData] = useState<EpochData | null>(null)
  const [currentEpochSet, setCurrentEpochSet] = useState(false)
  const [pendingRewards, setPendingRewards] = useState(0)
  const { onClaimABCReward, isPending } = useClaimABCReward()
  const { onClaimEmissions, isPending: isPendingEmissions } =
    useClaimEmissions()
  const { onEndEpoch, isPending: isPendingEndEpoch } = useEndEpoch()
  const epochVault = useMultiCall(EPOCH_VAULT_ABI)
  const factoryVault = useWeb3Contract(FACTORY_ABI)

  useEffect(() => {
    const startData = async () => {
      const [_pendingRewards, [currentEpoch]] = await Promise.all([
        factoryVault(ABC_FACTORY).methods.pendingReturns(account).call(),
        epochVault(ABC_EPOCH, ["getCurrentEpoch"], [[]]),
      ])

      const [abcEmissions, userCredits, getEpochEndTime] = await epochVault(
        ABC_EPOCH,
        ["getBaseEmission", "getUserCredits", "getEpochEndTime"],
        [[currentEpoch[0]], [currentEpoch[0], account], [currentEpoch[0]]]
      )

      console.log(Number(formatEther(userCredits[0])))
      console.log(Number(formatEther(abcEmissions[0])))
      console.log(BigNumber.from(currentEpoch[0]).toNumber())
      console.log(BigNumber.from(getEpochEndTime[0]).toNumber())
      console.log(moment().unix())
      setPendingRewards(Number(formatEther(_pendingRewards)))
      setShowEndEpoch(
        moment().unix() > BigNumber.from(getEpochEndTime[0]).toNumber()
      )
      setEpoch(BigNumber.from(currentEpoch[0]).toNumber())
      setUserData({
        userCredits: Number(formatEther(userCredits[0])),
        abcEmissions: Number(formatEther(abcEmissions[0])),
      })
      setCurrentEpochSet(true)
    }
    const getClaimData = async () => {
      const [abcEmissions, userCredits, getEpochEndTime] = await epochVault(
        ABC_EPOCH,
        ["getBaseEmission", "getUserCredits", "getEpochEndTime"],
        [[epoch], [epoch, account], [epoch]]
      )
      setShowEndEpoch(
        moment().unix() > BigNumber.from(getEpochEndTime[0]).toNumber()
      )
      setUserData({
        userCredits: Number(formatEther(userCredits[0])),
        abcEmissions: Number(formatEther(abcEmissions[0])),
      })
    }
    if (account) {
      try {
        if (!currentEpochSet) {
          startData()
        } else {
          getClaimData()
        }
      } catch (e) {
        console.error(e)
      }
    }
  }, [account, epochVault, epoch, currentEpochSet, factoryVault])

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
          <DropdownMenuStyled>
            {_.map(_.range(0, 100), (i) => (
              <DropdownItem onClick={() => setEpoch(i)}>
                Epoch #{i}
              </DropdownItem>
            ))}
          </DropdownMenuStyled>
        </Dropdown>
        <Buttons
          disabled={isPending || userData?.userCredits === 0}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClick={() => onClaimABCReward(epoch, () => {})}
        >
          {isPending
            ? "Loading..."
            : userData?.userCredits === 0
            ? "Credits Claimed or No Credits Earned This Epoch"
            : "Claim ABC Reward"}
        </Buttons>
        {pendingRewards !== 0 && (
          <Buttons
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick={() => onClaimEmissions(() => {})}
          >
            {isPendingEmissions ? "Loading..." : "Claim Emissions"}
          </Buttons>
        )}
        {showEndEpoch && (
          <Buttons
            disabled={isPendingEndEpoch}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick={() => onEndEpoch(() => {})}
          >
            {isPendingEndEpoch ? "Loading..." : "End Epoch"}
          </Buttons>
        )}
      </div>
    </UniversalContainer>
  )
}

export default Claim
