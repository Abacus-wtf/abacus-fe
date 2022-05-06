import React, { FunctionComponent } from "react"
import { InfoBarContent, InfoBarItem, InfoBarTitle } from "@components/index"
import { Section, Exa } from "abacus-ui"
import styled from "styled-components"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { formatEther } from "ethers/lib/utils"

const Container = styled(Section)`
  display: flex;
  flex-direction: column;
  height: max-content;
  row-gap: 24px;
`

const Title = styled(Exa)`
  font-family: "Bluu next";
  font-weight: bold;
`

const InfoRow = styled.div`
  display: flex;
  column-gap: 60px;
  width: 100%;
  flex-wrap: wrap;
  row-gap: 16px;
`

const StyledInfoBarContent = styled(InfoBarContent)`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
`

const InfoBar: FunctionComponent = () => {
  const {
    nftName,
    size,

    owner,
    ownerLink,
    collectionTitle,
    collectionLink,
  } = useGetPoolData()

  const sizeEth = Number(formatEther(size))
  const as = (string) => (string ? "a" : "div")
  return (
    <Container>
      <div>
        <InfoBarTitle>Auction Name</InfoBarTitle>
        <Title>{nftName}</Title>
      </div>
      <InfoRow>
        <InfoBarItem>
          <InfoBarTitle>Pool's Size</InfoBarTitle>
          <InfoBarContent>{sizeEth} ETH</InfoBarContent>
        </InfoBarItem>
        <InfoBarItem>
          <InfoBarTitle>Collection</InfoBarTitle>
          <InfoBarContent as={as(collectionLink)} href={collectionLink}>
            {collectionTitle}
          </InfoBarContent>
        </InfoBarItem>
        <InfoBarItem>
          <InfoBarTitle>Owner</InfoBarTitle>
          <StyledInfoBarContent as={as(ownerLink)} href={ownerLink}>
            {owner}
          </StyledInfoBarContent>
        </InfoBarItem>
      </InfoRow>
    </Container>
  )
}

export { InfoBar }
