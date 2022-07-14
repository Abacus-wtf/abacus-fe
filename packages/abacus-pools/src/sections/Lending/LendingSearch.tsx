import { useFetchLendingNFTs } from "@state/lending/hooks"
import { Button, ButtonType, Font, Input, Media } from "abacus-ui"
import React, { useState } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  gap: 16px;
`

const StyledInput = styled(Input)`
  & label {
    ${Font("kilo")}
    color: ${({ theme }) => theme.colors.core[900]};
  }

  ${Media.md`
    max-width: 300px;
  `}
`

const StyledButton = styled(Button)`
  padding: 13px 20px;
`

const SUPPORTED_HOSTS = new Set(["opensea.io", "testnets.opensea.io"])

const LendingSearch = () => {
  const fetchLendingNFTs = useFetchLendingNFTs()
  const [query, setQuery] = useState("")
  const [error, setError] = useState(null)

  const handleSearch = () => {
    setError(null)
    if (query === "") {
      fetchLendingNFTs()
      return
    }

    try {
      const { host, pathname } = new URL(query)
      if (SUPPORTED_HOSTS.has(host)) {
        const paths = pathname.split("/")
        const address = paths[paths.length - 2]
        const tokenId = paths[paths.length - 1]
        fetchLendingNFTs(undefined, undefined, { address, tokenId })
      } else {
        setError("URL Search only suppports OpenSea")
      }
    } catch {
      // TODO: Could filter NFTs already loaded, but that's not great UX
      // will need to update graph to store NFT name along with NFTs so they can be queried
      setError("Can only search for OpenSea URL")
    }
  }

  return (
    <Container>
      <StyledInput
        value={query}
        onChange={setQuery}
        type="text"
        name="NFT_Search"
        label="Search by NFT name or URL"
        placeholder="Search"
        hint={error && <div style={{ color: "red" }}>{error}</div>}
      />
      <StyledButton onClick={handleSearch} buttonType={ButtonType.Gray}>
        Search
      </StyledButton>
    </Container>
  )
}

export { LendingSearch }
