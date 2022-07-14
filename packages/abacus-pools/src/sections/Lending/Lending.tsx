import React, { useEffect, useMemo, useState } from "react"
import {
  Button,
  Exa,
  Loader,
  AbacusSpotIcon,
  AbacusCrowdsIcon,
  ButtonType,
  Flex,
  Media,
} from "abacus-ui"
import { LendingCard, CardGrid } from "@components/index"
import styled from "styled-components"
import { random } from "lodash"
import { useFetchLendingNFTs, useLendingNFTs } from "@state/lending/hooks"
import { useActiveWeb3React } from "@hooks/index"
import { Container } from "../../layouts/styles"

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 24px;

  ${Media.md`
    gap: 12px;
  `}
`

const Title = styled(Exa)`
  font-family: "Bluu next";
  font-weight: bold;
  margin-top: 16px;

  ${Media.md`
    font-family: 'Inter';
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: ${({ theme }) => theme.colors.core[700]};
  `};
`

const FilterButton = styled(Button)<{ selected: boolean }>`
  border-radius: ${({ theme }) => theme.borderRadius.main};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.utility.blue : theme.colors.core[900]} !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 50%;
  padding: 24px 0;
  margin: 0;
  flex: 1 0 auto;
  background-color: ${({ selected }) =>
    selected ? "rgba(62, 116, 255, 0.06)" : "transparent"};

  & svg {
    height: 24px;
    width: 24px;
  }

  & * {
    stroke: ${({ theme, selected }) =>
      selected ? theme.colors.utility.blue : theme.colors.core[900]};
  }

  ${Media.md`
    width: min-content;
    padding: 24px 70px;
    flex: 0 1 auto;
  `}
`

const LoadingContainer = styled.div`
  display: flex;
  position: fixed;
  top: 10vh;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  align-items: center;
  justify-content: center;

  & > * {
    height: 200px;
  }
`

enum FilterOptions {
  All,
  MyNfts,
}

const Lending = () => {
  const { account } = useActiveWeb3React()
  const [filterOptions, setFilterOptions] = useState(FilterOptions.All)
  const fetchLendingNFTs = useFetchLendingNFTs()
  const nfts = useLendingNFTs()

  const filteredNFTs = useMemo(
    () =>
      nfts.filter((nft) =>
        filterOptions === FilterOptions.All
          ? true
          : nft.owner.toLowerCase() === account.toLowerCase()
      ),
    [account, filterOptions, nfts]
  )

  useEffect(() => {
    fetchLendingNFTs()
  }, [fetchLendingNFTs])

  if (!nfts) {
    return (
      <LoadingContainer>
        <Loader />
      </LoadingContainer>
    )
  }

  return (
    <Container>
      <FilterContainer>
        <Title>NFTs</Title>
        <Flex style={{ width: "100%", justifyContent: "center" }}>
          <FilterButton
            buttonType={ButtonType.Clear}
            selected={filterOptions === FilterOptions.All}
            onClick={() => setFilterOptions(FilterOptions.All)}
          >
            <AbacusCrowdsIcon />
            All
          </FilterButton>
          <FilterButton
            buttonType={ButtonType.Clear}
            selected={filterOptions === FilterOptions.MyNfts}
            onClick={() => setFilterOptions(FilterOptions.MyNfts)}
          >
            <AbacusSpotIcon />
            My NFTs
          </FilterButton>
        </Flex>
      </FilterContainer>
      <CardGrid>
        {filteredNFTs.map((nft) => (
          <LendingCard
            key={`${nft.address}`}
            link={`/lending/${nft.address}`}
            title={nft.name}
            nft={nft}
            borrowed={random(0, 40, true)}
            available={random(0, 40, true)}
            healthRatio={random(0, 10, true)}
          />
        ))}
      </CardGrid>
    </Container>
  )
}

export { Lending }
