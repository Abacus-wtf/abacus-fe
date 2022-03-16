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
  const subtitle = useCardSubtitile({
    endTime: cardInfo.endTime,
    finalAppraisalValue: cardInfo.finalAppraisalValue,
    link: cardInfo.link,
    currentStatus: cardInfo.currentStatus,
  })

  const poolAmountUSD = useEthToUSD(cardInfo.poolAmount)

  if (loading) {
    return <Fallback />
  }

  const badgeTitle =
    cardInfo.currentStatus === SessionState.Vote
      ? "Voting Live"
      : cardInfo.currentStatus === SessionState.Weigh
      ? "Weighing Votes"
      : cardInfo.currentStatus === SessionState.SetFinalAppraisal
      ? "Setting Final Appraisal"
      : cardInfo.currentStatus === SessionState.Harvest
      ? "Harvesting"
      : cardInfo.currentStatus === SessionState.Claim
      ? "Claiming"
      : "Session Completed"

  const badgeColor =
    cardInfo.currentStatus === SessionState.Vote
      ? theme.colors.utility.blue
      : cardInfo.currentStatus === SessionState.Weigh
      ? theme.colors.core[900]
      : cardInfo.currentStatus === SessionState.SetFinalAppraisal
      ? theme.colors.utility.yellow
      : cardInfo.currentStatus === SessionState.Harvest
      ? theme.colors.utility.purple
      : cardInfo.currentStatus === SessionState.Claim
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
