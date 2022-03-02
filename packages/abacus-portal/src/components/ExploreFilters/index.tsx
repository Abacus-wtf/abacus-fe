import React, { FunctionComponent, useState, useEffect } from "react"
import { Checkbox, Accordion, H2 } from "abacus-ui"
import styled from "styled-components"
import { SessionState } from "@state/sessionData/reducer"
import {
  pricingSessionWhere,
  PricingSessionFilters,
} from "@state/sessionData/queries"
import { useGetMultiSessionData } from "@state/sessionData/hooks"
import { BigNumber } from "ethers"
import { usePrevious } from "@hooks/index"
import { statuses, Range, Order, RangeBoundaries } from "./constants"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`

const HR = styled.hr`
  margin: 18px 0px;
  margin-top: 6px;
  width: 100%;
  border-color: ${({ theme }) => theme.colors.core.border};
`

let prevWhere: string = null

type ExploreFiltersProps = {
  page: number
}

const ExploreFilters: FunctionComponent<ExploreFiltersProps> = ({ page }) => {
  const [sessionStatuses, setSessionStatuses] = useState(new Set<number>())
  const [sortOrder, setSortOrder] = useState<Order>(null)
  const previousSortOrder = usePrevious(sortOrder)
  const previousPage = usePrevious(page)
  const [ranges, setRanges] = useState(new Set<Range>())
  const getMultiSessionData = useGetMultiSessionData()

  const toggleSessionState = (state: SessionState) => () =>
    setSessionStatuses((statuses) => {
      if (statuses.has(state)) {
        statuses.delete(state)
      } else {
        statuses.add(state)
      }
      return new Set(statuses)
    })

  const toggleRange = (state: Range) => () =>
    setRanges((ranges) => {
      if (ranges.has(state)) {
        ranges.delete(state)
      } else {
        ranges.add(state)
      }
      return new Set(ranges)
    })

  useEffect(() => {
    const statuses = Array.from(sessionStatuses)
    let lowerBound: BigNumber = null
    let upperBound: BigNumber | boolean = null
    ranges.forEach((range) => {
      const rangeLower = RangeBoundaries[range].lower_bound
      const rangeUpper = RangeBoundaries[range].upper_bound
      lowerBound = !lowerBound
        ? rangeLower
        : rangeLower.lt(lowerBound)
        ? rangeLower
        : lowerBound

      if (typeof rangeUpper === "number") {
        upperBound = null
      } else if (typeof upperBound === "boolean") {
        upperBound = null
      } else {
        upperBound = !upperBound
          ? rangeUpper
          : rangeUpper.gt(upperBound)
          ? rangeUpper
          : upperBound
      }
    })

    const filters: PricingSessionFilters = {
      ...(statuses?.length && {
        sessionStatus: statuses,
      }),
      ...(lowerBound && {
        totalStaked_gt: lowerBound,
      }),
      ...(upperBound && {
        totalStaked_lt: upperBound,
      }),
    }
    const where = pricingSessionWhere(filters)
    if (
      prevWhere !== where ||
      previousSortOrder !== sortOrder ||
      page > previousPage
    ) {
      prevWhere = where
      const orderBy = sortOrder ? "totalStaked" : null
      const orderDirection = sortOrder || null
      getMultiSessionData(where, orderBy, orderDirection)
    }
  }, [
    getMultiSessionData,
    previousSortOrder,
    ranges,
    sessionStatuses,
    sortOrder,
    page,
    previousPage,
  ])

  return (
    <Container>
      <H2 style={{ marginBottom: 8 }}>Explore</H2>
      <Accordion title="Status">
        {statuses.map((item) => (
          <Checkbox
            key={item.label}
            name={item.label}
            label={item.label}
            id={item.label}
            value={item.label}
            checked={sessionStatuses.has(item.state)}
            onChange={toggleSessionState(item.state)}
          />
        ))}
      </Accordion>
      <HR />
      <Accordion title="Bounty price">
        <Checkbox
          type="radio"
          name="sort_order"
          label="Low to High"
          id="Low to High"
          value="Low to High"
          checked={sortOrder === "asc"}
          onChange={() => setSortOrder("asc")}
        />
        <Checkbox
          type="radio"
          name="sort_order"
          label="High to Low"
          id="High to Low"
          value="High to Low"
          checked={sortOrder === "desc"}
          onChange={() => setSortOrder("desc")}
        />
      </Accordion>
      <HR />
      <Accordion title="Amount staked">
        <Checkbox
          name="low_range"
          label="Under 0.1Ξ"
          id="low_range"
          value="low_range"
          checked={ranges.has("low_range")}
          onChange={toggleRange("low_range")}
        />
        <Checkbox
          name="mid_range"
          label="0.1Ξ to 1Ξ"
          id="mid_range"
          value="mid_range"
          checked={ranges.has("mid_range")}
          onChange={toggleRange("mid_range")}
        />
        <Checkbox
          name="high_range"
          label="Over 1Ξ"
          id="high_range"
          value="high_range"
          checked={ranges.has("high_range")}
          onChange={toggleRange("high_range")}
        />
      </Accordion>
    </Container>
  )
}

export default ExploreFilters
