import React, { FunctionComponent, useEffect, useState } from "react"
import { Checkbox, Kilo, Media } from "abacus-ui"
import styled from "styled-components"
// import { usePrevious } from "@hooks/index"
// import { useSetPools } from "@state/poolData/hooks"
import { useSetPools } from "@state/poolData/hooks"
import { OrderDirection, Vault_OrderBy } from "abacus-graph"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 40px;

  ${Media.sm`
    flex-direction: row;
    flex-wrap: wrap;
  `}
`

const Category = styled.div`
  display: flex;
  flex-direction: column;
`

const CategoryTitle = styled(Kilo)`
  margin-bottom: 16px;
  font-weight: bold;
`

const CheckboxContainer = styled.div`
  display: flex;
`

type ExploreFiltersProps = {
  page: number
}

const ExploreFilters: FunctionComponent<ExploreFiltersProps> = () => {
  const [poolSizeOrder, setPoolSizeOrder] = useState<OrderDirection | null>(
    null
  )
  const [participantsOrder, setParticipantsOrder] =
    useState<OrderDirection | null>(null)
  // const [ticketsOrder, setTicketsOrder] = useState<OrderDirection | null>(null)
  // const previousPoolSizeOrder = usePrevious(poolSizeOrder)
  // const previousPage = usePrevious(page)
  const setPools = useSetPools()

  useEffect(() => {
    if (poolSizeOrder !== null) {
      setPools(Vault_OrderBy.Size, poolSizeOrder)
    }
  }, [poolSizeOrder, setPools])

  useEffect(() => {
    if (participantsOrder !== null) {
      setPools(Vault_OrderBy.TotalParticipants, participantsOrder)
    }
  }, [participantsOrder, setPools])

  // useEffect(() => {
  //  if (ticketsOrder !== null) {
  //    setPools(Vault_OrderBy.Tickets, ticketsOrder)
  //  }
  // }, [ticketsOrder, setPools])

  return (
    <Container>
      <Category>
        <CategoryTitle>Pool Size</CategoryTitle>
        <CheckboxContainer>
          <Checkbox
            type="radio"
            name="pool_size"
            label="Low to High"
            id="pool_size_lth"
            value="Low to High"
            checked={poolSizeOrder === "asc"}
            onChange={() => setPoolSizeOrder(OrderDirection.Asc)}
          />
          <Checkbox
            type="radio"
            name="pool_size"
            label="High to Low"
            id="pool_size_htl"
            value="High to Low"
            checked={poolSizeOrder === "desc"}
            onChange={() => setPoolSizeOrder(OrderDirection.Desc)}
          />
        </CheckboxContainer>
      </Category>
      <Category>
        <CategoryTitle>Participants</CategoryTitle>
        <CheckboxContainer>
          <Checkbox
            type="radio"
            name="participants"
            label="Low to High"
            id="participants_lth"
            value="Low to High"
            checked={participantsOrder === "asc"}
            onChange={() => setParticipantsOrder(OrderDirection.Asc)}
          />
          <Checkbox
            type="radio"
            name="participants"
            label="High to Low"
            id="participants_htl"
            value="High to Low"
            checked={participantsOrder === "desc"}
            onChange={() => setParticipantsOrder(OrderDirection.Desc)}
          />
        </CheckboxContainer>
      </Category>
      {/* <Category>
        <CategoryTitle>Tickets</CategoryTitle>
        <CheckboxContainer>
          <Checkbox
            type="radio"
            name="tickets"
            label="Low to High"
            id="tickets_lth"
            value="Low to High"
            checked={ticketsOrder === "asc"}
            onChange={() => setTicketsOrder(OrderDirection.Asc)}
          />
          <Checkbox
            type="radio"
            name="tickets"
            label="High to Low"
            id="tickets_htl"
            value="High to Low"
            checked={ticketsOrder === "desc"}
            onChange={() => setTicketsOrder(OrderDirection.Desc)}
          />
        </CheckboxContainer>
  </Category> */}
    </Container>
  )
}

export default ExploreFilters
