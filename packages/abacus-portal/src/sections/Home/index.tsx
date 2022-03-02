import React, { useState } from "react"
import styled from "styled-components"
import { Media } from "abacus-ui"
import { ExploreFilters } from "@components/index"
import MultiSessions from "./MultiSessions"
import FeaturedSessions from "./FeaturedSessions"

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  max-width: 1280px;
  margin: 100px 80px;
  margin-top: 50px;
  padding: 0 16px;

  ${Media.lg`
    margin: 100px 0;
    grid-template-columns: 260px 1fr;
    grid-column-gap: 45px;
  `}

  ${Media.xl`
    padding: 0;
  `}
`

const Home: React.FC = () => {
  const [page, setPage] = useState(0)
  return (
    <>
      <FeaturedSessions />
      <GridContainer>
        <ExploreFilters page={page} />
        <MultiSessions setPage={setPage} />
      </GridContainer>
    </>
  )
}

export default Home
