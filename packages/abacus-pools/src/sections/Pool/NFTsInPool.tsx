import { NFTImage } from "@components/NFTImage"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { Section } from "abacus-ui"
import _ from "lodash"
import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { SectionHeader, SectionTitle } from "@components/index"

const StyledSection = styled(Section)`
  row-gap: 24px;
`

const OverallImageContainer = styled.div`
  display: flex;
  grid-gap: 26px;
  overflow-x: auto;
  width: 100%;
  height: 320px;
`

const ImageContainer = styled.a`
  max-width: 300px;
  min-width: max-content;
  min-height: 100%;

  transition: 0.3s;
  &:hover {
    opacity: 0.7;
  }
`

const NFTsInPool: FunctionComponent = () => {
  const { nfts } = useGetPoolData()

  return (
    <StyledSection>
      <SectionHeader>
        <SectionTitle>NFTs Available In Pool</SectionTitle>
      </SectionHeader>
      <OverallImageContainer>
        {_.map(nfts, (nft) => (
          <ImageContainer href={nft.collectionLink} target="_blank">
            <NFTImage style={{ height: "100%" }} src={nft.img} />
          </ImageContainer>
        ))}
      </OverallImageContainer>
    </StyledSection>
  )
}

export default NFTsInPool
