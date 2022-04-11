import { useTraderProfile } from "@state/singlePoolData/hooks"
import { Button, ButtonType, Section } from "abacus-ui"
import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { SectionHeader, SectionTitle } from "./Pool.styled"

const SeeAllButton = styled(Button)`
  padding: 0;
  color: ${({ theme }) => theme.colors.utility.blue};
`

const Activity: FunctionComponent = () => {
  const traderProfile = useTraderProfile()

  console.log("traderProfile", traderProfile)
  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Activity</SectionTitle>
        <SeeAllButton buttonType={ButtonType.Clear}>See All</SeeAllButton>
      </SectionHeader>
    </Section>
  )
}

export default Activity
