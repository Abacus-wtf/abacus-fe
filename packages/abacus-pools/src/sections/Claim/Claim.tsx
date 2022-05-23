import React, { useEffect, useMemo, useState } from "react"
import styled from "styled-components"

import { ABC_EPOCH, ABC_FACTORY } from "@config/constants"
import {
  useClaimABCReward,
  useClaimEmissions,
  useEndEpoch,
} from "@hooks/epochFunc"
import { useActiveWeb3React, useMultiCall, useWeb3Contract } from "@hooks/index"
import { formatEther } from "ethers/lib/utils"
import { map, range } from "lodash"

import { BigNumber } from "ethers"
import moment from "moment"
import { SectionContainer, SectionTitle } from "./Claim.styles"
import { Epoch, Bond, Credits } from "./elements"
import { Container } from "../../layouts/styles"

import EPOCH_VAULT_ABI from "../../config/contracts/ABC_EPOCH_ABI.json"
import FACTORY_ABI from "../../config/contracts/ABC_FACTORY_ABI.json"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 40px;
  width: 100%;
`

const Claim = () => {
  const { account } = useActiveWeb3React()
  const [currentEpoch, setCurrentEpoch] = useState(0)
  const [epoch, setEpoch] = useState(0)
  const [showEndEpoch, setShowEndEpoch] = useState(false)
  const [epochEndTime, setEpochEndTime] = useState<number>(null)
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

      setPendingRewards(Number(formatEther(_pendingRewards)))
      setShowEndEpoch(
        moment().unix() > BigNumber.from(getEpochEndTime[0]).toNumber()
      )
      setEpochEndTime(BigNumber.from(getEpochEndTime[0]).toNumber() * 1000)
      setEpoch(BigNumber.from(currentEpoch[0]).toNumber())
      setCurrentEpoch(BigNumber.from(currentEpoch[0]).toNumber())
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
      setEpochEndTime(BigNumber.from(getEpochEndTime[0]).toNumber() * 1000)
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

  const epochs = useMemo(
    () => map(range(0, currentEpoch + 10), (i) => `#${i}`),
    [currentEpoch]
  )

  return (
    <Container>
      <Wrapper>
        <SectionContainer>
          <SectionTitle>Claim</SectionTitle>
          <Epoch
            epochs={epochs}
            epoch={epoch}
            setEpoch={setEpoch}
            endTime={epochEndTime}
          />
          <Credits />
        </SectionContainer>
        <SectionContainer>
          <SectionTitle>Bond</SectionTitle>
          <Bond />
        </SectionContainer>
      </Wrapper>
    </Container>
  )
}

export { Claim }
