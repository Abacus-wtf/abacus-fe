import { ActivitySection } from "@components/index"
import { LendingProgressBar } from "@components/LendingProgressBar"
import { LoadingOverlay } from "@components/LoadingOverlay"
import { NFTImage } from "@components/NFTImage"
import { NumericallyConditionalText } from "@components/NumericallyConditionalText"
import { Title } from "@components/Title"
import { useActiveWeb3React } from "@hooks/index"
import { Container } from "@layouts/styles"
import {
  useCurrentLendingNFT,
  useCurrentLendingNFTHealthRatio,
  useFetchCurrentLendingNFT,
  useFetchingCurrentLendingNft,
  useFetchVaultRelatedLendingData,
} from "@state/lending/hooks"
import {
  Button,
  Flex,
  Font,
  Kilo,
  Media,
  Mega,
  P,
  PersistentBanner,
  Section,
  Select,
} from "abacus-ui"
import { BigNumber } from "ethers"
import { formatEther } from "ethers/lib/utils"
import { Link } from "gatsby"
import { debounce } from "lodash"
import React, { useEffect, useMemo, useState } from "react"
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
  const { account } = useActiveWeb3React()
  const fetchCurrentLendingNft = useFetchCurrentLendingNFT()
  const fetchVaultRelatedLendingData = useFetchVaultRelatedLendingData()
  const healthRatio = useCurrentLendingNFTHealthRatio()
  const {
    name,
    img,
    alt,
    vaults,
    isManager,
    loan,
    nEthBalance,
    reservationStatus,
    nextReservationStatus,
  } = useCurrentLendingNFT()
  const [selectedVault, setSelectedVault] =
    useState<typeof vaults[number]>(null)
  const fetching = useFetchingCurrentLendingNft()
  const [borrowModalOpen, setBorrowModalOpen] = useState(false)
  const [repayModalOpen, setRepayModalOpen] = useState(false)

  useEffect(() => {
    if (vaults) {
      setSelectedVault(vaults[0])
    }
  }, [vaults])

  useEffect(() => {
    const debouncedFetch = debounce(fetchCurrentLendingNft, 200)
    if (address && tokenId) {
      debouncedFetch(address, tokenId)
    }
    return () => {
      debouncedFetch.cancel()
    }
  }, [address, fetchCurrentLendingNft, tokenId])

  const vaultId = selectedVault?.id ?? ""
  useEffect(() => {
    if (vaultId && address && tokenId) {
      fetchVaultRelatedLendingData(vaultId, address, tokenId)
    }
  }, [address, fetchVaultRelatedLendingData, tokenId, vaultId])

  const cannotBorrowInfo = useMemo(() => {
    if (!reservationStatus && !nextReservationStatus) {
      return "You don't have a reservation for this vault"
    }
    if (reservationStatus && !nextReservationStatus) {
      return "Your reservation expires within 12 hours"
    }
    return null
  }, [reservationStatus, nextReservationStatus])

  if (fetching) {
    return <LoadingOverlay loading={fetching} />
  }

  const isMyLoan = loan?.borrower.toLowerCase() === account?.toLowerCase()
  const loanValue = Number(formatEther(loan?.loanAmount ?? "0x0"))
  const availableValue = Number(formatEther(loan?.totalAvailable ?? "0x0"))

  const borrowed = loanValue
  const borrowedByYou = isMyLoan ? loanValue : 0
  const available = availableValue
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
      {!isManager && (
        <PersistentBanner bottom="0">Only owner can borrow</PersistentBanner>
      )}
      <BorrowModal
        isOpen={borrowModalOpen}
        closeModal={() => setBorrowModalOpen(false)}
        address={address}
        tokenId={tokenId}
        refresh={() => fetchCurrentLendingNft(address, tokenId)}
        selectedVault={selectedVault?.id ?? ""}
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
              <Label>Selected Abacus Vault</Label>
              <Flex
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "6px",
                }}
              >
                <Select
                  value={selectedVault?.id ?? ""}
                  setValue={(newValue) => {
                    const nextVault = vaults.find(
                      (vault) => vault.id === newValue
                    )
                    setSelectedVault(nextVault)
                  }}
                  options={vaults?.map((vault) => vault.id) ?? []}
                />
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
            <HealthRatio value={healthRatio}>{healthRatio}</HealthRatio>
            <Label>Health Ratio</Label>
          </Flex>
          <LendingProgressBar progress={progress} />
          <BorrowGrid>
            <Column>
              <Label>Borrowed</Label>
              <Mega>
                {borrowed} <b>ETH</b>
              </Mega>
            </Column>
            <Divider />
            <Column>
              <Label>Available</Label>
              <Mega>
                {available} <b>ETH</b>
              </Mega>
            </Column>
            <Column>
              <Label>Borrowed by You</Label>
              <Mega>
                {borrowedByYou} <b>ETH</b>
              </Mega>
            </Column>
            <Divider />
            <Column>
              <Mega>
                <b>-</b>
              </Mega>
            </Column>
            <StyledButton
              onClick={() => setRepayModalOpen(true)}
              disabled={BigNumber.from(nEthBalance ?? "0x0").isZero()}
            >
              Pay Back
            </StyledButton>
            <span />
            <StyledButton
              borrow
              onClick={() => setBorrowModalOpen(true)}
              disabled={
                !isManager || !reservationStatus || !nextReservationStatus
              }
            >
              Borrow
            </StyledButton>
            {cannotBorrowInfo && (
              <P style={{ color: "red", gridColumn: 3 }}>{cannotBorrowInfo}</P>
            )}
          </BorrowGrid>
        </InfoContainer>
      </StyledSection>
      <ActivitySection activity={activity} />
    </Container>
  )
}

export { LendingNFT }
