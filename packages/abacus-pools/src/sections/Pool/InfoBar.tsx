import { useEthToUSD } from "@state/application/hooks"
import { useCurrentPoolSize, useGetPoolData } from "@state/singlePoolData/hooks"
import React, { FunctionComponent } from "react"
import styled, { useTheme } from "styled-components"
import {
  InfoBarContainer,
  InfoBarContent,
  InfoBarItem,
  InfoBarTitle,
} from "@components/index"
import { Checkmark, Close } from "abacus-ui"

const EnabledEmissions = styled(InfoBarContent)<{ emissionsStarted: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ emissionsStarted, theme }) =>
    emissionsStarted ? theme.colors.utility.green : theme.colors.utility.red};
  & svg {
    height: 16px;
    width: 16px;
  }
`

const PoolTitle = styled(InfoBarContent)`
  font-family: Bluu Next;
  font-size: 30px;
  font-weight: 700;
  line-height: 36px;
`

const InfoBar: FunctionComponent = () => {
  const { emissionsStarted, totalParticipants, name } = useGetPoolData()
  const size = useCurrentPoolSize()
  const tokensLockedEth = Number(size).toLocaleString("en-US", {
    maximumSignificantDigits: 5,
    minimumSignificantDigits: 2,
  })
  const tokensLockedUSD = useEthToUSD(Number(tokensLockedEth))
  const theme = useTheme()
  return (
    <InfoBarContainer>
      <InfoBarItem>
        <InfoBarTitle>Pool Name</InfoBarTitle>
        <PoolTitle as="h1">{name}</PoolTitle>
      </InfoBarItem>
      <InfoBarItem>
        <InfoBarTitle>Pool Size</InfoBarTitle>
        <InfoBarContent>{tokensLockedEth} ETH</InfoBarContent>
        <InfoBarTitle>${tokensLockedUSD}</InfoBarTitle>
      </InfoBarItem>
      <InfoBarItem>
        <InfoBarTitle>Emissions Status</InfoBarTitle>
        <InfoBarContent>
          <EnabledEmissions emissionsStarted={emissionsStarted}>
            {emissionsStarted ? (
              <Checkmark stroke={theme.colors.utility.green} />
            ) : (
              <Close fill={theme.colors.utility.red} />
            )}
            {emissionsStarted ? "Emissions Enabled" : "Emissions Not Enabled"}
          </EnabledEmissions>
        </InfoBarContent>
      </InfoBarItem>
    </InfoBarContainer>
  )
}

export default InfoBar
