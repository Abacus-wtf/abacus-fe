import React, { FunctionComponent, useState } from "react"
import { Checkbox, Kilo, Media } from "abacus-ui"
import styled from "styled-components"
// import { usePrevious } from "@hooks/index"
// import { useSetPools } from "@state/poolData/hooks"
import { Order } from "./constants"

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
  const [poolSizeOrder, setPoolSizeOrder] = useState<Order>(null)
  const [participantsOrder, setParticipantsOrder] = useState<Order>(null)
  const [ticketsOrder, setTicketsOrder] = useState<Order>(null)
  // const previousPoolSizeOrder = usePrevious(poolSizeOrder)
  // const previousPage = usePrevious(page)
  // const setPools = useSetPools()

  // useEffect(() => {
  //   if (previousPoolSizeOrder !== poolSizeOrder || page > previousPage) {
  //     const orderBy = poolSizeOrder ? "timestamp" : "timestamp"
  //     const orderDirection = poolSizeOrder || null
  //     setPools("", orderBy, orderDirection)
  //   }
  // }, [page, poolSizeOrder, previousPage, previousPoolSizeOrder, setPools])

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
            onChange={() => setPoolSizeOrder("asc")}
          />
          <Checkbox
            type="radio"
            name="pool_size"
            label="High to Low"
            id="pool_size_htl"
            value="High to Low"
            checked={poolSizeOrder === "desc"}
            onChange={() => setPoolSizeOrder("desc")}
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
            onChange={() => setParticipantsOrder("asc")}
          />
          <Checkbox
            type="radio"
            name="participants"
            label="High to Low"
            id="participants_htl"
            value="High to Low"
            checked={participantsOrder === "desc"}
            onChange={() => setParticipantsOrder("desc")}
          />
        </CheckboxContainer>
      </Category>
      <Category>
        <CategoryTitle>Tickets</CategoryTitle>
        <CheckboxContainer>
          <Checkbox
            type="radio"
            name="tickets"
            label="Low to High"
            id="tickets_lth"
            value="Low to High"
            checked={ticketsOrder === "asc"}
            onChange={() => setTicketsOrder("asc")}
          />
          <Checkbox
            type="radio"
            name="tickets"
            label="High to Low"
            id="tickets_htl"
            value="High to Low"
            checked={ticketsOrder === "desc"}
            onChange={() => setTicketsOrder("desc")}
          />
        </CheckboxContainer>
      </Category>
    </Container>
  )
}

export default ExploreFilters
