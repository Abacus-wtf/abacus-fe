import { useEthToUSD } from "@state/application/hooks"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import React, { FunctionComponent } from "react"
import styled, { useTheme } from "styled-components"
import {
  InfoBarContainer,
  InfoBarContent,
  InfoBarItem,
  InfoBarTitle,
} from "@components/index"
import { Checkmark, Close } from "abacus-ui"

import { OutboundLink } from "gatsby-plugin-google-gtag"

const StyledOutboundLink = styled(OutboundLink)`
  color: ${({ theme }) => theme.colors.core.primary};
  text-decoration: none;
`

const EnabledEmissions = styled(InfoBarTitle)<{ emissionsStarted: boolean }>`
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
  const {
    tokensLocked,
    owner,
    ownerLink,
    emissionsStarted,
    nftName,
    tokenPrice,
  } = useGetPoolData()
  const tokensLockedEth = (
    Number(tokensLocked) * Number(tokenPrice)
  ).toLocaleString("en-US", {
    maximumSignificantDigits: 5,
    minimumSignificantDigits: 2,
  })
  const tokensLockedUSD = useEthToUSD(Number(tokensLockedEth))
  const theme = useTheme()
  return (
    <InfoBarContainer>
      <InfoBarItem>
        <InfoBarTitle>Pool Name</InfoBarTitle>
        <PoolTitle as="h1">{nftName}</PoolTitle>
      </InfoBarItem>
      <InfoBarItem>
        <InfoBarTitle># Tokens Locked</InfoBarTitle>
        <InfoBarContent>{tokensLockedEth} ETH</InfoBarContent>
        <InfoBarTitle>${tokensLockedUSD}</InfoBarTitle>
      </InfoBarItem>
      <InfoBarItem>
        <InfoBarTitle>Participants</InfoBarTitle>
        <InfoBarContent>TODO</InfoBarContent>
      </InfoBarItem>
      <InfoBarItem>
        <InfoBarTitle>Owner</InfoBarTitle>
        <InfoBarContent>
          <StyledOutboundLink target="_blank" href={ownerLink}>
            {owner}
          </StyledOutboundLink>
        </InfoBarContent>
        <EnabledEmissions emissionsStarted={emissionsStarted}>
          {emissionsStarted ? (
            <Checkmark stroke={theme.colors.utility.green} />
          ) : (
            <Close stroke={theme.colors.utility.red} />
          )}
          {emissionsStarted ? "Emissions Enabled" : "Emissions Not Enabled"}
        </EnabledEmissions>
      </InfoBarItem>
    </InfoBarContainer>
  )
}

export default InfoBar
