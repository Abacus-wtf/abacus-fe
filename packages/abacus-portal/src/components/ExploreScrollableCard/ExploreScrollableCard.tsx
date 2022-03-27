import { ExploreInfo, ProfileGroup } from "abacus-ui"
import React, { FunctionComponent, useContext } from "react"
import { ThemeContext } from "styled-components"
import { SessionState } from "@state/sessionData/reducer"
import { useEthToUSD } from "@state/application/hooks"
import {
  ExploreCardProps,
  ExploreInfoContainer,
  useCardSubtitile,
} from "../ExploreCard"
import Fallback from "./Fallback"
import {
  NFTImage,
  Container,
  BadgeContainer,
  BadgeIndicator,
  Title,
  Divider,
  BottomContainer,
} from "./ExploreScrollableCard.styled"

type ExploreScrollableCardProps = {
  cardInfo: ExploreCardProps
  loading?: boolean
  linkComponent?: string | React.ComponentType<any>
}

const ExploreScrollableCard: FunctionComponent<ExploreScrollableCardProps> = ({
  cardInfo,
  loading,
  linkComponent,
}) => {
  const theme = useContext(ThemeContext)
  const status =
    cardInfo.currentStatus === SessionState.Vote &&
    cardInfo.endTime < +new Date()
      ? SessionState.Weigh
      : cardInfo.currentStatus
  const subtitle = useCardSubtitile({
    endTime: cardInfo.endTime,
    finalAppraisalValue: cardInfo.finalAppraisalValue,
    link: cardInfo.link,
    currentStatus: status,
  })

  const poolAmountUSD = useEthToUSD(cardInfo.poolAmount)

  if (loading) {
    return <Fallback />
  }

  const badgeTitle =
    status === SessionState.Vote
      ? "Voting Live"
      : status === SessionState.Weigh
      ? "Weighing Votes"
      : status === SessionState.SetFinalAppraisal
      ? "Setting Final Appraisal"
      : status === SessionState.Harvest
      ? "Harvesting"
      : status === SessionState.Claim
      ? "Claiming"
      : "Session Completed"

  const badgeColor =
    status === SessionState.Vote
      ? theme.colors.utility.blue
      : status === SessionState.Weigh
      ? theme.colors.core[900]
      : status === SessionState.SetFinalAppraisal
      ? theme.colors.utility.yellow
      : status === SessionState.Harvest
      ? theme.colors.utility.purple
      : status === SessionState.Claim
      ? theme.colors.utility.brown
      : theme.colors.utility.green
  return (
    <Container>
      <div style={{ width: "100%" }}>
        <BadgeContainer>
          <BadgeIndicator color={badgeColor} />
          {badgeTitle}
        </BadgeContainer>
      </div>
      <NFTImage src={cardInfo.nftSrc} alt={cardInfo.nftTitle} />
      <Title as={linkComponent || "a"} href={cardInfo.link} to={cardInfo.link}>
        {cardInfo.nftTitle || "Untitled"}
      </Title>
      <ExploreInfoContainer>
        <ExploreInfo
          title="Participants"
          text={`${cardInfo.numParticipants}`}
          unit="People"
        />
        <ExploreInfo
          title="Pool Amount"
          text={`${cardInfo.poolAmount.toFixed(2)} Ξ`}
          unit={`$${poolAmountUSD}`}
        />
      </ExploreInfoContainer>
      <Divider />
      <BottomContainer>
        <ProfileGroup
          imgs={cardInfo.imgs}
          numParticipants={cardInfo.numParticipants}
        />
        {subtitle}
      </BottomContainer>
    </Container>
  )
}

export default ExploreScrollableCard
