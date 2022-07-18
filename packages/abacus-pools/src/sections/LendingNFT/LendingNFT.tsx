import { ActivitySection } from "@components/index"
import { LendingProgressBar } from "@components/LendingProgressBar"
import { LoadingOverlay } from "@components/LoadingOverlay"
import { NFTImage } from "@components/NFTImage"
import { NumericallyConditionalText } from "@components/NumericallyConditionalText"
import { Title } from "@components/Title"
import { Container } from "@layouts/styles"
import {
  useCurrentLendingNFT,
  useFetchCurrentLendingNFT,
  useFetchingCurrentLendingNft,
} from "@state/lending/hooks"
import { round2Decimals } from "@utils"
import { Button, Flex, Font, Kilo, Media, Mega, Section } from "abacus-ui"
import { Link } from "gatsby"
import { random } from "lodash"
import React, { useEffect, useState } from "react"
import styled, { css } from "styled-components"
import { BorrowModal } from "./BorrowModal"
import { RepayModal } from "./RepayModal"

const StyledSection = styled(Section)`
  display: flex;
  flex-direction: column;

  ${Media.md`
    flex-direction: row;
    column-gap: 40px;
  `}
`

const Label = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core[900]};
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  ${Media.md`
    flex-direction: row;
    column-gap: 20px;
  `}

  ${Media.lg`
    flex-direction: row;
    column-gap: 100px;
  `}
`
const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const StyledLink = styled(Link)`
  font-size: 20px;
`

const HealthRatio = styled(NumericallyConditionalText)`
  ${Font("peta")}
  font-weight: bold;
`

const BorrowGrid = styled.div`
  display: grid;
  grid-template-columns: calc(50% - 0.5px) 1px calc(50% - 0.5px);
  row-gap: 16px;
  column-gap: 8px;
`

const Column = styled(Flex)`
  flex-direction: column;
  gap: 8px;
  justify-content: center;
`

const Divider = styled.div`
  height: 100%;
  width: 0px;
  border: 0.5px solid #bdbdbd;
`

const StyledButton = styled(Button)<{ borrow: boolean }>`
  width: 100%;
  justify-self: center;
  ${({ borrow }) =>
    borrow
      ? css`
          background-color: ${({ theme }) => theme.colors.utility.green};
        `
      : ""}

  ${Media.md`
    width: max-content;
  `}
`

type LendingNFTProps = {
  address: string
  tokenId: string
}

const LendingNFT = ({ address, tokenId }: LendingNFTProps) => {
  const fetchCurrentLendingNft = useFetchCurrentLendingNFT()
  const { name, img, alt, vaults } = useCurrentLendingNFT()
  const fetching = useFetchingCurrentLendingNft()
  const [borrowModalOpen, setBorrowModalOpen] = useState(false)
  const [repayModalOpen, setRepayModalOpen] = useState(false)

  useEffect(() => {
    if (address && tokenId) {
      fetchCurrentLendingNft(address, tokenId)
    }
  }, [address, fetchCurrentLendingNft, tokenId])

  if (fetching) {
    return <LoadingOverlay loading={fetching} />
  }

  const healthRatio = random(0, 10, true)
  const borrowed = random(0, 40, true)
  const borrowedByYou = borrowed / random(true)
  const available = random(0, 40, true)
  const total = borrowed + available
  const progress = borrowed / total

  const activity = [
    {
      id: "a",
      user: "0xc1C18aB831d5ec39Bee6Cf1EB0a535D24fa27fa2",
      description: "Borrowed 2 ETH",
      timestamp: 1657849655356,
    },
    {
      id: "b",
      user: "0xc1C18aB831d5ec39Bee6Cf1EB0a535D24fa27fa3",
      description: "Borrowed 1 ETH",
      timestamp: 1657849655377,
    },
    {
      id: "c",
      user: "0xc1C18aB831d5ec39Bee6Cf1EB0a535D24fa27fa2",
      description: "Payed Back 1 ETH",
      timestamp: 1657849655377,
    },
  ]

  return (
    <Container>
      <BorrowModal
        isOpen={borrowModalOpen}
        closeModal={() => setBorrowModalOpen(false)}
        address={address}
        tokenId={tokenId}
        refresh={() => fetchCurrentLendingNft(address, tokenId)}
      />
      <RepayModal
        isOpen={repayModalOpen}
        closeModal={() => setRepayModalOpen(false)}
        address={address}
        tokenId={tokenId}
        refresh={() => fetchCurrentLendingNft(address, tokenId)}
      />
      <StyledLink to="/lending">{"<"} Back to Lending</StyledLink>
      <StyledSection>
        <NFTImage src={img} alt={alt} />
        <InfoContainer>
          <Details>
            <Info>
              <Label>NFT Name</Label>
              <Title>{name}</Title>
            </Info>
            <Info>
              <Label>Abacus Vaults</Label>
              <Flex
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "6px",
                }}
              >
                {vaults.map((vault) => (
                  <StyledLink key={vault.id} to={`/pool/${vault.id}`}>
                    {vault.name || "Untitled Vault"} {">"}
                  </StyledLink>
                ))}
              </Flex>
            </Info>
          </Details>
          <Flex
            style={{
              flexDirection: "column",
              marginTop: "20px",
              gap: "4px",
            }}
          >
            <HealthRatio value={healthRatio}>
              {round2Decimals(healthRatio)}
            </HealthRatio>
            <Label>Health Ratio</Label>
          </Flex>
          <LendingProgressBar progress={progress} />
          <BorrowGrid>
            <Column>
              <Label>Borrowed</Label>
              <Mega>
                {round2Decimals(borrowed)} <b>ETH</b>
              </Mega>
            </Column>
            <Divider />
            <Column>
              <Label>Available</Label>
              <Mega>
                {round2Decimals(available)} <b>ETH</b>
              </Mega>
            </Column>
            <Column>
              <Label>Borrowed by You</Label>
              <Mega>
                {round2Decimals(borrowedByYou)} <b>ETH</b>
              </Mega>
            </Column>
            <Divider />
            <Column>
              <Mega>
                <b>-</b>
              </Mega>
            </Column>
            <StyledButton onClick={() => setRepayModalOpen(true)}>
              Pay Back
            </StyledButton>
            <span />
            <StyledButton borrow onClick={() => setBorrowModalOpen(true)}>
              Borrow
            </StyledButton>
          </BorrowGrid>
        </InfoContainer>
      </StyledSection>
      <ActivitySection activity={activity} />
    </Container>
  )
}

export { LendingNFT }
