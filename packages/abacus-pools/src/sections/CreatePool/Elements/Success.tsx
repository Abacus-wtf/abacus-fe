import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { NFTImage } from "@components/NFTImage"
import { Mega, Kilo } from "abacus-ui"
import { Link } from "gatsby"
import { shortenAddress } from "@config/utils"
import { StyledButton, Title } from "../CreatePool.styled"

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 350px;
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

type SuccessProps = {
  imgSrc: string

  link: string
  openSeaLink: string
  collection: string
  tokenId: string
  address: string
}

const Success: FunctionComponent<SuccessProps> = ({
  imgSrc,

  openSeaLink,
  link,
  collection,
  tokenId,
  address,
}) => (
  <Container>
    <Title>Vault Created!</Title>
    <NFTImage src={imgSrc} />
    <CardInfoRow>
      <CardInfo>
        <CardInfoContent>{collection}</CardInfoContent>
        <Kilo>Collection</Kilo>
      </CardInfo>
    </CardInfoRow>
    <CardInfoRow>
      <CardInfo>
        <CardInfoContent
          as="a"
          href={openSeaLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {shortenAddress(address)}
        </CardInfoContent>
        <Kilo>NFT Address</Kilo>
      </CardInfo>
      <CardInfo>
        <CardInfoContent>{tokenId}</CardInfoContent>
        <Kilo>Token ID</Kilo>
      </CardInfo>
    </CardInfoRow>
    <StyledButton as={Link} to={link}>
      Go To Pool
    </StyledButton>
  </Container>
)

export default Success
