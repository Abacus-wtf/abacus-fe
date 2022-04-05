import React, { FunctionComponent, useEffect } from "react"
import { PageProps, Link } from "gatsby"
import * as queryString from "query-string"
import { Media, Checkmark, Close } from "abacus-ui"
import styled, { useTheme } from "styled-components"
import {
  InfoBarContainer,
  InfoBarContent,
  InfoBarItem,
  InfoBarTitle,
} from "@components/index"
import { useGetPoolData, useSetPoolData } from "@state/singlePoolData/hooks"
import { useEthToUSD } from "@state/application/hooks"
import { OutboundLink } from "gatsby-plugin-google-gtag"
import { Container } from "../../layouts/styles"

const BackLink = styled(Link)`
  display: none;

  ${Media.sm`
    display: flex;
  `}
`

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

type PoolProps = {
  location: PageProps["location"]
}

const Pool: FunctionComponent<PoolProps> = ({ location }) => {
  const { address, tokenId, nonce } = queryString.parse(location.search)
  const setPool = useSetPoolData()
  const { nftName, tokensLocked, owner, ownerAddress, emissionsStarted } =
    useGetPoolData()
  const tokensLockedUSD = useEthToUSD(Number(tokensLocked))
  const theme = useTheme()

  useEffect(() => {
    setPool(String(address), String(tokenId), Number(nonce))
  }, [address, tokenId, nonce, setPool])

  return (
    <Container>
      <BackLink to="/">{"< Back to Spot"}</BackLink>
      <InfoBarContainer>
        <InfoBarItem>
          <InfoBarTitle>Pool Name</InfoBarTitle>
          <PoolTitle as="h1">{nftName}</PoolTitle>
        </InfoBarItem>
        <InfoBarItem>
          <InfoBarTitle># Tokens Locked</InfoBarTitle>
          <InfoBarContent>{tokensLocked} ETH</InfoBarContent>
          <InfoBarTitle>${tokensLockedUSD}</InfoBarTitle>
        </InfoBarItem>
        <InfoBarItem>
          <InfoBarTitle>Participants</InfoBarTitle>
          <InfoBarContent>TODO</InfoBarContent>
        </InfoBarItem>
        <InfoBarItem>
          <InfoBarTitle>Owner</InfoBarTitle>
          <InfoBarContent>
            <StyledOutboundLink
              target="_blank"
              href={`https://opensea.io/${ownerAddress}`}
            >
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
    </Container>
  )
}

export default Pool
