import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { NFTImage, NFTGrid } from "@components/index"
import { Mega, Kilo } from "abacus-ui"
import { Link } from "gatsby"
import { shortenAddress } from "@config/utils"
import { IS_PRODUCTION } from "@config/constants"
import { StyledButton, Title } from "../CreatePool.styled"
import { NewAddress } from "../CreatePool"

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`

const CardInfoContent = styled(Mega)`
  font-size: 22px;
`

const CardInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 24px;

  & ${CardInfo}:last-of-type {
    text-align: right;
  }
`

const NFTWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

type SuccessProps = {
  link: string
  nfts: NewAddress[]
}

export const Success: FunctionComponent<SuccessProps> = ({ link, nfts }) => (
  <Container>
    <Title>Vault Created!</Title>
    <NFTGrid size={nfts.length}>
      {nfts.map((nft) => (
        <NFTWrapper key={nft.address}>
          <NFTImage src={nft.img} />
          <CardInfoRow>
            <CardInfo>
              <CardInfoContent>{nft.collectionTitle}</CardInfoContent>
              <Kilo>Collection</Kilo>
            </CardInfo>
          </CardInfoRow>
          <CardInfoRow>
            <CardInfo>
              <CardInfoContent
                as="a"
                href={`https://${
                  IS_PRODUCTION ? "" : "testnets."
                }opensea.io/assets/${IS_PRODUCTION ? "" : "rinkeby/"}${
                  nft.address
                }/${nft.tokenId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {shortenAddress(nft.address)}
              </CardInfoContent>
              <Kilo>NFT Address</Kilo>
            </CardInfo>
            <CardInfo>
              <CardInfoContent>{nft.tokenId}</CardInfoContent>
              <Kilo>Token ID</Kilo>
            </CardInfo>
          </CardInfoRow>
        </NFTWrapper>
      ))}
    </NFTGrid>

    <StyledButton as={Link} to={link}>
      Go To Pool
    </StyledButton>
  </Container>
)
