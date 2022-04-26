import { Section } from "@components/Section"
import { Media, StatInfo } from "abacus-ui"
import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { useQuery } from "urql"
import { GetAggregatesDocument } from "abacus-graph"
import { formatEther } from "ethers/lib/utils"
import { BigNumber } from "ethers"

const Container = styled(Section)`
  background: ${({ theme }) => theme.colors.utility.white};
  padding: 16px 0;
  justify-content: center;
  align-items: center;

  ${Media.sm`
    column-gap: 100px;
    flex-direction: row;
  `}
`

const StyledStatInfo = styled(StatInfo)`
  margin-top: 1rem;
  color: black;

  &:first-of-type {
    margin-top: 0;
  }

  ${Media.sm`
    margin: 0;
  `}
`

const Statistics: FunctionComponent = () => {
  const [result] = useQuery({
    query: GetAggregatesDocument,
  })
  const { data } = result
  const TVL =
    data?.aggregate.TVL &&
    formatEther(
      BigNumber.from(data.aggregate.TVL).div(BigNumber.from("1000")) ?? ""
    )
  return (
    <Container>
      <StyledStatInfo showEthIcon stat={TVL} title="TVL" />
      <StyledStatInfo
        stat={String(data?.aggregate.totalPools ?? "-")}
        title="NFT Pools"
      />
      <StyledStatInfo
        stat={String(data?.aggregate.totalParticipants ?? "-")}
        title="Participants"
      />
    </Container>
  )
}

export { Statistics }
