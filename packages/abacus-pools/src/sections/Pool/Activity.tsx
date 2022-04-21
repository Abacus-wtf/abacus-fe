import { useActivity } from "@state/singlePoolData/hooks"
import { Button, ButtonType, Flex, Kilo, ProfileIcon, Section } from "abacus-ui"
import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { getUserIcon } from "@utils"
import moment from "moment"
import { formatEther } from "ethers/lib/utils"
import { shortenAddress } from "@config/utils"
import { SectionHeader, SectionTitle } from "./Pool.styled"

const SeeAllButton = styled(Button)`
  padding: 0;
  color: ${({ theme }) => theme.colors.utility.blue};
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;
  row-gap: 16px;
`

const ActivityItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const ActivityDetails = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledProfileIcon = styled(ProfileIcon)`
  height: auto;
  width: auto;
`

const ActivityUser = styled(Kilo)`
  font-weight: bold;
`

const ActivityAmount = styled(Kilo)`
  color: ${({ theme }) => theme.colors.core[900]};
`

const ActivityWhen = styled.div`
  justify-self: flex-end;
`

const Activity: FunctionComponent = () => {
  const activity = useActivity()

  return (
    <Section>
      <SectionHeader>
        <SectionTitle>Activity</SectionTitle>
        <SeeAllButton buttonType={ButtonType.Clear}>See All</SeeAllButton>
      </SectionHeader>
      <Wrapper>
        {activity?.map((item) => (
          <ActivityItem key={item.id}>
            <Flex style={{ columnGap: "10px" }}>
              <StyledProfileIcon src={getUserIcon(item.user)} />
              <ActivityDetails>
                <ActivityUser>{shortenAddress(item.user)}</ActivityUser>
                <ActivityAmount>
                  {Math.round(Number(formatEther(item.amount)))} Token{" "}
                  {item.action}
                </ActivityAmount>
              </ActivityDetails>
            </Flex>
            <ActivityWhen>{moment(item.timestamp).fromNow()}</ActivityWhen>
          </ActivityItem>
        ))}
      </Wrapper>
    </Section>
  )
}

export default Activity
