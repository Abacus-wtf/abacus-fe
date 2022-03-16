import { useEthToUSD } from "@state/application/hooks"
import { SessionState } from "@state/sessionData/reducer"
import { ButtonType, ExploreImage, ExploreInfo, ProfileGroup } from "abacus-ui"
import React, { FunctionComponent } from "react"
import {
  Container,
  SecondHalf,
  Title,
  Divider,
  ExploreInfoContainer,
  ButtonStyled,
  ProfileGroupContainer,
} from "./ExploreCard.styled"
import Fallback from "./Fallback"
import useCardSubtitile from "./useCardSubtitile"

export type ExploreCardProps = {
  nftSrc: string
  nftTitle: string
  endTime: number
  numParticipants: number
  poolAmount: number
  imgs: string[]
  link: string
  loading?: boolean
  currentStatus: SessionState
  finalAppraisalValue: number | null
  linkComponent?: string | React.ComponentType<any>
}

const ExploreCard: FunctionComponent<ExploreCardProps> = ({
  nftSrc,
  nftTitle,
  endTime,
  numParticipants,
  poolAmount,
  imgs,
  link,
  loading,
  linkComponent,
  currentStatus,
  finalAppraisalValue,
}) => {
  const subtitle = useCardSubtitile({
    endTime,
    finalAppraisalValue,
    link,
    currentStatus,
  })

  const poolAmountUSD = useEthToUSD(poolAmount)

  if (loading) {
    return <Fallback />
  }

  return (
    <Container>
      <ExploreImage imgSrc={nftSrc} />
      <SecondHalf>
        <Title>{nftTitle}</Title>
        {subtitle}
        <Divider />
        <ExploreInfoContainer>
          <ExploreInfo
            title="Participants"
            text={`${numParticipants}`}
            unit="People"
          />
          <ExploreInfo
            title="Pool Amount"
            text={`${poolAmount.toFixed(2)} Ξ`}
            unit={`$${poolAmountUSD}`}
          />
        </ExploreInfoContainer>
        <ButtonStyled
          buttonType={ButtonType.Standard}
          as={linkComponent || "a"}
          href={link}
          to={link}
        >
          Participate
        </ButtonStyled>
        <ProfileGroupContainer>
          <ProfileGroup imgs={imgs} numParticipants={numParticipants} />
        </ProfileGroupContainer>
      </SecondHalf>
    </Container>
  )
}

export default ExploreCard
