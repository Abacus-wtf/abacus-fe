import { NFTImage } from "@components/index"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { Section, Media } from "abacus-ui"
import React, { FunctionComponent, useMemo, useState } from "react"
import styled from "styled-components"
import PurchaseTokens from "./PurchaseTokens"

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

  ${Media.sm`
    grid-template-columns: repeat(2, calc(50% - 27.5px));
  `}

  ${Media.lg`
    grid-template-columns: 445px 1fr;
  `}
`

const LeftSection = styled.div`
  display: flex;
  align-self: flex-start;
  border-radius: ${({ theme }) => theme.borderRadius.main};
  overflow: hidden;
`

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: flex-start;
  grid-row-gap: 24px;
`

type CurrentStateProps = {
  refreshPoolData: () => void
}

const CurrentState: FunctionComponent<CurrentStateProps> = ({
  refreshPoolData,
}) => {
  const [page] = useState<Page>(Page.PurchaseTokens)
  const { img } = useGetPoolData()

  const rightSection = useMemo(() => {
    switch (page) {
      case Page.PurchaseTokens:
        return <PurchaseTokens refreshPoolData={refreshPoolData} />
      default:
        return <>HI</>
    }
  }, [page, refreshPoolData])

  return (
    <Container>
      <LeftSection>
        <NFTImage src={img} />
      </LeftSection>
      <RightSection>{rightSection}</RightSection>
    </Container>
  )
}

export default CurrentState
