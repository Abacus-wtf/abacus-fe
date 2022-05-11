import { LoadingOverlay } from "@components/LoadingOverlay"
import { useOnBid } from "@hooks/auctionFunc"
import { useEthToUSD } from "@state/application/hooks"
import { useGetPoolData } from "@state/singlePoolData/hooks"
import { Button, Exa, Input, Section } from "abacus-ui"
import React, { FunctionComponent, useState } from "react"
import styled from "styled-components"
// import Loading from "../Loading"

const Container = styled(Section)`
  row-gap: 40px;
  position: relative;
`

const UpperContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  grid-row-gap: 16px;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`

const Title = styled(Exa)`
  justify-self: flex-start;
  width: max-content;
  font-family: "Bluu next";
  line-height: 46px;
  flex-grow: 1;
`

const ConfirmButton = styled(Button)`
  width: 100%;
  padding: 22px;
  border-radius: 80px;
`

type HintProps = {
  eth: number
}

const Hint = ({ eth }: HintProps) => {
  const ethUSD = useEthToUSD(eth)
  return <>${ethUSD}</>
}

type PurchaseTokensProps = {
  refreshPoolData: () => void
}

const MakeBid: FunctionComponent<PurchaseTokensProps> = ({
  refreshPoolData,
}) => {
  const { auction } = useGetPoolData()
  const [eth, setEth] = useState("")
  const { onBid, isPending } = useOnBid()

  const ended =
    auction.auctionComplete || auction.auctionEndTime <= new Date().getTime()

  if (ended) {
    return null
  }

  const makeBid = async () => {
    await onBid(eth, async () => {
      await refreshPoolData()
      setEth("")
    })
  }

  const confirmDisabled = !eth || isPending

  return (
    <Container>
      <LoadingOverlay loading={isPending} />
      <UpperContainer>
        <TitleContainer>
          <Title>Make a Bid</Title>
        </TitleContainer>
      </UpperContainer>
      <Input
        type="number"
        name="from_eth"
        value={eth}
        onChange={setEth}
        hint={<Hint eth={Number(eth)} />}
        label="Amount:"
        placeholder="0.00"
        pill="ETH"
      />
      <ConfirmButton disabled={confirmDisabled} onClick={makeBid}>
        {isPending ? "Pending..." : "Submit Bid"}
      </ConfirmButton>
    </Container>
  )
}

export default MakeBid
