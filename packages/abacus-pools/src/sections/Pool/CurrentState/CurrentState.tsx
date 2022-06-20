import { NFTImage } from "@components/index"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { Section, Media, Pill } from "abacus-ui"
import React, { FunctionComponent, useMemo, useState } from "react"
import styled from "styled-components"
import PurchaseTokens from "./PurchaseTokens"
import OwnerSection from "../OwnerSection"

enum Page {
  PurchaseTokens,
  CurrentPositions,
  ManagePool,
  Tickets,
  Bribes,
}

const Container = styled(Section)`
  display: grid;
  grid-template-columns: 100%;
  grid-column-gap: 55px;
  grid-row-gap: 12px;
  position: relative;

  ${Media.sm`
    grid-template-columns: repeat(2, calc(50% - 27.5px));
  `}

  ${Media.lg`
    grid-template-columns: 445px 1fr;
  `}
`

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 24px;
  align-self: flex-start;
  border-radius: ${({ theme }) => theme.borderRadius.main};
  overflow: hidden;
  position: relative;
`

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  grid-row-gap: 24px;
`

const StyledPill = styled(Pill)`
  position: absolute;
  top: 8px;
  right: 8px;
`

type CurrentStateProps = {
  refreshPoolData: () => void
}

const CurrentState: FunctionComponent<CurrentStateProps> = ({
  refreshPoolData,
}) => {
  const [page] = useState<Page>(Page.PurchaseTokens)
  const { nfts } = useGetPoolData()

  const rightSection = useMemo(() => {
    switch (page) {
      case Page.PurchaseTokens:
        return <PurchaseTokens refreshPoolData={refreshPoolData} />
      default:
        return null
    }
  }, [page, refreshPoolData])

  const src = nfts?.[0]?.img ?? ""

  return (
    <Container>
      <LeftSection>
        <StyledPill>
          {nfts?.length ?? "-"} NFT{nfts?.length ?? 0 > 1 ? "s" : ""}
        </StyledPill>
        <NFTImage src={src} />
        {true && <OwnerSection refreshPoolData={refreshPoolData} />}
      </LeftSection>
      <RightSection>{rightSection}</RightSection>
    </Container>
  )
}

export default CurrentState
