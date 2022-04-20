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
import { useClaimABCReward, useEndEpoch } from "@hooks/epochFunc"
import Buttons from "@components/Button"
import { useActiveWeb3React, useMultiCall } from "@hooks/index"
import { formatEther } from "ethers/lib/utils"
import { Stat } from "@sections/Pool/CurrentState/CurrentState.styles"
import { BigNumber } from "ethers"
import moment from "moment"
import EPOCH_VAULT_ABI from "../../config/contracts/ABC_EPOCH_ABI.json"

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
  const { onClaimABCReward, isPending } = useClaimABCReward()
  const { onEndEpoch, isPending: isPendingEndEpoch } = useEndEpoch()
  const epochVault = useMultiCall(EPOCH_VAULT_ABI)

  useEffect(() => {
    const getClaimData = async () => {
      const [currentEpoch] = await epochVault(ABC_EPOCH, ["currentEpoch"], [[]])

      const [abcEmissions, userCredits, getEpochEndTime] = await epochVault(
        ABC_EPOCH,
        ["getCurrentAbcEmission", "getUserCredits", "getEpochEndTime"],
        [[], [currentEpoch[0], account], [currentEpoch[0]]]
      )

      console.log(Number(formatEther(userCredits[0])))
      console.log(Number(formatEther(abcEmissions[0])))
      console.log(BigNumber.from(currentEpoch[0]).toNumber())
      console.log(BigNumber.from(getEpochEndTime[0]).toNumber())
      console.log(moment().unix())
      setShowEndEpoch(
        moment().unix() > BigNumber.from(getEpochEndTime[0]).toNumber()
      )
      setEpoch(BigNumber.from(currentEpoch[0]).toNumber())
      setUserData({
        userCredits: Number(formatEther(userCredits[0])),
        abcEmissions: Number(formatEther(abcEmissions[0])),
      })
    }
    if (account) {
      try {
        getClaimData()
      } catch (e) {
        console.error(e)
      }
    }
  }, [account, epochVault])

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
